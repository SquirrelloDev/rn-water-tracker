import {QueryFunction, useQuery} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase";
import {StreakData} from "@/types/streaks";
type ListStreakParams = { userId: string }

export const listStreakQKString = 'List-streak'
type ListStreakQK = [typeof listStreakQKString, ListStreakParams]
type ListStreakResponse = {
    list: StreakData[]
    count: number
}
const listStreak: QueryFunction<ListStreakResponse, ListStreakQK> = async ({queryKey}) => {
    const [, {userId}] = queryKey
    const {error, count, data} = await supabase.from('streaks').select('*', {count: 'exact'}).eq('user_id', userId)
    if(error){
        throw new Error(error.message)
    }
    return {count: count, list: data}
}
export default function useStreakListing(params: ListStreakParams){
    const {data, isError, error, isLoading, isSuccess} = useQuery({queryKey: [listStreakQKString, params], queryFn: listStreak})
    return {data, isError, error, isLoading, isSuccess}
}
