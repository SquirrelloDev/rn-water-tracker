import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {Button} from "react-native";
import React from "react";
import {useColorScheme} from "nativewind";

export function PrefsScreen() {
    const {colorScheme, toggleColorScheme} = useColorScheme()
    return (
        <StyledView>
            <StyledText>prefs</StyledText>
            <Button title={'toggle theme'} onPress={() => toggleColorScheme()}/>
        </StyledView>
    );
}