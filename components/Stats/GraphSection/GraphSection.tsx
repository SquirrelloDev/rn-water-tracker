import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {CustomSegmentedControl} from "@/components/Stats/GraphSection/CustomSegmentedControl";
import {useCallback, useState} from "react";
import {VictoryAxis, VictoryBar, VictoryChart} from "victory-native";
import dayjs from "dayjs";
import {DateRange} from "@/types/days";
import useDateRange from "@/hooks/useDateRange";
import useAuthStore from "@/stores/authStore";
import useChartData from "@/hooks/useChartData";
import {ErrorBox} from "@/components/Auth/ErrorBox";
import {DatePagination} from "@/components/Stats/GraphSection/DatePagination";
import {GraphSkeleton} from "@/components/Stats/GraphSection/GraphSkeleton";
import {NativeSyntheticEvent} from "react-native";
import {NativeSegmentedControlIOSChangeEvent} from "@react-native-segmented-control/segmented-control";
import {AverageConsumptionInfo} from "@/components/Stats/GraphSection/AverageConsumptionInfo";
import {useColorScheme} from "nativewind";
import COLORS from "@/constants/theme/colors";

const segmentedControlValues = ['tygodniowe', 'miesięczne', 'roczne']
const rangeValues: DateRange[] = ['week', 'month', 'year']

export function GraphSection() {
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs())
    const {colorScheme} = useColorScheme()
    const userData = useAuthStore(state => state.userData)
    const dateRange = useDateRange(rangeValues[selectedIndex], currentDate)
    const {
        isLoading,
        mockDataArr,
        chartData,
        isError,
        error
    } = useChartData(rangeValues[selectedIndex], currentDate, dateRange, userData!.id, userData!.dailyFluidIntake)
    const selectedMockData = mockDataArr[selectedIndex]
    const changeRangeHandler = useCallback((event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
        setCurrentDate(dayjs())
    }, [])
    const previousDateHandler = useCallback(() => {
        if (selectedIndex === 0) {
            setCurrentDate(prevState => prevState.subtract(7, 'day'))
        }
        if (selectedIndex === 1) {
            setCurrentDate(prevState => prevState.subtract(1, 'month'))
        }
        if (selectedIndex === 2) {
            setCurrentDate(prevState => prevState.subtract(1, 'year'))
        }
    }, [selectedIndex])
    const nextDateHandler = useCallback(() => {
        if (selectedIndex === 0) {
            setCurrentDate(prevState => prevState.add(7, 'day'))
        }
        if (selectedIndex === 1) {
            setCurrentDate(prevState => prevState.add(1, 'month'))
        }
        if (selectedIndex === 2) {
            setCurrentDate(prevState => prevState.add(1, 'year'))
        }
    }, [selectedIndex])
    return (
        <StyledView className={'py-4'}>
            <CustomSegmentedControl values={segmentedControlValues} selectedIndex={selectedIndex}
                                    onChange={changeRangeHandler} style={{height: 50}}/>
            {isError && <ErrorBox errorMessage={'Nie możemy pobrać danych'}/>}
                    <DatePagination currentDate={currentDate} dateRange={dateRange} selectedIndex={selectedIndex}
                                    previousDateHandler={previousDateHandler} nextDateHandler={nextDateHandler}/>
            {(isLoading && !isError) ? <GraphSkeleton/> : (
                <StyledView className={'relative'}>
                    <StyledView className={'absolute bottom-0'}>
                        <VictoryChart domainPadding={{y: 5}} domain={{y: [0, selectedIndex > 1 ? userData!.dailyFluidIntake * currentDate.daysInMonth() : userData!.dailyFluidIntake]}}>
                            <VictoryAxis style={{
                                tickLabels: {
                                    fill: colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black
                                }
                            }}/>
                            <VictoryAxis dependentAxis style={{
                                tickLabels: {
                                    fill: colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black
                                }
                            }}/>
                        <VictoryBar data={chartData} x={'date'} y={'intake'} style={{data: {fill: '#49c4e1'}}}
                                    padding={{
                                        left: selectedIndex === 1 ? 10 : 50,
                                        right: selectedIndex === 1 ? 10 : 50,
                                        top: 40,
                                        bottom: 40
                                    }} barWidth={selectedIndex === 1 ? 5 : 10} cornerRadius={selectedIndex === 1 ? {bottom: 3, top: 3} : {bottom: 4, top: 4}}/>
                        </VictoryChart>
                    </StyledView>
                    <StyledView className={'relative -z-10'}>
                        <VictoryBar data={selectedMockData} x={'date'} y={'intake'} padding={{
                            left: selectedIndex === 1 ? 50 : 50,
                            right: selectedIndex === 1 ? 50 : 50,
                            top: 40,
                            bottom: 50
                        }} barWidth={selectedIndex === 1 ? 5 : 10} cornerRadius={selectedIndex === 1 ? {bottom: 3, top: 3} : {bottom: 4, top: 4}} style={{data: {fill: '#6a6a6a'}}}/>
                    </StyledView>
                </StyledView>
            )}
            {/*TODO: Add this feature in update in order to practice update process*/}
            {/*<StyledText>Sekcja rozkładu procentowego wypitych napoi</StyledText>*/}
            <AverageConsumptionInfo rangeName={segmentedControlValues[selectedIndex]} isLoading={isLoading} chartData={chartData}/>
        </StyledView>
    );
}