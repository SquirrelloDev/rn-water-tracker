import {FormProvider, useForm} from "react-hook-form";
import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {FormTextInput} from "@/components/Input/FormTextInput";
import CustomButton from "@/components/UI/CustomButton";
import {supabase} from "@/lib/supabase";
import {Card} from "@/components/UI/Card";

export function AccountDataForm() {
    const methods = useForm()
    const {control, handleSubmit} = methods
    supabase.auth.getUser().then(user => console.log(user))
    const onSubmit = () => {

    }
    return (
        <FormProvider {...methods}>
            <Card classNames={'px-1'}>
                <FormTextInput name={'email'} control={control} placeholder={'Adres e-mail'}/>
                <FormTextInput name={'password'} control={control} placeholder={'Hasło'} secureTextEntry/>
                <CustomButton title={'Zapisz'} onPress={handleSubmit(onSubmit)} />
            </Card>
        </FormProvider>
    );
}