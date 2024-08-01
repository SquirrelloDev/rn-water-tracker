import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
export function SignupHeader() {
	return (
		<StyledView className={'p-3'}>
			<StyledText className={'text-3xl text-center font-bold mb-3 dark:text-white'}>Zanim zaczniemy</StyledText>
			<StyledText className={'text-center text-base dark:text-white'}>Potrzebujemy informacji o Twojej wadze, by wyliczyć zapotrzebowanie</StyledText>
		</StyledView>
	)
}