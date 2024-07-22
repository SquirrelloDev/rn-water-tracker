export type ScreenNames = [
    'index',
    'Intro',
    'SignUpPersonalData',
    'SignupCredentials',
    'Login',
    'Dashboard',
    'AddFluid',
    'Settings'
]
const appRoutes: Record<string, ScreenNames[number]> = {
    index: 'index',
    intro: 'Intro',
    signupPersonalData: 'SignUpPersonalData',
    signupCredentials: 'SignupCredentials',
    login: 'Login',
    settings: 'Settings'
}
export default appRoutes
