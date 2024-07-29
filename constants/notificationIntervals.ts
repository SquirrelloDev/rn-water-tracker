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
export default intervals