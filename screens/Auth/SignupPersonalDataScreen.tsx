import {SignupHeader} from "@/components/Auth/SignupHeader";
import {SignUpPersonalForm} from "@/components/Auth/SignUpPersonalForm";
import {StyledView} from "@/components/StyledComponents/StyledComponents";

export function SignupPersonalDataScreen() {
    return (
        <StyledView className='flex-1 dark:bg-neutral-900'>
            <SignupHeader/>
            <SignUpPersonalForm />
        </StyledView>
    )
}