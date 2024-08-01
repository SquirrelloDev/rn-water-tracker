import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ColorSchemeSystem} from "nativewind/dist/style-sheet/color-scheme";
interface UserPrefsStore {
    currentTheme: ColorSchemeSystem
    setCurrentTheme: (theme: ColorSchemeSystem) => void
}
const useUserPrefsStore = create<UserPrefsStore>()(persist((setState, getState) => ({
    currentTheme: 'system',
    setCurrentTheme: (theme) => {
        setState({currentTheme: theme})
    }
}), {name: 'user-prefs', storage: createJSONStorage(() => AsyncStorage)}))
export default useUserPrefsStore