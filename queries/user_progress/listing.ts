import {supabase} from "@/lib/supabase";
import {QueryFunction, useQuery} from "@tanstack/react-query";
import {DateRange, DateRangeObject, Day} from "@/types/days";

const listprogressQKString = 'List-Progress'
type ListProgressQK = [typeof listprogressQKString]
type ListProgressResponse = {
    progress: {
        date: Date,
        intake: number,
        time: string,
        userId: number,
        drinkId: number
    }[]
}
const listProgress: QueryFunction<ListProgressResponse, ListProgressQK> = async () => {
    const {data, error} = await supabase.from('user_progress').select("*")
    if (error) {
        throw new Error(error.message)
    }
    return {progress: data}
}
export const listuserQKString = 'List-Progress-User'
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
// TODO: Add .single() to the end
const listUserProgress: QueryFunction<UserProgressResponse, ListUserQK> = async ({queryKey}) => {
    const [, {date, userId}] = queryKey
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
    if (error) {
        throw new Error(error.message)
    }
    return {progress: data}
}

const listOneQKString = 'List-One-Progress'
type ListOneProgressParams = {
    entryId: number | null
}
type ListOneQK = [typeof listOneQKString, ListOneProgressParams]
export type OneProgressResponse = {
    progress: {
        id: number,
        date: Date,
        intake: number,
        time: string,
        drink_id: number
    }
}
const listOneProgress: QueryFunction<OneProgressResponse, ListOneQK> = async ({queryKey}) => {
    const [, {entryId}] = queryKey
    if (!entryId) {
        throw new Error('No drink identifier provided!')
    }
    const {data, error} = await supabase.from('user_progress').select(`    
    id,
    date,
    intake,
    time,
    drink_id
`).eq('id', entryId).single()
    if (error) {
        throw new Error(error.message)
    }
    return {progress: data}
}
export const listProgressByRangeQKString = 'List-progress-range'
type ProgressRangeParams = {
    userId: number
    dates: DateRangeObject
}
type ListProgressByRangeQK = [typeof listProgressByRangeQKString, ProgressRangeParams]
// @ts-expect-error the drink_types is only one object, not an array of objects
const listProgressByRange: QueryFunction<UserProgressResponse, ListProgressByRangeQK> = async ({queryKey}) => {
    const [, {userId, dates}] = queryKey
    const {data, error} = await supabase.from('user_progress').select(`id,
      date,
      intake,
      time,
      drink_types (
          id,
          name
      )`).eq('user_id', userId).gte('date', dates.startingDate).lte('date', dates.endingDate)
    if (error) {
        throw new Error(error.message)
    }
    return {progress: data}
}
export default function useProgressListing() {
    const {data, isError, isLoading} = useQuery({queryKey: [listprogressQKString], queryFn: listProgress})
    return {data, isLoading, isError}
}

export function useUserProgressListing(params: ListUserParams) {
    const {data, isError, isLoading} = useQuery({queryKey: [listuserQKString, params], queryFn: listUserProgress})
    return {data, isLoading, isError}
}

export function useOneProgressListing(params: ListOneProgressParams) {
    const {data, isError, isLoading, error} = useQuery({queryKey: [listOneQKString, params], queryFn: listOneProgress})
    return {data, isLoading, isError, error}
}
export function useProgressRangeListing(params: ProgressRangeParams){
    const {data, isError, isLoading, error, isSuccess} = useQuery({queryKey: [listProgressByRangeQKString, params], queryFn: listProgressByRange})
    return {data, isLoading, isError, error, isSuccess}
}