import {create} from "zustand";
import {Session} from "@supabase/supabase-js";
import {createJSONStorage, persist} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type UserData = {
    id: number
    dailyFluidIntake: number
    longestStreak: number
}
interface AuthStore {
    isLoggedIn: boolean
    session: Session | null
    userData: UserData | null
    setIsLoggedIn: (val: boolean) => void
    setSession: (session: Session) => void
    setUserData: (userData: UserData) => void
    clearSession: () => void
    clearUserData: () => void
}
const useAuthStore = create<AuthStore>()(persist<AuthStore>((setState, getState) => (
    {
        isLoggedIn: false,
        session: null,
        userData: null,
        setIsLoggedIn: (val: boolean) => {
            setState((state) => ({
                ...state, isLoggedIn: val
            }))
        },
        setSession: (session: Session) => {
            setState((state) => (
                {...state, session: session}
            ))
        },
        setUserData: (userData) => {
            setState(state => (
                {...state, userData: userData}
            ))
        },
        clearSession: () => {
            setState((state) => ({
                ...state, session: null
            }))
        },
        clearUserData: () => {
            setState((state) => ({
                ...state, userData: null
            }))
        }
    }
), {name: 'authStore', storage: createJSONStorage(() => AsyncStorage) }))
export default useAuthStore