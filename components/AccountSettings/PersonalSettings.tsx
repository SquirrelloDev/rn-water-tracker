import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {Card} from "@/components/UI/Card";
import {PersonalDataForm} from "@/components/AccountSettings/PersonalDataForm";

function PersonalSettings() {
    return (
        <StyledView className={'flex-1'}>
            <Card classNames={'px-1'}>
                <PersonalDataForm />
            </Card>
        </StyledView>
    );
}
export default PersonalSettings