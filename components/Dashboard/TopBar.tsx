import {Text, View} from "react-native";
import {IconButton} from "@/components/UI/IconButton";
import {StreakCounter} from "@/components/Dashboard/StreakCounter";

export function TopBar() {
	return (
		<View className='flex-row justify-between items-center px-3'>
			<IconButton icon='cog' color='black' size={35} />
			<StreakCounter />
		</View>
	)
}