import {supabase} from "@/lib/supabase";
import {useMutation} from "@tanstack/react-query";
import {z} from "zod";
import {formErrorMessages} from "@/utils/errors";
export const addEntrySchema = z.object({
    date: z.coerce.date().optional(),
    intake: z.coerce.number().min(1, formErrorMessages.minMax(1, 3000)).max(3000, formErrorMessages.minMax(1,3000)),
    drinkId: z.coerce.number({message: formErrorMessages.required}),
    time: z.coerce.date().optional()
})
export type AddEntrySchema = z.infer<typeof addEntrySchema>
export type AddEntryPostData = {
    date?: string,
    intake: number,
    userId: number,
    drinkId: number,
    time?: string
}
const addProgress = async ({date, intake, userId, time, drinkId}: AddEntryPostData) => {
    const {count, error} = await supabase.from('user_progress').insert({date, time, intake, user_id: userId, drink_id: drinkId})
    if (error){
        throw new Error(error.message)
    }
    return count
}
type SuccessFunctionMutation = () => unknown
export default function useProgressCreate(onSuccess?:SuccessFunctionMutation) {
    const {isError, isPending, mutate} = useMutation({mutationFn: addProgress, mutationKey: ['Add-progress'], onSuccess})
    return {mutate, isError, isPending}
}