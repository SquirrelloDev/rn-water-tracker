import {Card} from "@/components/UI/Card";
import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import CustomButton from "@/components/UI/CustomButton";
import {Ionicons} from "@expo/vector-icons";
import {styled} from "nativewind";

const StyledIcon = styled(Ionicons)
interface AccountDataCardProps {
    activateEdit: () => void
    displayEmail?: string
}
export function AccountDataCard({activateEdit, displayEmail}: AccountDataCardProps) {
    return (
        <Card classNames={'flex-row items-center'}>
            <StyledView className={'flex-row items-center w-3/5'}>
                <StyledView className={'bg-sky-200 w-10 h-10 justify-center items-center rounded-full'}>
                    <StyledIcon className={'text-blue-500'} name={'water'} size={24}/>
                </StyledView>
                <StyledView className={'ml-3'}>
                    <StyledText className={'text-slate-500 font-medium w-36'} numberOfLines={1}>{displayEmail ? displayEmail : '🤨'}</StyledText>
                </StyledView>
            </StyledView>
            <StyledView className={'w-2/5'}>
                <CustomButton title={'Edycja'} onPress={activateEdit} size={'small'}/>
            </StyledView>
        </Card>
    );
}