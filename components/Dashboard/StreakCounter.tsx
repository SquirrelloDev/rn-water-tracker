import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";

export function StreakCounter() {
	return (
		<StyledView className='bg-red-500 rounded-full w-10 h-10 justify-center'>
			<StyledText className='text-center'>3</StyledText>
		</StyledView>
	)
}