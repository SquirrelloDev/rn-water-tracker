import {StyledScrollView, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {SettingsList} from "@/components/Settings/SettingsList";
import {SettingsFooter} from "@/components/Settings/SettingsFooter";
import {useColorScheme} from "nativewind";

export function SettingsScreen() {
    return (
        <StyledScrollView className={'flex-1 dark:bg-neutral-900'}>
            <SettingsList/>
            <SettingsFooter />
        </StyledScrollView>
    );
}