export type Day = {
    date: number,
    month: number,
    year: number
}
export type DateRange = 'week' | 'month' | 'year'

export type DateRangeObject = {startingDate: string, endingDate: string}