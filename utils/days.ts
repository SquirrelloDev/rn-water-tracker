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
export const dayToString = (day: Day): string => {
    const month = day.month < 10 ? '0' + day.month : day.month
    const date = day.date < 10 ? '0' + day.date : day.date
    return `${day.year}-${month}-${date}`
}
export const getDateWithoutTime = (date: Date) => {
    return dayjs(date).endOf('day').toISOString().substring(0, 10)
}
export const getCurrentTimeString = () => {
  return `${dayjs().hour()}:${dayjs().minute() < 10 ? '0' + dayjs().minute() : dayjs().minute()}:${dayjs().second() < 10 ? '0' + dayjs().second() : dayjs().second()}`
}
export const isToday = (date) => {
  const dayjsDate = dayjs(date)
    return dayjsDate.date() === dayjs().date() && dayjsDate.month() === dayjs().month() && dayjsDate.year() === dayjs().year()
}