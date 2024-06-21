import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import usePersonalDataStore from "@/stores/personalDataStore";
import {SignUpCredentialsForm} from "@/components/Auth/SignUpCredentialsForm";
import {DemandCard} from "@/components/Auth/DemandCard";
import {Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from "react-native";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";

export function SignupCredentialsScreen() {
    const personalData = usePersonalDataStore(state => state.data)
    const insets = useSafeAreaStyle()
    return (
        <KeyboardAvoidingView behavior={'position'} style={{flex: 1, paddingBottom: Platform.select({ios: 0, android: 0})}} enabled>
			<TouchableWithoutFeedback style={[insets]} onPress={() => Keyboard.dismiss()}>
            <StyledView>
                <DemandCard demand={personalData.weight * 35}/>
                <SignUpCredentialsForm/>
            </StyledView>
			</TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}