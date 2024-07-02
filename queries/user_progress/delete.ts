import {useMutation} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase";

type DeleteEntryParams = number | null
const deleteEntry = async (id: DeleteEntryParams) => {
  const {error, count} = await supabase.from('user_progress').delete().eq('id', id)
    if(!id){
        throw new Error('No drink id provided!')
    }
  if(error){
      throw new Error(error.message)
  }
  return count
}

type SuccessFunctionMutation = () => unknown
function useProgressDelete(onSuccess?: SuccessFunctionMutation) {
    const {mutate, error, isError, isPending} = useMutation({mutationKey: ['Delete-Progress'], mutationFn: deleteEntry, onSuccess})
    return {mutate, error, isError, isPending}
}
export default useProgressDelete