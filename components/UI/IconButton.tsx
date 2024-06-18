import {Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";
interface IconButtonProps {
	icon: string,
	color: string,
	size: number
	onPress?: () => void
}
export function IconButton({icon, size, color, onPress}:IconButtonProps) {
	return (
		<Pressable onPress={onPress}>
			<Ionicons name={icon} color={color} size={size}/>
		</Pressable>
	)
}