import {FormProvider, useForm} from "react-hook-form";
import {FormTextInput} from "@/components/Input/FormTextInput";
import {StyledText} from "@/components/StyledComponents/StyledComponents";
import CustomButton from "@/components/UI/CustomButton";
import {DemandCard} from "@/components/Auth/DemandCard";
import {zodResolver} from "@hookform/resolvers/zod";
import {personalSchema, useUserDemandEdit} from "@/queries/user/edit";
import useAuthStore, {UserData} from "@/stores/authStore";
import {ErrorBox} from "@/components/Auth/ErrorBox";
import {Keyboard} from "react-native";
import useAccountSettingsStore from "@/stores/accountSettingsStore";
import Toast from "react-native-toast-message";

type FormValues = {
    weight: number
}

export function PersonalDataForm() {
    const userData: UserData = useAuthStore(state => state.userData)!
    const setUserData = useAuthStore(state => state.setUserData)
    const setIsRequestPerformed = useAccountSettingsStore(state => state.setIsRequestPerformed)
    const isRequestPerformed = useAccountSettingsStore(state => state.isRequestPerformed)
    const {mutate, isPending, isError, error} = useUserDemandEdit((data, variables) => {
        setUserData({
            ...userData,
            dailyFluidIntake: variables.demand
        })
        Toast.show({type: 'success', text1: 'Dane zostały zaktualizowane', position: 'bottom'})
        setIsRequestPerformed(false)
    }, () => setIsRequestPerformed(false))
    const methods = useForm<FormValues>({
        defaultValues: {
            weight: 0
        },
        resolver: zodResolver(personalSchema)
    })
    const {control, handleSubmit, watch} = methods
    const weightValue = watch('weight')
    const demand = weightValue * 35
    const onSubmit = () => {
        mutate({demand, id: userData.id})
        setIsRequestPerformed(true)
        Keyboard.dismiss()
    }
    return (
        <FormProvider {...methods}>
            {isError && <ErrorBox errorMessage={(error as Error).message} />}
            <StyledText className={'font-bold text-lg ml-6'}>Aktualizacja zapotrzebowania</StyledText>
            <FormTextInput name={'weight'} control={control} placeholder={'Waga w kg'} isRequired keyboardType={'numeric'}/>
            <DemandCard demand={demand === 0 ? userData.dailyFluidIntake : demand}/>
            <CustomButton title={'Zapisz'} onPress={handleSubmit(onSubmit)} isLoading={(isRequestPerformed || isPending)}/>
        </FormProvider>
    );
}