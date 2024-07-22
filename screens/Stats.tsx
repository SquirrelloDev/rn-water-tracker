import {ScrollView} from "react-native";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {GraphSection} from "@/components/Stats/GraphSection/GraphSection";
import {StreakSection} from "@/components/Stats/StreakSection/StreakSection";
import {TipsSection} from "@/components/Stats/TipsSection/TipsSection";

export function Stats() {
	const insetsStyles = useSafeAreaStyle()
	return (
		<ScrollView style={[insetsStyles]}>
			<GraphSection />
			<StreakSection />
			<TipsSection/>
		</ScrollView>
	)
}