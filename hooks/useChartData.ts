import {DateRange, DateRangeObject} from "@/types/days";
import {useProgressRangeListing} from "@/queries/user_progress/listing";
import {useMemo} from "react";
import dayjs from "dayjs";
const weekDays = ['pon', 'wt', 'śr', 'czw', 'pt', 'sb', 'nd']
export default function useChartData(range: DateRange, currentDate: dayjs.Dayjs, dateRange: DateRangeObject, userId: number, userFluidIntake: number) {
    const {data, isError, error, isLoading, isSuccess} = useProgressRangeListing({userId, dates: dateRange})
    const yearMockData = useMemo(() => {
        return Array(12).fill(userFluidIntake).map((item, idx) => ({
            date: idx + 1,
            intake: item
        }))
    }, [userFluidIntake])
    const monthMockData = useMemo(() => {
        return Array(currentDate.daysInMonth()).fill(userFluidIntake).map((item, idx) => ({
            date: idx + 1,
            intake: item
        }))
    }, [userFluidIntake])
    const weekMockData = useMemo(() => {
        return Array(7).fill(userFluidIntake).map((item, idx) => ({
            date: idx + 1,
            intake: item
        }))
    }, [userFluidIntake])

    const mockDataArr = [weekMockData, monthMockData, yearMockData]

    const chartData = useMemo(() => {
        if(isSuccess){
            if(range === 'year'){
                const monthlyIntake = Array(12).fill(0)
                data?.progress.forEach(entry => {
                    const date = dayjs(entry.date)
                    const month = date.month()
                    monthlyIntake[month] += entry.intake
                })
                return monthlyIntake.map((intake, index) => ({
                    date: index + 1,
                    intake
                }))
            }
            if(range === 'month'){
                const monthlyIntake = Array(currentDate.daysInMonth()).fill(0)
                data?.progress.forEach(entry => {
                    const date = dayjs(entry.date)
                    const day = date.date() - 1
                    monthlyIntake[day] += entry.intake
                })
                return monthlyIntake.map((intake, idx) => ({
                    date: idx + 1,
                    intake
                }))
            }
            if(range === 'week'){
                const weeklyIntake = Array(7).fill(0)
                data?.progress.forEach(entry => {
                    const date = dayjs(entry.date)
                    const day = date.day()
                    weeklyIntake[day - 1 < 0 ? 6 : day - 1] += entry.intake

                })
                return weeklyIntake.map((intake, idx) => ({
                    date: weekDays[idx],
                    intake
                }))
            }
        }
        return []
    }, [data, isSuccess])

    return {chartData, mockDataArr, isError, error, isLoading}
}