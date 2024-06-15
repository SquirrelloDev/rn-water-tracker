import {ActivityIndicator, Text, View} from "react-native";
import useDrinkListing from "../queries/drink_types/listing";
export default function Dashboard (){
	const {data, isLoading} = useDrinkListing()
	return (
		<View className="items-center bg-red-500">
			{!isLoading ? <Text className="text-xl">{data!.drinks[0].name}</Text> : <ActivityIndicator size={'large'}/> }
		</View>
	)
}