import {ActivityIndicator, Text, View} from "react-native";
import useDrinkListing from "../queries/drink_types/listing";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {TopBar} from "@/components/Dashboard/TopBar";
import {RowCalendar} from "@/components/Dashboard/RowCalendar";
export default function Dashboard (){
	const insetsStyles = useSafeAreaStyle()
	return (
		<View style={[insetsStyles]} className="flex-1">
			<TopBar />
			<RowCalendar />
		</View>
	)
}