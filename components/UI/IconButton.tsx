import {Ionicons} from "@expo/vector-icons";
import {StyledPressable} from "@/components/StyledComponents/StyledComponents";
interface IconButtonProps {
	icon: keyof typeof Ionicons.glyphMap,
	color: string,
	size: number
	onPress?: () => void
	classNames?: string
}
export function IconButton({icon, size, color, onPress, classNames}:IconButtonProps) {
	return (
		<StyledPressable onPress={onPress} className={classNames}>
			<Ionicons name={icon} color={color} size={size}/>
		</StyledPressable>
	)
}