import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {nativeApplicationVersion} from 'expo-application'
import {SocialMediaBtn} from "@/components/SocialMediaBtn";
export function SettingsFooter() {
    return (
        <StyledView className={'mx-4 py-5'}>
            <StyledText className={'text-base text-center dark:text-white'}>Odwiedź nas w mediach społecznościowych</StyledText>
            <StyledView className={'flex-row justify-around my-3'}>
                <SocialMediaBtn smName={'instagram'} />
                <SocialMediaBtn smName={'facebook'} />
                <SocialMediaBtn smName={'twitter'} />
                <SocialMediaBtn smName={'youtube'} />
            </StyledView>
            <StyledText className={'text-base text-center text-slate-500'}>Wersja: {nativeApplicationVersion}</StyledText>
        </StyledView>
    );
}