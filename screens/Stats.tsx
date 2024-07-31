import {ScrollView} from "react-native";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {GraphSection} from "@/components/Stats/GraphSection/GraphSection";
import {StreakSection} from "@/components/Stats/StreakSection/StreakSection";
import {TipsSection} from "@/components/Stats/TipsSection/TipsSection";
import {useColorScheme} from "nativewind";
import COLORS from "@/constants/theme/colors";

export function Stats() {
	const insetsStyles = useSafeAreaStyle()
	const {colorScheme} = useColorScheme()
	return (
		<ScrollView style={[insetsStyles, {backgroundColor: colorScheme === 'dark' ? COLORS.dark['primary-dark'] : COLORS.light.primary}]}>
			<GraphSection />
			<StreakSection />
			<TipsSection/>
		</ScrollView>
	)
}