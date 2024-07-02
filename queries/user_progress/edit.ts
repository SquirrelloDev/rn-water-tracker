import {MutationFunction, useMutation} from "@tanstack/react-query";
import {z} from "zod";
import {formErrorMessages} from "@/utils/errors";
import {supabase} from "@/lib/supabase";

export const editEntrySchema = z.object({
    date: z.coerce.date(),
    intake: z.coerce.number({message: formErrorMessages.required}).min(1, formErrorMessages.minMax(1, 3000)).max(3000, formErrorMessages.minMax(1,3000)),
    drinkId: z.coerce.number({message: formErrorMessages.required}),
    time: z.union([z.coerce.date(), z.coerce.string()])
})
export type EditEntrySchema = z.infer<typeof editEntrySchema>
export type EntryPutData = {
    id: number | null
    date: string,
    intake: number,
    userId: number,
    drinkId: number,
    time: string
}
const editProgress = async ({date, time, drinkId, intake, id}: EntryPutData) => {
  const {count, error} = await supabase.from('user_progress').update({date, time, intake, drink_id: drinkId}).eq('id', id)
    if (error){
        throw new Error(error.message)
    }
    return count
}
type SuccessFunctionMutation = () => unknown
export default function useProgressEdit(onSuccess?:SuccessFunctionMutation) {
    const {isError, isPending, mutate, error} = useMutation({mutationFn: editProgress, mutationKey: ['Edit-progress'], onSuccess})
    return {mutate, isError, isPending, error}
}