export function percents(maxVal: number, unknownVal: number) {
    return Math.floor((unknownVal * 100) / maxVal);
}
export function percentageSubtractionCheck(allIntakesSum: number, userIntake: number, drinkEntryIntake: number): boolean {
    const subtractedValue = allIntakesSum - drinkEntryIntake
    return percents(userIntake, subtractedValue) < 100
}