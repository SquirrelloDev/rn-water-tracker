import {Text, View} from "react-native";
import {Day} from "@/types/days";
interface CalendarDayProps {
	day: Day
}
export function CalendarDay({day}:CalendarDayProps) {
	return (
		<View className='bg-red-700 mx-3 rounded-full w-12 h-12 justify-center'>
			<Text className='text-lg text-center'>{day.date}</Text>
		</View>
	)
}