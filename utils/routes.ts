export type ScreenNames = [
    'index',
    'Intro',
    'SignUpPersonalData',
    'SignupCredentials',
    'Login',
    'Dashboard',
    'AddFluid',
    'Settings',
    'Account',
    'Preferences',
    'Notifications',
    'Updates',
    'BugReport',
    'FAQ'
]
type AppRoutes = Record<string, ScreenNames[number]>
const appRoutes: AppRoutes = {
    index: 'index',
    intro: 'Intro',
    signupPersonalData: 'SignUpPersonalData',
    signupCredentials: 'SignupCredentials',
    login: 'Login',
    settings: 'Settings',
    account: 'Account',
    prefs: 'Preferences',
    notifications: 'Notifications',
    updates: 'Updates',
    bugReport: 'BugReport',
    faq: 'FAQ'
}
export default appRoutes
