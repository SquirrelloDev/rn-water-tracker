import {supabase} from "@/lib/supabase";
import {useMutation} from "@tanstack/react-query";
const addStreakMKString = 'Add-Streak'
type AddStreakParams = {
    userId: number,
    date: string
}
const addStreak = async ({userId, date}: AddStreakParams) => {
  const {error, count} = await supabase.from('streaks').insert({user_id: userId, date})
    if(error){
        throw new Error(error.message)
    }
    return count
}
type SuccessFunctionMutation = () => unknown
export default function useStreakAdd(onSuccess?:SuccessFunctionMutation){
    const {mutate, isError, error, isPending} = useMutation({mutationKey: [addStreakMKString], mutationFn: addStreak, onSuccess})
    return {mutate, error, isPending, isError}
}