export const formErrorMessages = {
    required: 'To pole jest wymagane',
    minMax: (min: number | null, max: number | null) => {
        if(!max){
            return `Minimalna wartość: ${min}`
        }
        if(!min){
            return `Maksymalna wartość ${max}`
        }
        return `Wartość powinna być w przedziale ${min} - ${max}`
    },
    invalidEmail: 'To nie wygląda jak adres e-mail...',
    passwdMin: (min: number) => `Hasło musi składać się z ${min} znaków`,
    incorrectPasswd: 'Hasło nie spełnia wymogów'
}
export const responseErrorMessages = {
    supabaseStreakFunctionError: 'Longest streak is still higher than current streak'
}