import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {SettingsList} from "@/components/Settings/SettingsList";
import {SettingsFooter} from "@/components/Settings/SettingsFooter";

export function SettingsScreen() {
    return (
        <StyledView>
            <SettingsList/>
            <SettingsFooter />
        </StyledView>
    );
}