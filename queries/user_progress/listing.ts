import {supabase} from "@/lib/supabase";
import {QueryFunction, useQuery} from "@tanstack/react-query";
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
    return {progress: data}
}
const listuserQKString = 'List-Progress-User'
type ListUserParams = {
    date: string,
    userId: number
}
type ListUserQK = [typeof listuserQKString, ListUserParams]
type UserProgressResponse = {
    progress: {
        date: Date,
        intake: number,
    }[]
}
const listUserProgress:QueryFunction<UserProgressResponse, ListUserQK> = async ({queryKey}) => {
    const [,{date, userId}] = queryKey
    const {data, error} = await supabase.from('user_progress').select(`
    date,
    intake
    `).eq('user_id', userId).eq('date', date)
    return {progress: data}
}
export default function useProgressListing(){
    const {data, isError, isLoading} = useQuery({queryKey: ['List-progress'], queryFn: listProgress})
    return {data, isLoading, isError}
}
export function useUserProgressListing(params: ListUserParams){
    const {data, isError, isLoading} = useQuery({queryKey: ['List-Progress-User', params], queryFn: listUserProgress})
    return {data, isLoading, isError}
}