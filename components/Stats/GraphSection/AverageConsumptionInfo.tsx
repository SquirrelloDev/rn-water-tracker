import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {DateRange} from "@/types/days";
import {useMemo} from "react";
import {ChartData} from "@/hooks/useChartData";
import {ActivityIndicator} from "react-native";
interface AverageConspumtionInfoProps {
    rangeName: string
    chartData: ChartData
    isLoading: boolean
}
export function AverageConsumptionInfo({rangeName, chartData, isLoading}:AverageConspumtionInfoProps) {
    const averageConsumption = useMemo(() => {
        const allIntakes = chartData.reduce((acc, item) => acc + item.intake, 0)
        return allIntakes / chartData.length
    }, [chartData])
    return (
        <StyledView className={'mx-3 p-4 bg-white rounded-xl shadow-sm dark:bg-neutral-800'}>
            <StyledText className={'font-bold text-xl mb-2 dark:text-white'}>Średnie {rangeName} spożycie</StyledText>
            {isLoading ? <ActivityIndicator size={"large"}/> : <StyledText className={'font-bold text-2xl dark:text-white'}>{averageConsumption.toFixed(2)} ml</StyledText>}
        </StyledView>
    );
}