import {useState} from "react";
import {
    cancelAllScheduledNotificationsAsync,
    getPermissionsAsync,
    requestPermissionsAsync,
    scheduleNotificationAsync
} from "expo-notifications";
import {Alert} from "react-native";

export default function useNotification(){
    const [notificationsAllowed, setNotificationsAllowed] = useState<boolean>(false)
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
        if(!isGranted){
            Alert.alert('Nie zezwolono na powiadomienia!', 'Zezwól na powiadomienia w ustawieniach', [
                {text: 'Zamknij'}
            ])
        }

        if(currentSwitchValue){
            await scheduleAllNotifications()
            setNotificationsAllowed(true)
        }
        else{
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
                seconds: 60 * 2
            }
        })
        const streakNotification = await scheduleNotificationAsync({
            content: {
                title: 'Twoja passa zostanie utracona!',
                body: 'Wypij szybko jakiś napój i wypełnij pierścień, by nie stracić passy!'
            },
            trigger: {
                repeats: true,
                seconds: 60 * 30
            }
        })
    }
    return {notificationsAllowed, toggleNotificationsHandler}
}