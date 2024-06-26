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
export type UserProgressResponse = {
    progress: {
        id: number,
        date: Date,
        intake: number,
        time: string,
        drink_types: {
            id: number,
            name: string
        }
    }[]
}
// @ts-expect-error the drink_types is only one object, not an array of objects
const listUserProgress:QueryFunction<UserProgressResponse, ListUserQK> = async ({queryKey}) => {
    const [,{date, userId}] = queryKey
    const {data, error} = await supabase.from('user_progress').select(`
    id,
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
    return {progress: data}
}
export default function useProgressListing(){
    const {data, isError, isLoading} = useQuery({queryKey: ['List-Progress'], queryFn: listProgress})
    return {data, isLoading, isError}
}
export function useUserProgressListing(params: ListUserParams){
    const {data, isError, isLoading} = useQuery({queryKey: ['List-Progress-User', params], queryFn: listUserProgress})
    return {data, isLoading, isError}
}