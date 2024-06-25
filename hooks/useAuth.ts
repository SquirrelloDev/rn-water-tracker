import {AuthParams, SignUpPostData, useLoginAuth, useSignOut, useSignupAuth} from "@/queries/auth/auth";
import useAuthStore from "@/stores/authStore";
import {useNavigation} from "@react-navigation/native";
import appRoutes from "@/utils/routes";
import {Alert} from "react-native";
import {StackNavigation} from "@/types/navigation";

export default function useAuth() {
    const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn)
    const setSession = useAuthStore(state => state.setSession)
    const setUserData = useAuthStore(state => state.setUserData)
    const clearSession = useAuthStore(state => state.clearSession)
    const navigation = useNavigation<StackNavigation>()
    const navigateToDashboard = () => {
        navigation.navigate(appRoutes.index)
    }
    const {mutate: signUp, isPending: isSignupPending, isError: isSignupError, error: signUpError} = useSignupAuth((data, variables) => {
        if(!data.session){
            Alert.alert('Konto utworzone!','Na skrzynkę przyszedł mail aktywujący konto', [
                {text: 'OK', isPreferred: true, onPress: () =>  navigation.reset({index: 1, routes: [{name: appRoutes.intro}, {name: appRoutes.login}]})}
            ])
        }
        else{
            navigation.reset({index: 1, routes: [{name: appRoutes.intro}, {name: appRoutes.login}]})
        }
    })
    const {mutate: logIn, isPending: isLoginPending, isError: isLoginError, error: loginError} = useLoginAuth((data, variables) => {
        setSession(data.session)
        setUserData({
            id: data.userData[0].id,
            dailyFluidIntake: data.userData[0].daily_fluid_intake
        })
        setIsLoggedIn(true)
        navigateToDashboard()
    })
    const {mutate: signOut, isPending: isSingOutPending, isError: isSignOutError, error: signOutError} = useSignOut((data) => {
        clearSession()
        setIsLoggedIn(false)
    })

    const authStatus = {
        signUpStatus: {
            isSignupPending, isSignupError, signUpError
        },
        loginStatus: {
            isLoginPending, isLoginError, loginError
        },
        signOutStatus: {
            isSingOutPending, isSignOutError, signOutError
        }
    }
    const signupHandler = ({email, password, dailyFluidIntake}: SignUpPostData) => {
        signUp({email, password, dailyFluidIntake})
    }
    const loginHandler = ({email, password}: AuthParams) => {
      logIn({email, password})
    }
    const signOutHandler = () => {
      signOut()
    }
    return {authStatus, signupHandler, loginHandler, signOutHandler}
}