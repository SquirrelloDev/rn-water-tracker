export type UserProgressEntry = {
    date: Date,
    intake: number,
    time: string
    drink: {
        id: number,
        name: string
    }
}