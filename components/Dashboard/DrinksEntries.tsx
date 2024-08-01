import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {UserProgressEntry} from "@/types/progress";
import {ActivityIndicator, FlatList, Platform, StyleSheet} from "react-native";
import {DrinkEntry} from "@/components/Dashboard/DrinkEntry";
import {useCallback, useMemo, useRef, useState} from "react";
import {IconButton} from "@/components/UI/IconButton";
import clsx from "clsx";
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import {useColorScheme} from "nativewind";
import COLORS from "@/constants/theme/colors";
interface DrinksEntriesProps {
	isLoading: boolean,
	userProgress: UserProgressEntry[]
}
export function DrinksEntries({isLoading, userProgress}:DrinksEntriesProps) {
	const {colorScheme} = useColorScheme()
	const bottomSheetRef = useRef<BottomSheet>(null)
	const [expanded, setExpanded] = useState<boolean>(false)
	const snapPoints = useMemo(() => ['25%', '50%', (Platform.OS === 'ios' ? '75%' : '80%')], [])
	const toggleExpanded = useCallback((index: number) => {
		if(index > 0){
			setExpanded(true)
		}
		else {
			setExpanded(false)
		}
	}, [])
	const renderItem = useCallback(({item}: {item: UserProgressEntry}) => {
		return <DrinkEntry item={item} isExpanded={expanded} />
	}, [expanded])
	return (
		<BottomSheet snapPoints={snapPoints} ref={bottomSheetRef} onChange={toggleExpanded} handleIndicatorStyle={{
			backgroundColor: colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black
		}}
		handleStyle={{
			backgroundColor: colorScheme === 'dark' ? COLORS.dark.primary : COLORS.light.white,
			borderTopStartRadius: 12,
			borderTopEndRadius: 12
		}}
		>
		<StyledView className={clsx('w-full bg-white dark:bg-neutral-800 flex-1')}>
			<StyledView className={'flex-row justify-between items-center mr-4'}>
				<StyledText className={'text-2xl font-bold p-3 dark:text-white'}>Spożyte napoje</StyledText>
			</StyledView>
			{isLoading && <ActivityIndicator size={'large'} color={'#000'} />}
			{!isLoading && userProgress!.length === 0 && (
				<StyledView className={'justify-center items-center'}>
					<StyledText className={clsx('font-medium text-xl dark:text-white')}>Nic tu jeszcze nie ma</StyledText>
				</StyledView>
			) }
			{!isLoading && userProgress!.length > 0 && <FlatList data={userProgress} keyExtractor={(item) => String(item.id) } renderItem={renderItem} /> }
		</StyledView>
		</BottomSheet>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red'
	}
})