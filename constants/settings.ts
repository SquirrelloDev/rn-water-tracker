import {Ionicons} from "@expo/vector-icons";
import appRoutes, {ScreenNames} from "@/utils/routes";

export type SettingItemType = {
    title: string
    icon?: keyof typeof Ionicons.glyphMap,
    route: ScreenNames[number]
}
type SettingSection = {
    title: string, data: SettingItemType[]
}
const generalSettingsList: SettingItemType[] = [
    {
        title: 'Konto i dane aplikacji',
        route: appRoutes.account,
        icon: 'person'
    },
    {
        title: 'Motyw',
        route: appRoutes.prefs,
        icon: 'image'
    },
    {
        title: 'Powiadomienia',
        route: appRoutes.notifications,
        icon: 'notifications'
    }
]
const otherSettingsList: SettingItemType[] = [
    {
        title: 'Co nowego?',
        route: appRoutes.updates,
        icon: 'help-circle'
    },
    {
        title: 'Zgłoś błąd',
        route: appRoutes.bugReport,
        icon: 'bug'
    },
    {
        title: 'FAQ',
        route: appRoutes.faq,
        icon: 'information-circle'
    }
    // {title: 'Zaproponuj funkcję', route: }
]
const settingSections: SettingSection[] = [
    {title: 'Ogólne', data: generalSettingsList},
    {title: 'Pozostałe', data: otherSettingsList}
]

export default settingSections