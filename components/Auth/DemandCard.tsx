import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
interface DemandCardProps {
	demand: number
}
export function DemandCard({demand}: DemandCardProps) {
	return (
		<StyledView className={'p-4 m-3 bg-blue-400 rounded-2xl shadow'}>
			<StyledText className={'text-center text-white text-lg font-medium'}>Twoje zapotrzebowanie:</StyledText>
			<StyledText className={'mt-2 text-center text-white text-3xl font-bold'}>{demand} ml</StyledText>
		</StyledView>
	)
}