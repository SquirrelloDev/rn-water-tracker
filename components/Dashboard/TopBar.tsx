import {IconButton} from "@/components/UI/IconButton";
import {StreakCounter} from "@/components/Dashboard/StreakCounter";
import {StyledPressable, StyledView} from "@/components/StyledComponents/StyledComponents";
import {useNavigation} from "@react-navigation/native";
interface TopBarProps {
	toggleInfoModal: () => void
}
export function TopBar({toggleInfoModal}: TopBarProps) {
	const navigation = useNavigation()
	return (
		<StyledView className='flex-row justify-between items-center px-3'>
				<IconButton icon='cog' color='black' size={35} onPress={() => {
					navigation.navigate('Settings')
				}} />
			<StreakCounter toggleInfoModal={toggleInfoModal} />
		</StyledView>
	)
}