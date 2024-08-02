import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {AccountDataForm} from "@/components/AccountSettings/AccountDataForm";
import {AccountDeleteBox} from "@/components/AccountSettings/AccountDeleteBox";
import {useState} from "react";
import {AccountDataCard} from "@/components/AccountSettings/AccountDataCard";
import useAuthStore from "@/stores/authStore";
import {Keyboard, ScrollView, TouchableWithoutFeedback} from "react-native";
import {styled} from "nativewind";
const StyledScrollView = styled(ScrollView)
function AccountSettings() {
    const session = useAuthStore(state => state.session)
    const userEmail = session && session.user.email
    const [accountDataProccessActive, setAccountDataProccessActive] = useState<boolean>(false)
    const activeEditHandler = () => {
        setAccountDataProccessActive(true)
    }
    return (
        <StyledScrollView className={'dark:bg-neutral-900'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <StyledView className={'flex-1 mt-5'}>
                {!accountDataProccessActive ?
                    <AccountDataCard activateEdit={activeEditHandler} displayEmail={userEmail}/> :
                    <AccountDataForm email={userEmail}/>}
                <AccountDeleteBox />
            </StyledView>
            </TouchableWithoutFeedback>
        </StyledScrollView>
    );
}

export default AccountSettings