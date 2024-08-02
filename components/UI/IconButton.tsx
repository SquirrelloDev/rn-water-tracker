import {Ionicons} from "@expo/vector-icons";
import {StyledPressable} from "@/components/StyledComponents/StyledComponents";
import {styled} from "nativewind";
interface IconButtonProps {
	icon: keyof typeof Ionicons.glyphMap,
	color: string,
	size: number
	onPress?: () => void
	wrapperClassName?: string
	iconClassName?: string
}
const StyledIcon = styled(Ionicons)
export function IconButton({icon, size, color, onPress, wrapperClassName, iconClassName}:IconButtonProps) {
	return (
		<StyledPressable onPress={onPress} className={wrapperClassName}>
			<StyledIcon name={icon} color={color} size={size} className={iconClassName}/>
		</StyledPressable>
	)
}