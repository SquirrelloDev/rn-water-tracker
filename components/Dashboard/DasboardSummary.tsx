import * as Progress from 'react-native-progress'
import {StyledView} from "@/components/StyledComponents/StyledComponents";
interface DasboardSummaryProps {
	percentage: number
}
export function DasboardSummary({percentage}:DasboardSummaryProps) {
	return (
		<StyledView className={'flex-1 justify-center items-center mb-52'}>
			<Progress.Circle size={340} showsText thickness={20} progress={percentage}/>
		</StyledView>
	)
}