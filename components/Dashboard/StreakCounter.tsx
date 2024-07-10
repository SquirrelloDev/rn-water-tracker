import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import useStreakListing from "@/queries/streak/listing";
import useAuthStore from "@/stores/authStore";
import {ActivityIndicator} from "react-native";

export function StreakCounter() {
	const userData = useAuthStore(state => state.userData)
	const {data, isError, isLoading} = useStreakListing({userId: userData!.id})
	return (
		<StyledView className='bg-red-500 rounded-full w-10 h-10 justify-center'>
			{isError && <StyledText className='text-center'>😥</StyledText>}
			{isLoading ? <ActivityIndicator /> : <StyledText className='text-center'>{data ? data.count : '?'}</StyledText>}
		</StyledView>
	)
}