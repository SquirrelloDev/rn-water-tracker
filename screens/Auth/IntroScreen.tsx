import CustomButton from "@/components/UI/CustomButton";
import {IntroCarousel} from "@/components/Auth/IntroCarousel";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/types/navigation";

export function IntroScreen({navigation}: NativeStackScreenProps<RootStackParamList, 'Intro'>) {
	const insets = useSafeAreaStyle()
	return (
		<StyledView style={[insets]} className='flex-1'>
			<IntroCarousel />
			<CustomButton title="Zarejestruj się" onPress={() => navigation.navigate('SignUpPersonalData')} />
			<CustomButton title="Zaloguj się" onPress={() => navigation.navigate('Login')} variant={'outline'}/>
		</StyledView>
	)
}