import {UserProgressEntry} from "@/types/progress";
import {UserProgressResponse} from "@/queries/user_progress/listing";
import {useMemo} from "react";
import {percents} from "@/utils/calculations";
import {UserData} from "@/stores/authStore";

export default function useDashboardData(data: UserProgressResponse | undefined, isLoading: boolean, userData: UserData){
    const transformedData = useMemo<UserProgressEntry[]>(() => {
        if(!isLoading && data){
            return data.progress.map(item => ({id: item.id, date: item.date, intake: item.intake, time: item.time, drink: {id: Number(item.drink_types.id), name: String(item.drink_types.name)}}))
        }
        return []
    }, [isLoading, data])
    const percentage = useMemo<number>(() => {
        if(!isLoading){
            const allIntakes = transformedData.reduce((acc, item) => {
                return acc + item.intake
            }, 0)
            return percents(userData!.dailyFluidIntake, allIntakes) / 100
        }
        return 0
    }, [isLoading, transformedData])
    return {transformedData, percentage}
}