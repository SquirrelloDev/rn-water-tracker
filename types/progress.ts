export type UserProgressEntry = {
    id: number
    date: Date,
    intake: number,
    time: string
    drink: {
        id: number,
        name: string
    }
}