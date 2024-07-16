import {DateRange, DateRangeObject} from "@/types/days";
import {useMemo} from "react";
import {dayToString, getWeekRange} from "@/utils/days";
import dayjs from "dayjs";

export default function useDateRange(range: DateRange, currentDate: dayjs.Dayjs) {
    const dates: DateRangeObject = useMemo(() => {
        if (range === 'week') {
            return getWeekRange(dayjs(currentDate))
        }
        if (range === 'month') {
            return {
                startingDate: dayToString({date: 1, month: currentDate.month() + 1, year: currentDate.year()}),
                endingDate: dayToString({
                    date: currentDate.date(),
                    month: currentDate.month() + 1,
                    year: currentDate.year()
                })
            }
        }
        if(range ==='year'){
            return {
                startingDate: dayToString({date: 1, month: 1, year: currentDate.year()}),
                endingDate: dayToString({
                    date: 31,
                    month: 12,
                    year: currentDate.year()
                })
            }
        }
        return getWeekRange(dayjs(currentDate))
    }, [range, currentDate])
    return dates
}