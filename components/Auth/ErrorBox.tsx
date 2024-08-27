import {StyledIcon, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
interface ErrorBoxProps {
	errorMessage: string
}
export function ErrorBox({errorMessage}:ErrorBoxProps) {
	return (
		<StyledView className={'m-3 p-3 bg-red-500 rounded-xl relative z-0 overflow-hidden'}>
			<StyledText className={'text-xl text-white font-bold'}>Wystąpił błąd!</StyledText>
			<StyledText className={'text-base text-white'}>{errorMessage}</StyledText>
			<StyledIcon name={'close-circle'} size={158} className={'absolute -left-10 -top-10 -z-10 text-red-300/30'}/>
		</StyledView>
	)
}