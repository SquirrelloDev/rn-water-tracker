import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import WebView from "react-native-webview";
import {useNetInfoInstance} from "@react-native-community/netinfo";

export function UpdatesScreen() {
    const {netInfo} = useNetInfoInstance()
    return (
        <StyledView className={'flex-1 dark:bg-neutral-900'}>
            {netInfo.isConnected ? <WebView source={{uri: 'https://github.com/SquirrelloDev/rn-water-tracker/releases'}}/> : (
                <StyledView className={'flex-1 justify-center'}>
                    <StyledText className={'font-bold text-center text-4xl dark:text-white'}>Brak połączenia 😥</StyledText>
                    <StyledText className={'font-medium text-lg text-center mt-5 dark:text-white'}>Informacje dostępne tylko przy połączeniu z siecią</StyledText>
                </StyledView>
            )}
        </StyledView>
    );
}