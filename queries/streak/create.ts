import {supabase} from "@/lib/supabase";
import {useMutation} from "@tanstack/react-query";
import {FunctionsFetchError, FunctionsHttpError, FunctionsRelayError} from "@supabase/supabase-js";
const addStreakMKString = 'Add-Streak'
type AddStreakParams = {
    userId: number,
    date: string,
    currentStreak: number
}
const addStreak = async ({userId, date, currentStreak}: AddStreakParams) => {
  const {error, count} = await supabase.from('streaks').insert({user_id: userId, date})
    if(error){
        throw new Error(error.message)
    }
    const {error: functionError} = await supabase.functions.invoke('longestStreakUpdater', {body: {userId: userId, currentStreak}})
    if(functionError instanceof FunctionsHttpError){
        const errorMessage = await functionError.context.json()
        throw new Error(`Function returned an error: ${errorMessage}`)
    }
    else if (functionError instanceof FunctionsRelayError) {
        throw new Error(`Relay functionError: ${functionError.message}`)
    } else if (functionError instanceof FunctionsFetchError) {
        throw new Error(`Fetch functionError: ${functionError.message}`)
    }
    return count
}
type SuccessFunctionMutation = () => unknown
export default function useStreakAdd(onSuccess?:SuccessFunctionMutation){
    const {mutate, isError, error, isPending} = useMutation({mutationKey: [addStreakMKString], mutationFn: addStreak, onSuccess})
    return {mutate, error, isPending, isError}
}