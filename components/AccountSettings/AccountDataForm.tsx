import {FormProvider, useForm} from "react-hook-form";
import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {FormTextInput} from "@/components/Input/FormTextInput";
import CustomButton from "@/components/UI/CustomButton";
import {Card} from "@/components/UI/Card";
import {
    editUserSchema,
    EditUserSchema,
    editUserSchemaPassword,
    UpdateUserParams,
    useUserEdit
} from "@/queries/user/edit";
import {zodResolver} from "@hookform/resolvers/zod";
import useAuthStore, {UserData} from "@/stores/authStore";
import {Alert, Keyboard, Switch} from "react-native";
import {ErrorBox} from "@/components/Auth/ErrorBox";
import {useState} from "react";
import {PasswdRequirements} from "@/components/Auth/PasswdRequirements";

interface AccountDataFormProps {
    email?: string
}

type FormValues = {
    email: string
}

export function AccountDataForm({email}: AccountDataFormProps) {
    const [updatePasswordActivated, setUpdatePasswordActivated] = useState<boolean>(false)
    const userData: UserData = useAuthStore(state => state.userData)
    const methods = useForm<FormValues>({
        defaultValues: {
            email: email!
        },
        resolver: zodResolver(updatePasswordActivated ? editUserSchemaPassword : editUserSchema)
    })
    const {control, handleSubmit, watch} = methods
    const passwdWatch = watch('password')
    const {mutate, isPending, isError, error} = useUserEdit(() => {
        // TODO: Change this later for toast
        Alert.alert('Dane zaktualizowane', '', [
            {text: 'Zamknij'}
        ])
    })
    const onSubmit = (data: EditUserSchema) => {
        const updateObj: UpdateUserParams = {
            ...data,
            id: userData.id
        }
        mutate(updateObj)
        Keyboard.dismiss()
    }
    const toggleUpdatePassword = () => {
        setUpdatePasswordActivated(prevState => !prevState)
    }
    return (
        <FormProvider {...methods}>
            <Card classNames={'px-1'}>
                {isError && <ErrorBox errorMessage={(error as Error).message}/>}
                <FormTextInput name={'email'} control={control} placeholder={'Adres e-mail'}/>
                <StyledView className={'mx-5 py-2 flex-row justify-between items-center'}>
                    <StyledText className={'font-bold text-base'}>Zaktualizuj również hasło</StyledText>
                    <Switch trackColor={{true: '#49c4e1'}} disabled={isPending} thumbColor={'#fff'}
                            onValueChange={toggleUpdatePassword} value={updatePasswordActivated}/>
                </StyledView>
                {updatePasswordActivated && (
                    <>
                        <FormTextInput name={'password'} control={control} isRequired={updatePasswordActivated} placeholder={'Hasło'} secureTextEntry/>
                        <PasswdRequirements value={passwdWatch}/>
                    </>
                )}
                <CustomButton title={'Zapisz'} onPress={handleSubmit(onSubmit)} isLoading={isPending}/>
            </Card>
        </FormProvider>
    );
}