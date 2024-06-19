import {View} from "react-native";
import CustomButton from "@/components/UI/CustomButton";

export function IntroScreen({navigation}) {
	return (
		<View className='flex-1'>
			<CustomButton title="Zarejestruj się" onPress={() => navigation.navigate('SignUpPersonalData')} />
			<CustomButton title="Zaloguj się" onPress={() => navigation.navigate('Login')} variant={'outline'}/>
		</View>
	)
}