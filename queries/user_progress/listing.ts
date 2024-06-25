import {supabase} from "@/lib/supabase";
import {QueryFunction, useQuery} from "@tanstack/react-query";
import {UserProgressEntry} from "@/types/progress";
const listprogressQKString = 'List-Progress'
type ListProgressQK = [typeof listprogressQKString]
type ListProgressResponse = {
    progress:{
        date: Date,
        intake: number,
        time: string,
        userId: number,
        drinkId: number
    }[]
}
const listProgress:QueryFunction<ListProgressResponse, ListProgressQK> = async () => {
    const {data, error} = await supabase.from('user_progress').select("*")
    if(error){
        throw new Error(error.message)
    }
    return {progress: data}
}
const listuserQKString = 'List-Progress-User'
type ListUserParams = {
    date: string,
    userId: number
}
type ListUserQK = [typeof listuserQKString, ListUserParams]
type UserProgressResponse = {
    progress: UserProgressEntry[]
}
const listUserProgress:QueryFunction<UserProgressResponse, ListUserQK> = async ({queryKey}) => {
    const [,{date, userId}] = queryKey
    const {data, error} = await supabase.from('user_progress').select(`
    date,
    intake,
    time,
    drink_types (
        id,
        name
    )
    `).eq('user_id', userId).eq('date', date)
    if(error){
        throw new Error(error.message)
    }
    const finalData:UserProgressEntry[] = data!.length > 0 ? data!.map(item => ({date: item.date, intake: item.intake, time: item.time, drink: {id: Number(item.drink_types[0].id), name: String(item.drink_types[0].name)}})) : []
    return {progress: finalData}
}
export default function useProgressListing(){
    const {data, isError, isLoading} = useQuery({queryKey: ['List-Progress'], queryFn: listProgress})
    return {data, isLoading, isError}
}
export function useUserProgressListing(params: ListUserParams){
    const {data, isError, isLoading} = useQuery({queryKey: ['List-Progress-User', params], queryFn: listUserProgress})
    return {data, isLoading, isError}
}