import {Control, FieldValues, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormTextInput} from "@/components/Input/FormTextInput";
import CustomButton from "@/components/UI/CustomButton";
import {useNavigation} from "@react-navigation/native";
import {z} from "zod";
import usePersonalDataStore from "@/stores/personalDataStore";
import {formErrorMessages} from "@/utils/errors";
import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {StackNavigation} from "@/types/navigation";
import appRoutes from "@/utils/routes";
import {PersonalData, personalSchema} from "@/queries/user/edit";

export function SignUpPersonalForm() {
	const navigation = useNavigation<StackNavigation>()
	const setPersonalData = usePersonalDataStore(state => state.setPersonalData)
	const methods = useForm<PersonalData>({
		defaultValues: {
			weight: 0
		},
		resolver: zodResolver(personalSchema)
	})
	const {control, handleSubmit} = methods
	const submitValues = (data: PersonalData) =>{
		setPersonalData(data)
		navigation.navigate(appRoutes.signupCredentials)
	}
	return (
		<FormProvider {...methods}>
		<StyledView>
			<FormTextInput name={'weight'} control={control} placeholder={'Waga (w kg)'} isRequired keyboardType={"number-pad"}/>
			<CustomButton title={'Dalej'} onPress={handleSubmit(submitValues)} />
		</StyledView>
		</FormProvider>
	)
}