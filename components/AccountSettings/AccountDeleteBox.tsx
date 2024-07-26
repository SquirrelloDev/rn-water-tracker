import {StyledText} from "@/components/StyledComponents/StyledComponents";
import CustomButton from "@/components/UI/CustomButton";
import {Card} from "@/components/UI/Card";
import useUserDelete from "@/queries/user/delete";
import {Alert} from "react-native";
import useAuthStore, {UserData} from "@/stores/authStore";
import {ErrorBox} from "@/components/Auth/ErrorBox";
import useAuth from "@/hooks/useAuth";

interface AccountDeleteBoxProps {
    isLoadingState: boolean
}

export function AccountDeleteBox({isLoadingState}: AccountDeleteBoxProps) {
    const {signOutHandler} = useAuth()
    const {mutate, isError, isPending, error} = useUserDelete(() => {
        signOutHandler()
    })
    const userData: UserData = useAuthStore(state => state.userData)
    const deleteAlert = () => {
        Alert.alert('Ostatnia szansa!', 'To twoja ostatnia szansa na przemyślenie tej decyzji. Po kliknięciu przycisku "Usuń" danych nie będzie dało się odzyskać!', [
            {text: 'Anuluj', isPreferred: true},
            {
                text: 'Usuń', style: 'destructive', onPress: () => {
                    mutate({userId: userData.id})
                }
            }
        ])
    }
    return (
        <Card classNames={'mt-4'}>
            {isError && <ErrorBox errorMessage={(error as Error).message} />}
            <StyledText className={'text-lg font-bold'}>Usuwanie konta</StyledText>
            <StyledText className={'text-base mb-2'}>Twoje konto zostanie usunięte na zawsze. Wszystkie dane zostaną
                utracone bezpowrotnie</StyledText>
            <CustomButton title={'Usuń konto'} onPress={() => {
                deleteAlert()
            }} actionColor={'danger'} isLoading={(isLoadingState || isPending)}/>
        </Card>
    );
}