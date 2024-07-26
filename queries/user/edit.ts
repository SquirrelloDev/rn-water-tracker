import {z} from "zod";
import {formErrorMessages} from "@/utils/errors";
import {MutationFunction} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase";
import {User, UserAttributes} from "@supabase/supabase-js";
import {useMutation} from "@tanstack/react-query";

export const editUserSchema = z.object({
    email: z.string({message: formErrorMessages.required}).min(1, formErrorMessages.required).email(formErrorMessages.invalidEmail),
})
export const editUserSchemaPassword = z.object({
    email: z.string({message: formErrorMessages.required}).min(1, formErrorMessages.required).email(formErrorMessages.invalidEmail),
    password: z.string({message: formErrorMessages.required}).min(8, formErrorMessages.passwdMin(8)).regex(/[0-9]+/, formErrorMessages.incorrectPasswd).regex(/[@$!%*#?&]+/, formErrorMessages.incorrectPasswd)
})
export type EditUserSchema = z.infer<typeof editUserSchemaPassword>
type UpdateUserResponse = {
    user: User
}
export type UpdateUserParams = {
    id: number
    email: string
    password?: string
}
const updateUserData: MutationFunction<UpdateUserResponse, UpdateUserParams> = async ({email, password, id}) => {
    const attributes: UserAttributes = !password ? {email} : {email, password}
    const {data, error} = await supabase.auth.updateUser(attributes)
    if (error) {
        throw new Error(error.message)
    }
    const {error: dbError} = await supabase.from('users').update({email}).eq('id', id)
    if(dbError){
        throw new Error(dbError.message)
    }
    return {user: data.user}
}
export const personalSchema = z.object({
    weight: z.coerce.number({message: formErrorMessages.required}).min(30, formErrorMessages.minMax(30, 250)).max(250, formErrorMessages.minMax(30, 250)),
})
export type PersonalData = z.infer<typeof personalSchema>
type UserDemandResponse = {
    message: string,
}
export type UserDemandParams = {
    demand: number,
    id: number
}
const updateUserDemand:MutationFunction<UserDemandResponse, UserDemandParams> = async ({demand, id}) => {
    const {error} = await supabase.from('users').update({daily_fluid_intake: demand}).eq('id', id)
    if(error){
        throw new Error(error.message)
    }
    return {message: 'Demand updated successfully!'}
}
type SuccessEditFunction = () => unknown
type SuccessEditDemandFn<T> = (data: UserDemandResponse, variables: T) => unknown
export function useUserEdit(onSuccess?:SuccessEditFunction){
    const {mutate, isPending, isError, error, isSuccess} = useMutation({mutationKey: ['Update-User'], mutationFn: updateUserData, onSuccess})
    return {mutate, isPending, isError, error, isSuccess}
}
export function useUserDemandEdit(onSuccess?:SuccessEditDemandFn<UserDemandParams>){
    const {mutate, isPending, isError, error, isSuccess} = useMutation({mutationKey: ['Update-User-Demand'], mutationFn: updateUserDemand, onSuccess})
    return {mutate, isPending, isError, error, isSuccess}
}