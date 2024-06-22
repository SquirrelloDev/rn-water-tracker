import {create} from "zustand";
import {supabase} from "@/lib/supabase";
import {Session} from "@supabase/supabase-js";

interface AuthStore {
    isLoggedIn: boolean
    session: Session | null
    setIsLoggedIn: (val: boolean) => void
    setSession: (session: Session) => void
    clearSession: () => void
}
const useAuthStore = create<AuthStore>()((setState, getState) => (
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
))
export default useAuthStore