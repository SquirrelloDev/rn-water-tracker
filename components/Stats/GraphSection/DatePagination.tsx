import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import dayjs from "dayjs";
import {Ionicons} from "@expo/vector-icons";
import {DateRangeObject} from "@/types/days";
import {useColorScheme} from "nativewind";
import COLORS from "@/constants/theme/colors";

interface DatePaginationProps {
    selectedIndex: number
    currentDate: dayjs.Dayjs
    previousDateHandler: () => void
    nextDateHandler: () => void
    dateRange: DateRangeObject
}

const weeklyOptions = {
    day: 'numeric',
    month: 'long'
}

const monthlyOptions = {
    month: 'long',
    year: 'numeric'
}
const yearlyOptions = {
    year: 'numeric'
}
const formatterOptions = [weeklyOptions, monthlyOptions, yearlyOptions]

export function DatePagination({
                                   selectedIndex,
                                   currentDate,
                                   dateRange,
                                   previousDateHandler,
                                   nextDateHandler
                               }: DatePaginationProps) {
    const {colorScheme} = useColorScheme()
    const dateFormatter = new Intl.DateTimeFormat('pl-PL', formatterOptions[selectedIndex] as Intl.DateTimeFormatOptions)
    const formattedDate = selectedIndex === 0 ? `${dateFormatter.format(new Date(dateRange.startingDate))} - ${dateFormatter.format(new Date(dateRange.endingDate))}` : dateFormatter.format(currentDate.toDate())
    return (
        <StyledView className={'bg-slate-300 py-3 px-4 my-4 mx-7 rounded-full flex-row justify-between items-center dark:bg-neutral-700'}>
            <StyledPressable onPress={previousDateHandler}>
                <Ionicons name={'chevron-back'} size={24} color={colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black}/>
            </StyledPressable>
            <StyledText className={'text-center text-base dark:text-white'}>{formattedDate}</StyledText>
            <StyledPressable onPress={nextDateHandler}>
                <Ionicons name={'chevron-forward'} size={24} color={colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black}/>
            </StyledPressable>
        </StyledView>
    );
}