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
    }
}