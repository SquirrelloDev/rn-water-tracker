import {View, Text, StyleSheet, Image} from "react-native";
import PagerView from "react-native-pager-view";
import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {SvgXml} from "react-native-svg";
import {dataSvgXml, notificationSvgXml, progressSvgXml} from "@/utils/svgxml";

export function IntroCarousel() {
	//TODO: Customize screens
	return (
			<PagerView style={styles.container} initialPage={0} overScrollMode={'never'}>
				<StyledView className={'p-2'} style={styles.page} key="1">
					<SvgXml xml={progressSvgXml} height='50%' width='80%'/>
					<StyledText className={'font-bold text-center text-3xl my-2 dark:text-white'}>Śledź swoje postępy</StyledText>
					<StyledText className={'text-base text-center dark:text-white'}>Drink guard śledzi twoje postępy w spożyciu płynów</StyledText>
				</StyledView>
				<StyledView className={'p-2'} style={styles.page} key="2">
					<SvgXml xml={dataSvgXml} height='50%' width='80%'/>
					<StyledText className={'font-bold text-center text-3xl my-2 dark:text-white'}>Analizuj swoje nawyki</StyledText>
					<StyledText className={'text-base text-center dark:text-white'}>Sprawdź, ile płynów udało ci się wypić w różnych okresach czasu</StyledText>
				</StyledView>
				<StyledView className={'p-2'} style={styles.page} key="3">
					<SvgXml xml={notificationSvgXml} height='50%' width='80%'/>
					<StyledText className={'font-bold text-center text-3xl my-2 dark:text-white'}>Wykorzystaj moc powiadomień</StyledText>
					<StyledText className={'text-base text-center dark:text-white'}>Zezwól na powiadomienia, by nie zapomnieć o napiciu się, oraz dostosuj je do własnych potrzeb</StyledText>
				</StyledView>
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