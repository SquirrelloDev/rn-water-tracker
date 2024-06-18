import {supabase} from "@/lib/supabase";
import {useMutation} from "@tanstack/react-query";


const addProgress = async () => {
    const {count, status, data} = await supabase.from('user_progress').insert({date: new Date(), time: `11:27:34`})
    return count
}
export default function useProgressCreate() {
    const {isError, isPending, mutate} = useMutation({mutationFn: addProgress, mutationKey: ['Add-progress'], onSuccess: () => console.log("query complete")})
    return {mutate, isError, isPending}
}