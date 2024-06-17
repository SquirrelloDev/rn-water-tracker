import dayjs from "dayjs";
import {Day} from "@/types/days";

type Direction = 'backward' | 'forward'
export const generateDays = (date: Date | dayjs.Dayjs, count: number, direction: Direction = 'forward'): Day[] => {
    const outputArr: Day[] = []
    if (direction === 'backward') {
        for (let i = count; i > 0; i--) {
            const dateDiff = dayjs().subtract(i, 'day')
            outputArr.push({
                date: dateDiff.date(),
                month: dateDiff.month() + 1,
                year: dateDiff.year()
            })
        }
    }
    else if(direction === 'forward'){
        for (let i = 1; i <= count; i++) {
            const dateDiff = dayjs().add(i, 'day')
            outputArr.push({
                date: dateDiff.date(),
                month: dateDiff.month() + 1,
                year: dateDiff.year()
            })
        }
    }
    return outputArr
}