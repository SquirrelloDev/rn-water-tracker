import {StyledView} from "@/components/StyledComponents/StyledComponents";
import WebView from "react-native-webview";

export function BugReportScreen() {
    return (
        <StyledView className={'flex-1 dark:bg-neutral-900'}>
            <WebView source={{uri: 'https://github.com/SquirrelloDev/rn-water-tracker/issues'}}/>
        </StyledView>
    );
}