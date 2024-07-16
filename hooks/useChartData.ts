import {DateRange, DateRangeObject} from "@/types/days";
import {useProgressRangeListing} from "@/queries/user_progress/listing";
import {useMemo} from "react";
import dayjs from "dayjs";

export default function useChartData(range: DateRange, dateRange: DateRangeObject, userId: number) {
    const {data, isError, error, isLoading, isSuccess} = useProgressRangeListing({userId, dates: dateRange})
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
                    month: index + 1,
                    intake
                }))
            }
            return data?.progress.map(item => ({
                date: item.date,
                intake: item.intake,
                drinkTypes: item.drink_types
            }))
        }
        return []
    }, [data, isSuccess])
    return {chartData, isError, error, isLoading}
}