import {AVPlaybackSource} from "expo-av";

type NotificationInterval = {
    title: string
    value: number
}
const intervals: NotificationInterval[] = [
    {title: 'Co 15 min.', value: 15},
    {title: 'Co 30 min.', value: 30},
    {title: 'Co 1 godz.', value: 60},
    {title: 'Co 1,5 godz.', value: 90},
    {title: 'Co 2 godz.', value: 120},
    {title: 'Co 3 godz.', value: 180},
] as const
export type Sounds = {
    title: string,
    fileName: string
    source: AVPlaybackSource
}
export const notificationSounds: Sounds[] = [
    {title: 'Domyślny', fileName: 'notif-1.mp3' , source: require(`@/assets/sounds/notif-1.mp3`)},
    {title: 'Brzdęk', fileName: 'notif-2.mp3' , source: require(`@/assets/sounds/notif-2.mp3`)},
    {title: 'Subtelny', fileName: 'notif-3.mp3' , source: require(`@/assets/sounds/notif-3.mp3`)},
    {title: 'Dzwonek', fileName: 'notif-4.mp3' , source: require(`@/assets/sounds/notif-4.mp3`)},
    {title: 'Dzwonek od drzwi', fileName: 'notif-5.mp3' , source: require(`@/assets/sounds/notif-5.mp3`)},
    {title: 'Nowoczesny', fileName: 'notif-6.mp3' , source: require(`@/assets/sounds/notif-6.mp3`)},
]
export default intervals