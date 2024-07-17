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
export function AverageConspumtionInfo({rangeName, chartData, isLoading}:AverageConspumtionInfoProps) {
    const averageConsumption = useMemo(() => {
        const allIntakes = chartData.reduce((acc, item) => acc + item.intake, 0)
        return allIntakes / chartData.length
    }, [chartData])
    return (
        <StyledView className={'m-3 p-4 bg-white rounded-xl'}>
            <StyledText className={'font-bold text-xl mb-2'}>Średnie {rangeName} spożycie</StyledText>
            {isLoading ? <ActivityIndicator size={"large"}/> : <StyledText className={'font-bold text-2xl'}>{averageConsumption.toFixed(2)} ml</StyledText>}
        </StyledView>
    );
}