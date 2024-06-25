import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {TopBar} from "@/components/Dashboard/TopBar";
import {RowCalendar} from "@/components/Dashboard/RowCalendar";
import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {useUserProgressListing} from "@/queries/user_progress/listing";
import {useCallback, useEffect, useMemo, useRef} from "react";
import useDateStore from "@/stores/dateStore";
import {DasboardSummary} from "@/components/Dashboard/DasboardSummary";
import {DrinksEntries} from "@/components/Dashboard/DrinksEntries";
import {percents} from "@/utils/calculations";
import useAuthStore from "@/stores/authStore";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";
import {UserProgressEntry} from "@/types/progress";
import BottomSheet, {BottomSheetBackdrop, BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
export default function Dashboard(){
	const insetsStyles = useSafeAreaStyle()
	const userData = useAuthStore(state => state.userData)
	const selectedDate = useDateStore(state => state.selectedDate)
	const toggleSheet = useBottomSheetStore(state => state.toggleSheet)
	const isSheetOpen = useBottomSheetStore(state => state.isSheetOpen)
	const modalRef = useRef<BottomSheetModal>(null)
	const {data, isLoading} = useUserProgressListing({date: selectedDate, userId: userData!.id})
	const transformedData = useMemo<UserProgressEntry[]>(() => {
		if(!isLoading && data){
			return data.progress.map(item => ({date: item.date, intake: item.intake, time: item.time, drink: {id: Number(item.drink_types.id), name: String(item.drink_types.name)}}))
		}
		return []
	}, [isLoading, data])
	const percentage = useMemo<number>(() => {
		if(!isLoading){
			const allIntakes = transformedData.reduce((acc, item) => {
				return acc + item.intake
			}, 0)
			return percents(userData!.dailyFluidIntake, allIntakes) / 100
		}
		return 0
	}, [isLoading, transformedData])
	useEffect(() => {
		if(isSheetOpen){
			modalRef.current.present()
		}
	}, [isSheetOpen])
	const handleSheetChanges = useCallback((index: number) => {
		if(index === -1){
			toggleSheet()
		}
	}, [toggleSheet])
	const renderBackdrop = useCallback((props) => {
		return <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>
	}, [])
	return (
		<StyledView style={[insetsStyles, {paddingBottom: 0}]} className="flex-1">
			<TopBar />
			<RowCalendar />
			<DasboardSummary percentage={percentage}/>
			<DrinksEntries isLoading={isLoading} userProgress={transformedData} />
			<BottomSheetModal ref={modalRef} snapPoints={['85%']} onChange={handleSheetChanges} backdropComponent={renderBackdrop}>
				<BottomSheetView>
					<StyledText>Awesome</StyledText>
				</BottomSheetView>
			</BottomSheetModal>
		</StyledView>
	)
}