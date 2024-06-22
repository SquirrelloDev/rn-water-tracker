import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {LoginForm} from "@/components/Auth/LoginForm";
import {Keyboard, TouchableWithoutFeedback} from "react-native";

export function LoginScreen() {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <StyledView className={'flex-1 py-3'}>
                <LoginForm/>
            </StyledView>
        </TouchableWithoutFeedback>
    )
}