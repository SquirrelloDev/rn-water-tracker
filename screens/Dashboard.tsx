import {ActivityIndicator, Text, View} from "react-native";
import useDrinkListing from "../queries/drink_types/listing";

export default function Dashboard (){
	const {data, isLoading} = useDrinkListing()
	return (
		<View>
			{!isLoading ? <Text>{data![0].name}</Text> : <ActivityIndicator size={'large'}/> }
		</View>
	)
}