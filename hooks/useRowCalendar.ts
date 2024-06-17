import dayjs from "dayjs";
import {generateDays} from "@/utils/days";
import {Day} from "@/types/days";


export default function useRowCalendar() {
    const populateCalendar = (currentDate: Date | dayjs.Dayjs) => {
      //generate 3 days later and 12 days earlier
        const previousDays = generateDays(currentDate, 12, 'backward')
        const nextDays = generateDays(currentDate, 3)
        const days: Day[] = [...previousDays,{date: dayjs().date(), month: dayjs().month() + 1, year: dayjs().year()}, ...nextDays]
        return days
    }
    return populateCalendar
}