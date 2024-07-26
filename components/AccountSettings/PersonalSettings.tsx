import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {Card} from "@/components/UI/Card";
import {PersonalDataForm} from "@/components/AccountSettings/PersonalDataForm";
import {Keyboard, TouchableWithoutFeedback} from "react-native";

function PersonalSettings() {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <StyledView className={'flex-1'}>
                <Card classNames={'px-1'}>
                    <PersonalDataForm/>
                </Card>
            </StyledView>
        </TouchableWithoutFeedback>
    );
}

export default PersonalSettings