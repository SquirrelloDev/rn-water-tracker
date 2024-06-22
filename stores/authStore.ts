import {create} from "zustand";
import {Session} from "@supabase/supabase-js";
import {createJSONStorage, persist} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthStore {
    isLoggedIn: boolean
    session: Session | null
    setIsLoggedIn: (val: boolean) => void
    setSession: (session: Session) => void
    clearSession: () => void
}
const useAuthStore = create<AuthStore>()(persist<AuthStore>((setState, getState) => (
    {
        isLoggedIn: false,
        session: null,
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
        clearSession: () => {
            setState((state) => ({
                ...state, session: null
            }))
        }
    }
), {name: 'authState', storage: createJSONStorage(() => AsyncStorage) }))
export default useAuthStore