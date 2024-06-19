import {View} from "react-native";
import CustomButton from "@/components/UI/CustomButton";
import {IntroCarousel} from "@/components/Auth/IntroCarousel";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {styled} from "nativewind";
const StyledView = styled(View)
export function IntroScreen({navigation}) {
	const insets = useSafeAreaStyle()
	return (
		<StyledView style={[insets]} className='flex-1'>
			<IntroCarousel />
			<CustomButton title="Zarejestruj się" onPress={() => navigation.navigate('SignUpPersonalData')} />
			<CustomButton title="Zaloguj się" onPress={() => navigation.navigate('Login')} variant={'outline'}/>
		</StyledView>
	)
}