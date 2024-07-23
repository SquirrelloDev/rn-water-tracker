import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import * as Application from 'expo-application'
export function SettingsFooter() {
    return (
        <StyledView className={'mx-4 py-5'}>
            {/*<StyledText className={'text-base text-center'}>Odwiedź nas w mediach społecznościowych</StyledText>*/}
            <StyledText className={'text-base text-center text-slate-500'}>Wersja: {Application.nativeApplicationVersion}</StyledText>
        </StyledView>
    );
}