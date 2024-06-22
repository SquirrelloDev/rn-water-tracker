import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import usePersonalDataStore from "@/stores/personalDataStore";
import {SignUpCredentialsForm} from "@/components/Auth/SignUpCredentialsForm";
import {DemandCard} from "@/components/Auth/DemandCard";
import {Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback} from "react-native";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";

export function SignupCredentialsScreen() {
    const personalData = usePersonalDataStore(state => state.data)
    const demand = personalData.weight * 35
    const insets = useSafeAreaStyle()
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior={'position'} style={{flex: 1, paddingBottom: Platform.select({ios: 0, android: 10})}} enabled>
                <TouchableWithoutFeedback style={[insets]} onPress={() => Keyboard.dismiss()}>
                    <StyledView>
                        <DemandCard demand={demand}/>
                        <SignUpCredentialsForm demand={demand}/>
                    </StyledView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}