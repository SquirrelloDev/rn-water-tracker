import {supabase} from "@/lib/supabase";
import {Alert} from "react-native";
import {MutationFunction, useMutation} from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {z} from "zod";
import {formErrorMessages} from "@/utils/errors";
import {AuthError, Session, User} from "@supabase/supabase-js";
export const signUpSchema = z.object({
  email: z.string({message: formErrorMessages.required}).min(1, formErrorMessages.required).email(formErrorMessages.invalidEmail),
  password: z.string({message: formErrorMessages.required}).min(8, formErrorMessages.passwdMin(8)).regex(/[0-9]+/, formErrorMessages.incorrectPasswd).regex(/[@$!%*#?&]+/, formErrorMessages.incorrectPasswd)
})
export type SignUpFormType = z.infer<typeof signUpSchema>
export type SignUpPostData = SignUpFormType & {dailyFluidIntake: number}

export const loginSchema = z.object({
  email: z.string({message: formErrorMessages.required}).min(1, formErrorMessages.required).email(formErrorMessages.invalidEmail),
  password: z.string({message: formErrorMessages.required}).min(8, formErrorMessages.required)
})
export type LoginSchema = z.infer<typeof loginSchema>
export type AuthParams = {
  email: string,
  password: string
}
type SignUpResponse = {
  user: User
  session: Session | null
}
type LoginResponse = {
  user: User
  session: Session
}
const signInWithEmail:MutationFunction<LoginResponse, AuthParams> = async ({email, password}: AuthParams) => {
  const {error, data} = await supabase.auth.signInWithPassword({email, password})
  if(error){
    throw new Error(error.message)
  }
  return {user: data.user, session: data.session}
}
const signUpWithEmail:MutationFunction<SignUpResponse, SignUpPostData> = async ({email, password, dailyFluidIntake}: SignUpPostData) => {
  const {error, data: {user, session}} = await supabase.auth.signUp({email, password})
  if(error){
    throw new Error(error.message)
  }
  const dbUserCreateResponse = await supabase.from('users').insert(
      {email: user?.email, daily_fluid_intake: dailyFluidIntake}
  )
  if(dbUserCreateResponse.error){
    throw new Error(dbUserCreateResponse.error.message)
  }
  return {user: user!, session: session}
}
const signInAsAnon = async () => {
  const {error, data} = await supabase.auth.signInAnonymously({options: {data: {id: 'anon'}}})
  if (error){
    throw new Error(error.message)
  }
  console.log("Signed in as anon", data.session)
}
const signOut = async () => {
  const {error} = await supabase.auth.signOut()
  if(error){
    Alert.alert(error.message)
  }
  console.log('signed out')
}
type SuccessSignUp<T> = (data: SignUpResponse, variables: T) => unknown
type SuccessLogIn<T> = (data: LoginResponse, variables: T) => unknown
type SuccessSignOut = () => unknown
export type ErrorFunctionMutation<T> = (err: AuthError, variables: T) => unknown
export function useLoginAuth(onSuccess?: SuccessLogIn<LoginSchema>, onError?: ErrorFunctionMutation<LoginSchema>) {
  const {mutate, isPending, isError, error, isSuccess} = useMutation({mutationKey: ['Log-in'], mutationFn: signInWithEmail, onSuccess, onError})
  return {mutate, isPending, isError, error, isSuccess}
}
export function useSignupAuth(onSuccess?: SuccessSignUp<SignUpPostData>, onError?: ErrorFunctionMutation<SignUpPostData>) {
  const {mutate, isPending, isError, error, isSuccess} = useMutation({mutationKey: ['Sign-up'], mutationFn: signUpWithEmail, onSuccess, onError})
  return {mutate, isPending, isError, error, isSuccess}
}
export function useSignOut(onSuccess?: SuccessSignOut) {
  const {mutate, isPending, isError, error, isSuccess} = useMutation({mutationKey: ['Sign-out'], mutationFn: signOut, onSuccess})
  return {mutate, isPending, isError, error, isSuccess}
}
export function useSignAnon() {
  const {mutate, isPending, isError, error, isSuccess} = useMutation({mutationKey: ['Sign-in-anon'], mutationFn: signInAsAnon})
  return {mutate, isPending, isError, error, isSuccess}
}
