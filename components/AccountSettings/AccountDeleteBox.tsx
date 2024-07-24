import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import CustomButton from "@/components/UI/CustomButton";
import {Card} from "@/components/UI/Card";

export function AccountDeleteBox() {
    return (
        <Card classNames={'mt-4'}>
            <StyledText className={'text-lg font-bold'}>Usuwanie konta</StyledText>
            <StyledText className={'text-base mb-2'}>Twoje konto zostanie usunięte na zawsze. Wszystkie dane zostaną utracone bezpowrotnie</StyledText>
            <CustomButton title={'Usuń konto'} onPress={() => {}} actionColor={'danger'}/>
        </Card>
    );
}