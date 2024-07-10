import {supabase} from "@/lib/supabase";
import {useMutation} from "@tanstack/react-query";
const deleteStreakEntryKey = 'Delete-Streak-Entry'
type DeleteStreakEntryParams = {
    userId: number,
    date: string
}
const deleteStreakEntry = async ({userId, date}: DeleteStreakEntryParams) => {
    const {error, data, count} = await supabase.from('streaks').delete().eq('user_id', userId).eq('date', date)
    if (error) {
        throw new Error(error.message)
    }
    return count
}
export default function useDeleteStreakEntry(){
    const {mutate, isSuccess, error, isPending, isError} = useMutation({mutationFn: deleteStreakEntry, mutationKey: [deleteStreakEntryKey]})
    return {mutate, isSuccess, error, isPending, isError}
}