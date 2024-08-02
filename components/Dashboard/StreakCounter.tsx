import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import useStreakListing from "@/queries/streak/listing";
import useAuthStore from "@/stores/authStore";
import clsx from "clsx";
import {ActivityIndicator} from "react-native";
import {useColorScheme} from "nativewind";
import COLORS from "@/constants/theme/colors";
interface StreakCounterProps {
	toggleInfoModal: () => void
}
export function StreakCounter({toggleInfoModal}: StreakCounterProps) {
	const {colorScheme} = useColorScheme()
	const userData = useAuthStore(state => state.userData)
	const {data, isError, isLoading} = useStreakListing({userId: userData!.id})
	return (
		<StyledPressable className={clsx('rounded-full w-10 h-10 justify-center', data && data.count! > 0 ? 'bg-orange-400' : 'bg-slate-400')} onPress={toggleInfoModal}>
			{isError && <StyledText className='text-center'>😥</StyledText>}
			{isLoading ? <ActivityIndicator color={colorScheme === 'dark' ? COLORS[colorScheme].white: COLORS[colorScheme].black}/> : <StyledText className='text-center'>{data ? data.count! >= 1000 ? '999+' : data.count! : '?'}</StyledText>}
		</StyledPressable>
	)
}