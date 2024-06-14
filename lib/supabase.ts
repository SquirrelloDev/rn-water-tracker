import {createClient} from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppState} from "react-native";
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnon = process.env.EXPO_PUBLIC_SUPABASE_ANON
export const supabase = createClient(supabaseUrl, supabaseAnon, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
})
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})