import {View, Text, StyleSheet} from "react-native";
import PagerView from "react-native-pager-view";

export function IntroCarousel() {
	//TODO: Customize screens
	return (
			<PagerView style={styles.container} initialPage={0} overScrollMode={'never'}>
				<View style={styles.page} key="1">
					<Text>First page</Text>
					<Text>Swipe ➡️</Text>
				</View>
				<View style={styles.page} key="2">
					<Text>Second page</Text>
				</View>
				<View style={styles.page} key="3">
					<Text>Third page</Text>
				</View>
			</PagerView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	page: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});