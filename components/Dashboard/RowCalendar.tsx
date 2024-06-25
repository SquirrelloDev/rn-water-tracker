import {FlatList} from "react-native";
import {CalendarDay} from "@/components/Dashboard/CalendarDay";
import {RowCalendarConsts} from "@/constants/RowCalendar";
import useRowCalendar from "@/hooks/useRowCalendar";
import dayjs from "dayjs";
import {StyledView} from "@/components/StyledComponents/StyledComponents";

export function RowCalendar() {
	const populateCalendar = useRowCalendar()
	const days = populateCalendar(dayjs())
	return (
		<StyledView className='my-4'>
			<FlatList horizontal={true} getItemLayout={(data, index) => (
				{length: RowCalendarConsts.ITEM_WIDTH, offset: RowCalendarConsts.ITEM_WIDTH * index, index}
			) } initialScrollIndex={days.length - 1} showsHorizontalScrollIndicator={false} data={days} renderItem={({item}) => <CalendarDay day={item}/>} />
		</StyledView>
	)
}