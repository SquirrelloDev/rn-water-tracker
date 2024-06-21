import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {CustomTextInput} from "@/components/Input/CustomTextInput";
import {FormProvider, useForm} from "react-hook-form";
import CustomButton from "@/components/UI/CustomButton";
import {KeyboardAvoidingView} from "react-native";

export function SignUpCredentialsForm() {
    const methods = useForm()
    const {control, handleSubmit} = methods
    const createAccount = () => {

    }
    return (
            <StyledView className={'mt-4'}>
                <StyledText className={'text-center text-xl font-bold'}>Podaj swoje dane, którymi będziesz się
                    logować</StyledText>
                <FormProvider {...methods}>
                    <StyledView className={'mt-3'}>
                        <CustomTextInput placeholder={'Adres e-mail'} name={'email'} control={control} isRequired
                                         textContentType={'emailAddress'}/>
                        <CustomTextInput placeholder={'Hasło'} name={'password'} control={control} isRequired
                                         textContentType={'password'} secureTextEntry/>
                        <CustomButton title={'Utwórz konto'} onPress={handleSubmit(createAccount)}/>
                    </StyledView>
                </FormProvider>
            </StyledView>
    )
}