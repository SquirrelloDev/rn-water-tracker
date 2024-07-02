import {Dimensions, FlatList} from "react-native";
import {CalendarDay} from "@/components/Dashboard/CalendarDay";
import {RowCalendarConsts} from "@/constants/RowCalendar";
import useRowCalendar from "@/hooks/useRowCalendar";
import dayjs from "dayjs";
import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {useRef} from "react";

export function RowCalendar() {
	const populateCalendar = useRowCalendar()
	const days = populateCalendar(dayjs())
	const flatListRef = useRef<FlatList>(null)
	const screen = Dimensions.get('screen')
	const snapToDay = (index: number) => {
		flatListRef.current?.scrollToIndex({index, viewOffset: ((screen.width / 2) - 80 )})
	}
	return (
		<StyledView className='my-4'>
			<FlatList horizontal={true} ref={flatListRef} getItemLayout={(data, index) => (
				{length: RowCalendarConsts.ITEM_WIDTH, offset: RowCalendarConsts.ITEM_WIDTH * index, index}
			) } initialScrollIndex={days.length - 1} showsHorizontalScrollIndicator={false} data={days} renderItem={({item, index}) => <CalendarDay day={item} index={index} snapToDay={snapToDay}/>} />
		</StyledView>
	)
}