import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import React from "react";
import {ThemeSwitcher} from "@/components/PrefsSettings/ThemeSwitcher";

export function PrefsScreen() {
    return (
        <StyledView className={'flex-1 dark:bg-neutral-900'}>
            <StyledText>prefs</StyledText>
            <ThemeSwitcher />
        </StyledView>
    );
}