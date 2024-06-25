import {Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {styled} from "nativewind";
interface IconButtonProps {
	icon: keyof typeof Ionicons.glyphMap,
	color: string,
	size: number
	onPress?: () => void
	classNames?: string
}
const StyledPressable = styled(Pressable)
export function IconButton({icon, size, color, onPress, classNames}:IconButtonProps) {
	return (
		<StyledPressable onPress={onPress} className={classNames}>
			<Ionicons name={icon} color={color} size={size}/>
		</StyledPressable>
	)
}