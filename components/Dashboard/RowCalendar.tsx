import {FlatList, View} from "react-native";
import {CalendarDay} from "@/components/Dashboard/CalendarDay";
import {RowCalendarConsts} from "@/constants/RowCalendar";
import useRowCalendar from "@/hooks/useRowCalendar";
import dayjs from "dayjs";

export function RowCalendar() {
	const populateCalendar = useRowCalendar()
	const days = populateCalendar(dayjs())
	return (
		<View className='my-4'>
			<FlatList horizontal={true} getItemLayout={(data, index) => (
				{length: RowCalendarConsts.ITEM_WIDTH, offset: RowCalendarConsts.ITEM_WIDTH * index, index}
			) } initialScrollIndex={days.length - 1} data={days} renderItem={({item}) => <CalendarDay day={item} />} />
		</View>
	)
}