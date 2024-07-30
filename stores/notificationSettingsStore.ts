import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import intervals, {notificationSounds, Sounds} from "@/constants/notificationIntervals";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface NotificationSettingsStore {
    notificationsAllowed: boolean
    setNotificationsAllowed: (value: boolean) => void
    waterNotificationInterval: number
    setWaterNotificationInterval: (interval: number) => void
    soundEnabled: boolean
    setSoundEnabled: (value: boolean) => void
    notificationSound: Sounds
    setNotificationSound: (soundObject: Sounds) => void
}

const useNotificationSettingsStore = create<NotificationSettingsStore>()(persist((setState) => ({
    notificationsAllowed: false,
    waterNotificationInterval: intervals[0].value,
    soundEnabled: true,
    notificationSound: notificationSounds[0],
    setNotificationsAllowed: (value) => {
        setState(() => ({
            notificationsAllowed: value
        }))
    },
    setWaterNotificationInterval: (interval) => {
        setState(() => ({
            waterNotificationInterval: interval
        }))
    },
    setNotificationSound: (soundObject) => {
        setState(() => ({
            notificationSound: soundObject
        }))
    },
    setSoundEnabled: (value) => {
        setState(() => ({
            soundEnabled: value
        }))
    },
}), {name: 'notificationSettings', storage: createJSONStorage(() => AsyncStorage)}))
export default useNotificationSettingsStore