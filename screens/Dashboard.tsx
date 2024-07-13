import React, {useState} from "react";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {TopBar} from "@/components/Dashboard/TopBar";
import {RowCalendar} from "@/components/Dashboard/RowCalendar";
import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {useUserProgressListing} from "@/queries/user_progress/listing";
import useDateStore from "@/stores/dateStore";
import {DasboardSummary} from "@/components/Dashboard/DasboardSummary";
import {DrinksEntries} from "@/components/Dashboard/DrinksEntries";
import useAuthStore from "@/stores/authStore";
import useDashboardData from "@/hooks/useDashboardData";
import {CreateEntryForm} from "@/components/FormSheets/CreateEntryForm";
import {useBottomSheetFormStore} from "@/stores/bottomSheetStore";
import {EditEntryForm} from "@/components/FormSheets/EditEntryForm";
import {DeleteEntryForm} from "@/components/FormSheets/DeleteEntryForm";
import useStreak from "@/hooks/useStreak";
import {StreakModal} from "@/components/UI/StreakModal";
import {StreakInfoModal} from "@/components/Dashboard/StreakInfoModal";

export default function Dashboard(){
	const insetsStyles = useSafeAreaStyle()
	const userData = useAuthStore(state => state.userData)
	const selectedDate = useDateStore(state => state.selectedDate)
	const sheetType = useBottomSheetFormStore(state => state.sheetType)
	const selectedDrinkId = useBottomSheetFormStore(state => state.selectedDrinkId)
	const {data, isLoading} = useUserProgressListing({date: selectedDate, userId: userData!.id})
	const {transformedData, percentage} = useDashboardData(data, isLoading, userData!)
	const {isStreakActive, streakModalShown, setStreakModalShown, currentStreak} = useStreak(percentage, selectedDate)
	const [infoModalShown, setModalInfoShown] = useState<boolean>(false)
	const toggleStreakModal = () => {
		setStreakModalShown(prevState => !prevState)
	}
	const toggleInfoModal = () => {
		setModalInfoShown(prevState => !prevState)
	}
	return (
		<StyledView style={[insetsStyles, {paddingBottom: 0}]} className="flex-1">
			<StreakModal isVisible={streakModalShown} toggleModal={toggleStreakModal} currentStreak={currentStreak} />
			<TopBar toggleInfoModal={toggleInfoModal}/>
			<RowCalendar />
			<DasboardSummary percentage={percentage}/>
			<DrinksEntries isLoading={isLoading} userProgress={transformedData} />
			{sheetType === 'create' && <CreateEntryForm /> }
			{sheetType === 'edit' && <EditEntryForm drinkId={selectedDrinkId}/>}
			{sheetType === 'delete' && <DeleteEntryForm drinkId={selectedDrinkId} isStreakActive={isStreakActive} userProgress={transformedData} userDailyIntake={userData!.dailyFluidIntake}/>}
			<StreakInfoModal isVisible={infoModalShown} currentStreak={currentStreak} toggleInfoModal={toggleInfoModal} />
		</StyledView>
	)
}