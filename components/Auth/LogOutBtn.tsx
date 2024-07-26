import {StyledPressable, StyledText} from "@/components/StyledComponents/StyledComponents";
import useAuth from "@/hooks/useAuth";
import {Alert} from "react-native";

export function LogOutBtn() {
    const {signOutHandler} = useAuth()
    const handleSignOut = () => {
      Alert.alert('Potwierdź wylogowanie', 'Czy na pewno chcesz się wylogować?', [
          {text: 'Anuluj'},
          {text: 'Wyloguj', isPreferred: true, style: 'destructive', onPress: () => {
              signOutHandler()
              }}
      ])
    }
    return (
        <StyledPressable onPress={handleSignOut} className={'mr-1'}>
            <StyledText className={'text-red-500 text-base font-medium'}>Wyloguj</StyledText>
        </StyledPressable>
    );
}