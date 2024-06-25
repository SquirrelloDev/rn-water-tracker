import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {TopBar} from "@/components/Dashboard/TopBar";
import {RowCalendar} from "@/components/Dashboard/RowCalendar";
import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {useUserProgressListing} from "@/queries/user_progress/listing";
import {useEffect, useMemo} from "react";
import useDateStore from "@/stores/dateStore";
import {DasboardSummary} from "@/components/Dashboard/DasboardSummary";
import {DrinksEntries} from "@/components/Dashboard/DrinksEntries";
import {percents} from "@/utils/calculations";
import useAuthStore from "@/stores/authStore";
export default function Dashboard(){
	const insetsStyles = useSafeAreaStyle()
	const userData = useAuthStore(state => state.userData)
	const selectedDate = useDateStore(state => state.selectedDate)
	const {data, isLoading} = useUserProgressListing({date: selectedDate, userId: userData.id})
	useEffect(() => {
		if(!isLoading){
			console.log(data!.progress)
		}
	}, [isLoading, data])
	useEffect(() => {
		console.log(selectedDate)
	}, [selectedDate])
	const percentage = useMemo(() => {
		if(!isLoading){
			const allIntakes = data!.progress.reduce((acc, item) => {
				return acc + item.intake
			}, 0)
			return percents(userData.dailyFluidIntake, allIntakes) / 100
		}
		return 0
	}, [isLoading, userData.dailyFluidIntake, data])
	return (
		<StyledView style={[insetsStyles, {paddingBottom: 0}]} className="flex-1">
			<TopBar />
			<RowCalendar />
			<DasboardSummary percentage={percentage}/>
			<DrinksEntries isLoading={isLoading} userProgress={data?.progress} />
		</StyledView>
	)
}