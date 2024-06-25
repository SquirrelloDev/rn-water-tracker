import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {UserProgressEntry} from "@/types/progress";
import {ActivityIndicator, FlatList} from "react-native";
import {DrinkEntry} from "@/components/Dashboard/DrinkEntry";
import {useState} from "react";
import {IconButton} from "@/components/UI/IconButton";
import clsx from "clsx";
interface DrinksEntriesProps {
	isLoading: boolean,
	userProgress: UserProgressEntry[] | undefined
}
export function DrinksEntries({isLoading, userProgress}:DrinksEntriesProps) {
	const [expanded, setExpanded] = useState<boolean>(false)
	const toggleExpanded = () => {
	  setExpanded(prevState => !prevState)
	}
	return (
		<StyledView className={clsx('w-full bg-white border border-slate-200 rounded-t-3xl', expanded ? 'h-screen' : 'h-48')}>
			<StyledView className={'flex-row justify-between items-center mr-4'}>
				<StyledText className={'text-2xl font-bold p-3'}>Spożyte napoje</StyledText>
				<IconButton icon={expanded ? 'chevron-down' : 'chevron-up'} color={'#000'} size={24} onPress={toggleExpanded} />
			</StyledView>
			{isLoading && <ActivityIndicator size={'large'} color={'#000'} />}
			{!isLoading && userProgress!.length === 0 && (
				<StyledView className={'flex-1 items-center justify-center'}>
					<StyledText className={clsx('font-medium text-xl', expanded && 'mb-52')}>Nic tu jeszcze nie ma</StyledText>
				</StyledView>
			) }
			{!isLoading && userProgress!.length > 0 && <FlatList data={userProgress} renderItem={({item}) => <DrinkEntry item={item} isExpanded={expanded} />} />}
		</StyledView>
	)
}