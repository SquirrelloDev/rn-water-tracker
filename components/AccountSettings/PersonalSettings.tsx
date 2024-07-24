import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {memo} from "react";
import useAuthStore from "@/stores/authStore";

function PersonalSettings() {
    const userData = useAuthStore(state => state.userData)
    return (
        <StyledView className={'flex-1'}>

        </StyledView>
    );
}
export default PersonalSettings