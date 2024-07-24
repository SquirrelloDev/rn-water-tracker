import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {AccountDataForm} from "@/components/AccountSettings/AccountDataForm";
import {AccountDeleteBox} from "@/components/AccountSettings/AccountDeleteBox";
import {memo, useState} from "react";
import {AccountDataCard} from "@/components/AccountSettings/AccountDataCard";
import {Session} from "@supabase/supabase-js";
import useAuthStore from "@/stores/authStore";

function AccountSettings() {
    const session: Session = useAuthStore(state => state.session)
    const userEmail = session.user.email
    const [accountDataProccessActive, setAccountDataProccessActive] = useState<boolean>(false)
    const activeEditHandler = () => {
      setAccountDataProccessActive(true)
    }
    return (
        <StyledView className={'flex-1 mt-5'}>
            {!accountDataProccessActive ? <AccountDataCard activateEdit={activeEditHandler} displayEmail={userEmail} /> : <AccountDataForm />}
            <AccountDeleteBox />
        </StyledView>
    );
}
export default AccountSettings