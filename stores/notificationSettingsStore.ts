import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import intervals from "@/constants/notificationIntervals";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface NotificationSettingsStore {
    notificationsAllowed: boolean
    setNotificationsAllowed: (value: boolean) => void
    waterNotificationInterval: number
    setWaterNotificationInterval: (interval: number) => void
}

const useNotificationSettingsStore = create<NotificationSettingsStore>()(persist((setState) => ({
    notificationsAllowed: false,
    waterNotificationInterval: intervals[0].value,
    setNotificationsAllowed: (value) => {
        setState(() => ({
            notificationsAllowed: value
        }))
    },
    setWaterNotificationInterval: (interval) => {
        setState(() => ({
            waterNotificationInterval: interval
        }))
    }
}), {name: 'notificationSettings', storage: createJSONStorage(() => AsyncStorage)}))
export default useNotificationSettingsStore