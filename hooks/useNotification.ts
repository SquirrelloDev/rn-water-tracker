import {
    cancelAllScheduledNotificationsAsync, cancelScheduledNotificationAsync,
    getPermissionsAsync,
    requestPermissionsAsync,
    scheduleNotificationAsync,
} from "expo-notifications";
import {Alert} from "react-native";
import useNotificationSettingsStore from "@/stores/notificationSettingsStore";
import {notificationSounds, Sounds} from "@/constants/notificationIntervals";
import {useCallback} from "react";

export default function useNotification() {
    const notificationsAllowed = useNotificationSettingsStore(state => state.notificationsAllowed)
    const setNotificationsAllowed = useNotificationSettingsStore(state => state.setNotificationsAllowed)
    const waterNotificationInterval: number = useNotificationSettingsStore(state => state.waterNotificationInterval)
    const setWaterNotificationInterval = useNotificationSettingsStore(state => state.setWaterNotificationInterval)
    const notificationSound: Sounds = useNotificationSettingsStore(state => state.notificationSound)
    const setNotificationSound = useNotificationSettingsStore(state => state.setNotificationSound)
    const soundEnabled = useNotificationSettingsStore(state => state.soundEnabled)
    const setSoundEnabled = useNotificationSettingsStore(state => state.setSoundEnabled)
    const permissionRequest = useCallback(async () => {
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
    }, [])
    const toggleNotificationsHandler = useCallback(async (currentSwitchValue: boolean) => {
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

    }, [])
    const scheduleAllNotifications = useCallback(async () => {
        const waterNotification = await scheduleNotificationAsync({
            content: {
                title: 'Pora na wodę!',
                body: 'Sięgnij po łyk napoju',
                sound: soundEnabled ? (notificationSound.fileName ?? notificationSounds[0].fileName) : false

            }, trigger: {
                repeats: true,
                seconds: 60 * waterNotificationInterval
            },
            identifier: 'waterReminder'
        })
        // TODO: move this from local notification to the push notification (include as an update)
        // const streakNotification = await scheduleNotificationAsync({
        //     content: {
        //         title: 'Twoja passa zostanie utracona!',
        //         body: 'Wypij szybko jakiś napój i wypełnij pierścień, by nie stracić passy!'
        //     },
        //     trigger: {
        //         repeats: true,
        //         seconds: 60 * 30
        //     },
        //     identifier: 'streakReminder'
        // })
    }, [])
    const changeWaterInterval = useCallback(async (interval: number) => {
        await cancelScheduledNotificationAsync('waterReminder')
        const newWaterNotification = await scheduleNotificationAsync({
            content: {
                body: 'Sięgnij po łyk napoju',
                title: 'Pora na wodę!',
                sound: soundEnabled ? (notificationSound.fileName ?? notificationSounds[0].fileName) : false

            }, trigger: {
                repeats: true,
                seconds: 60 * interval
            },
            identifier: 'waterReminder'
        })
        setWaterNotificationInterval(interval)
    }, [])
    const changeNotificationSound = useCallback((soundFile: Sounds) => {
        setNotificationSound(soundFile)
    }, [])
    const toggleNotificationSounds = (value: boolean) => {
        setSoundEnabled(value)
    }
    return {
        notificationsAllowed,
        toggleNotificationsHandler,
        changeWaterInterval,
        waterNotificationInterval,
        changeNotificationSound,
        toggleNotificationSounds,
        soundEnabled,
        notificationSound
    }
}