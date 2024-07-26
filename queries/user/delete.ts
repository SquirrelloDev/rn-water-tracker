import {supabase} from "@/lib/supabase";
import {FunctionsFetchError, FunctionsHttpError, FunctionsRelayError} from "@supabase/supabase-js";
import {MutationFunction, useMutation} from "@tanstack/react-query";
type UserDeleteResponse = {
    message: string
}
type UserDeleteParams = {
    userId: number
}
const deleteUser: MutationFunction<UserDeleteResponse, UserDeleteParams> = async ({userId}) => {
    const {data: user, error: userError} = await supabase.auth.getUser()
    if (userError){
        throw new Error(userError.message)
    }
    console.log(userId, user.user?.id)
    const {data, error: functionError} = await supabase.functions.invoke('deleteUser', {method: 'DELETE', body: {userId: userId, authId: user.user!.id} })
    if(functionError instanceof FunctionsHttpError){
        const errorMessage = await functionError.context.json()
        throw new Error(`Function returned an error: ${errorMessage}`)
    }
    else if (functionError instanceof FunctionsRelayError) {
        throw new Error(`Relay functionError: ${functionError.message}`)
    } else if (functionError instanceof FunctionsFetchError) {
        throw new Error(`Fetch functionError: ${functionError.message}`)
    }
    return {message: data.message}
}
type SuccessDeleteFn = () => unknown
export default function useUserDelete(onSuccess?: SuccessDeleteFn) {
    const {mutate, isError, isSuccess, isPending, error} = useMutation({mutationFn: deleteUser, mutationKey: ['Delete-User'], onSuccess})
    return {mutate, isError, isSuccess, isPending, error}
}