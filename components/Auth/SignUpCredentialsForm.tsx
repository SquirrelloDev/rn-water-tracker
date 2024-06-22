import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {FormTextInput} from "@/components/Input/FormTextInput";
import {FormProvider, useForm} from "react-hook-form";
import CustomButton from "@/components/UI/CustomButton";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignUpFormType, SignUpPostData, signUpSchema} from "@/queries/auth/auth";
import {PasswdRequirements} from "@/components/Auth/PasswdRequirements";
import useAuth from "@/hooks/useAuth";
import {ErrorBox} from "@/components/Auth/ErrorBox";
interface SignUpCredentialsFormProps {
    demand: number
}

export function SignUpCredentialsForm({demand}: SignUpCredentialsFormProps) {
    const {authStatus: {signUpStatus}, signupHandler} = useAuth()
    const methods = useForm<SignUpFormType>({
        resolver: zodResolver(signUpSchema),
        mode: 'onTouched'
    })
    const {control, handleSubmit, watch} = methods
    const passwdWatch = watch('password')
    const createAccount = (data: SignUpFormType) => {
        const newUser: SignUpPostData = {
            ...data,
            dailyFluidIntake: demand
        }
        signupHandler(newUser)
    }
    return (
            <StyledView className={'mt-4'}>
                <StyledText className={'text-center text-xl font-bold'}>Podaj swoje dane, którymi będziesz się
                    logować</StyledText>
                {signUpStatus.isSignupError && <ErrorBox errorMessage={signUpStatus.signUpError!.message} />}
                <FormProvider {...methods}>
                    <StyledView className={'mt-3'}>
                        <FormTextInput placeholder={'Adres e-mail'} name={'email'} control={control} isRequired
                                         textContentType={'emailAddress'} autoCapitalize={'none'}/>
                        <FormTextInput placeholder={'Hasło'} name={'password'} control={control} isRequired
                                         textContentType={'password'} secureTextEntry/>
                        <PasswdRequirements value={passwdWatch} />
                        <CustomButton title={'Utwórz konto'} isLoading={signUpStatus.isSignupPending} onPress={handleSubmit(createAccount)} />
                    </StyledView>
                </FormProvider>
            </StyledView>
    )
}