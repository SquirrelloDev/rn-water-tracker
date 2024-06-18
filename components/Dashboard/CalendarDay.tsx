import {Pressable, Text, View} from "react-native";
import {Day} from "@/types/days";
import useDateStore from "@/stores/dateStore";
import clsx from "clsx";
import {dayToString} from "@/utils/days";
import dayjs from "dayjs";
import {LinearGradient} from "expo-linear-gradient";
interface CalendarDayProps {
	day: Day
	isCompleted: boolean
}
export function CalendarDay({day, isCompleted}:CalendarDayProps) {
	const selectedDate = useDateStore(state => state.selectedDate)
	const setSelectedDate = useDateStore(state => state.setSelectedDate)
	const isSameDate = dayjs(selectedDate).isSame(dayToString(day))
	const isAfter = dayjs(dayToString(day)).isAfter(selectedDate)
	const onPressHandler = () => {
		setSelectedDate(dayToString(day))
	}
	if (isCompleted){
		return (
			<Pressable onPress={onPressHandler} disabled={isAfter} className={clsx(isAfter && 'border-gray-400')}>
			<LinearGradient colors={!isAfter ? ['#ffcc33', '#ffb347'] : ['transparent']} className={clsx('mx-3 rounded-full w-12 h-12 justify-center', isAfter && 'border-gray-400')}>
				<Text className={clsx('text-lg text-center')}>{day.date}</Text>
			</LinearGradient>
			</Pressable>
		)
	}

	return (
		<Pressable onPress={onPressHandler} disabled={isAfter} className={clsx('mx-3 rounded-full w-12 h-12 justify-center', isSameDate ? 'bg-blue-400' : 'border', isAfter && 'border-gray-400')}>
			<Text className={clsx('text-lg text-center', isSameDate && 'text-white font-semibold', isAfter && 'text-gray-400')}>{day.date}</Text>
		</Pressable>
	)
}