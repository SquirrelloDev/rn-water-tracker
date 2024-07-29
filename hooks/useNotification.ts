import {
    cancelAllScheduledNotificationsAsync, cancelScheduledNotificationAsync,
    getPermissionsAsync,
    requestPermissionsAsync,
    scheduleNotificationAsync
} from "expo-notifications";
import {Alert} from "react-native";
import useNotificationSettingsStore from "@/stores/notificationSettingsStore";
export default function useNotification() {
    const notificationsAllowed = useNotificationSettingsStore(state => state.notificationsAllowed)
    const setNotificationsAllowed = useNotificationSettingsStore(state => state.setNotificationsAllowed)
    const waterNotificationInterval: number = useNotificationSettingsStore(state => state.waterNotificationInterval)
    const setWaterNotificationInterval = useNotificationSettingsStore(state => state.setWaterNotificationInterval)
    const permissionRequest = async () => {
        const notificationSettings = await getPermissionsAsync();
        if (!notificationSettings.granted) {
            const res = await requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                }
            })
            return res.granted
        }
        return true
    }
    const toggleNotificationsHandler = async (currentSwitchValue: boolean) => {
        const isGranted = await permissionRequest()
        if (!isGranted) {
            Alert.alert('Nie zezwolono na powiadomienia!', 'Zezwól na powiadomienia w ustawieniach', [
                {text: 'Zamknij'}
            ])
            return
        }

        if (currentSwitchValue) {
            await scheduleAllNotifications()
            setNotificationsAllowed(true)
        } else {
            await cancelAllScheduledNotificationsAsync()
            setNotificationsAllowed(false)
        }

    }
    const scheduleAllNotifications = async () => {
        const waterNotification = await scheduleNotificationAsync({
            content: {
                body: 'Sięgnij po łyk napoju',
                title: 'Pora na wodę!',

            }, trigger: {
                repeats: true,
                seconds: 60 * waterNotificationInterval
            },
            identifier: 'waterReminder'
        })
        const streakNotification = await scheduleNotificationAsync({
            content: {
                title: 'Twoja passa zostanie utracona!',
                body: 'Wypij szybko jakiś napój i wypełnij pierścień, by nie stracić passy!'
            },
            trigger: {
                repeats: true,
                seconds: 60 * 30
            },
            identifier: 'streakReminder'
        })
    }
    const changeWaterInterval = async (interval: number) => {
      await cancelScheduledNotificationAsync('waterReminder')
        const newWaterNotification = await scheduleNotificationAsync({
            content: {
                body: 'Sięgnij po łyk napoju',
                title: 'Pora na wodę!',

            }, trigger: {
                repeats: true,
                seconds: 60 * interval
            },
            identifier: 'waterReminder'
        })
        setWaterNotificationInterval(interval)
    }
    return {notificationsAllowed, toggleNotificationsHandler, changeWaterInterval, waterNotificationInterval}
}