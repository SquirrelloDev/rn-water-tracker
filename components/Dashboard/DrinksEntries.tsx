import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {UserProgressEntry} from "@/types/progress";
import {ActivityIndicator, FlatList, Platform, StyleSheet} from "react-native";
import {DrinkEntry} from "@/components/Dashboard/DrinkEntry";
import {useCallback, useMemo, useRef, useState} from "react";
import {IconButton} from "@/components/UI/IconButton";
import clsx from "clsx";
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
interface DrinksEntriesProps {
	isLoading: boolean,
	userProgress: UserProgressEntry[]
}
export function DrinksEntries({isLoading, userProgress}:DrinksEntriesProps) {
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
	const renderItem = useCallback(({item}) => {
		return <DrinkEntry item={item} isExpanded={expanded} />
	}, [expanded])
	return (
		<BottomSheet snapPoints={snapPoints} ref={bottomSheetRef} onChange={toggleExpanded}>
		<StyledView className={clsx('w-full bg-white flex-1')}>
			<StyledView className={'flex-row justify-between items-center mr-4'}>
				<StyledText className={'text-2xl font-bold p-3'}>Spożyte napoje</StyledText>
			</StyledView>
			{isLoading && <ActivityIndicator size={'large'} color={'#000'} />}
			{!isLoading && userProgress!.length === 0 && (
				<StyledView className={'justify-center items-center'}>
					<StyledText className={clsx('font-medium text-xl')}>Nic tu jeszcze nie ma</StyledText>
				</StyledView>
			) }
			{!isLoading && userProgress!.length > 0 && <FlatList data={userProgress} keyExtractor={(item, index) => item.id } renderItem={renderItem} /> }
		</StyledView>
		</BottomSheet>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red'
	}
})