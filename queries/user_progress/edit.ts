import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from "zod";
import {formErrorMessages} from "@/utils/errors";
import {supabase} from "@/lib/supabase";

export const editEntrySchema = z.object({
    date: z.coerce.date().optional(),
    intake: z.coerce.number().min(1, formErrorMessages.minMax(1, 3000)).max(3000, formErrorMessages.minMax(1,3000)),
    drinkId: z.coerce.number({message: formErrorMessages.required}),
    time: z.coerce.date().optional()
})
export type EditEntrySchema = z.infer<typeof editEntrySchema>
export type EntryPutData = {
    id: number | null
    date?: string,
    intake: number,
    userId: number,
    drinkId: number,
    time?: string
}
const editProgress:MutationFunction = async ({date, time, drinkId, intake, id}: EntryPutData) => {
  const {count, error} = await supabase.from('user_progress').update({date, time, intake, drink_id: drinkId}).eq('id', id)
    if (error){
        throw new Error(error.message)
    }
    return count
}
type SuccessFunctionMutation = () => unknown
export default function useProgressEdit(onSuccess?:SuccessFunctionMutation) {
    const {isError, isPending, mutate} = useMutation({mutationFn: editProgress, mutationKey: ['Edit-progress'], onSuccess})
    return {mutate, isError, isPending}
}