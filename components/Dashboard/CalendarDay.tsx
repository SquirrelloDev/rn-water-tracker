import {Day} from "@/types/days";
import useDateStore from "@/stores/dateStore";
import clsx from "clsx";
import {dayToString} from "@/utils/days";
import dayjs from "dayjs";
import {StyledPressable, StyledText} from "@/components/StyledComponents/StyledComponents";
interface CalendarDayProps {
	day: Day
	index:number,
	snapToDay: (index: number) => void
	isCompleted?: boolean
}
export function CalendarDay({day, index, snapToDay}:CalendarDayProps) {
	const selectedDate = useDateStore(state => state.selectedDate)
	const setSelectedDate = useDateStore(state => state.setSelectedDate)
	const isSameDate = dayjs(selectedDate).isSame(dayToString(day))
	const isAfter = dayjs(dayToString(day)).isAfter(dayjs())
	const onPressHandler = () => {
		setSelectedDate(dayToString(day))
		snapToDay(index)
	}
	//TODO: Add the completed state in the future

	// if (isCompleted){
	// 	return (
	// 		<StyledPressable onPress={onPressHandler} disabled={isAfter} className={clsx(isAfter && 'border-gray-400')}>
	// 		<StyledLinearGradient colors={!isAfter ? ['#ffcc33', '#ffb347'] : ['transparent']} className={clsx('mx-3 rounded-full w-12 h-12 justify-center', isAfter && 'border-gray-400')}>
	// 			<StyledText className={clsx('text-lg text-center')}>{day.date}</StyledText>
	// 		</StyledLinearGradient>
	// 		</StyledPressable>
	// 	)
	// }

	return (
		<StyledPressable onPress={onPressHandler} disabled={isAfter} className={clsx('mx-3 rounded-full w-12 h-12 justify-center', isSameDate ? 'bg-sky-400' : 'border dark:border-white', isAfter && 'border-gray-400')}>
			<StyledText className={clsx('text-lg text-center dark:text-white', isSameDate && 'text-white font-semibold', isAfter && 'text-gray-400')}>{day.date}</StyledText>
		</StyledPressable>
	)
}