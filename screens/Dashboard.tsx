import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {TopBar} from "@/components/Dashboard/TopBar";
import {RowCalendar} from "@/components/Dashboard/RowCalendar";
import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {useUserProgressListing} from "@/queries/user_progress/listing";
import {useRef} from "react";
import useDateStore from "@/stores/dateStore";
import {DasboardSummary} from "@/components/Dashboard/DasboardSummary";
import {DrinksEntries} from "@/components/Dashboard/DrinksEntries";
import useAuthStore from "@/stores/authStore";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import useDashboardData from "@/hooks/useDashboardData";
import {CustomBottomSheet} from "@/components/FormSheets/CustomBottomSheet";
export default function Dashboard(){
	const insetsStyles = useSafeAreaStyle()
	const userData = useAuthStore(state => state.userData)
	const selectedDate = useDateStore(state => state.selectedDate)

	const modalRef = useRef<BottomSheetModal>(null)
	const {data, isLoading} = useUserProgressListing({date: selectedDate, userId: userData!.id})
	const {transformedData, percentage} = useDashboardData(data, isLoading, userData)


	return (
		<StyledView style={[insetsStyles, {paddingBottom: 0}]} className="flex-1">
			<TopBar />
			<RowCalendar />
			<DasboardSummary percentage={percentage}/>
			<DrinksEntries isLoading={isLoading} userProgress={transformedData} />
			<CustomBottomSheet ref={modalRef}>
				<StyledText>From the component</StyledText>
			</CustomBottomSheet>
		</StyledView>
	)
}