import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {FormProvider, useForm} from "react-hook-form";
import {FormTextInput} from "@/components/Input/FormTextInput";
import CustomButton from "@/components/UI/CustomButton";
import useAuth from "@/hooks/useAuth";
import {loginSchema, LoginSchema} from "@/queries/auth/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {Alert} from "react-native";
import {ErrorBox} from "@/components/Auth/ErrorBox";

export function LoginForm() {
	const methods = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	})
	const {authStatus: {loginStatus}, loginHandler} = useAuth()
	const {control, handleSubmit} = methods
	const logIn = (data: LoginSchema) => {
	  loginHandler(data)
	}
	return (
		<>
			<StyledText className={'text-3xl text-center font-bold dark:text-white'}>Zaloguj się</StyledText>
			{loginStatus.isLoginError && <ErrorBox errorMessage={loginStatus.loginError!.message} />}
			<FormProvider {...methods}>
			<StyledView className={'pt-4'}>
				<FormTextInput name={'email'} control={control} placeholder={'Adres e-mail'} isRequired autoCapitalize={'none'} textContentType={'emailAddress'}/>
				<FormTextInput name={'password'} control={control} placeholder={'Hasło'} secureTextEntry isRequired textContentType={'password'}/>
				<CustomButton title={'Zaloguj się'} isLoading={loginStatus.isLoginPending} onPress={handleSubmit(logIn)} />
			</StyledView>
			</FormProvider>
		</>
	)
}