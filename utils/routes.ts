export type ScreenNames = [
    'index',
    'Intro',
    'SignUpPersonalData',
    'SignupCredentials',
    'Login',
    'Dashboard',
    'AddFluid'
]
const appRoutes: Record<string, ScreenNames[number]> = {
    index: 'index',
    intro: 'Intro',
    signupPersonalData: 'SignUpPersonalData',
    signupCredentials: 'SignupCredentials',
    login: 'Login'
}
export default appRoutes
