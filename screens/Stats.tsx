import {Text, View} from "react-native";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";

export function Stats() {
	const insetsStyles = useSafeAreaStyle()
	return (
		<View style={[insetsStyles]}>
			<Text>Stats component</Text>
		</View>
	)
}