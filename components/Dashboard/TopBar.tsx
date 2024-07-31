import {IconButton} from "@/components/UI/IconButton";
import {StreakCounter} from "@/components/Dashboard/StreakCounter";
import {StyledPressable, StyledView} from "@/components/StyledComponents/StyledComponents";
import {useNavigation} from "@react-navigation/native";
import appRoutes from "@/utils/routes";
import {StackNavigation} from "@/types/navigation";
interface TopBarProps {
	toggleInfoModal: () => void
}
export function TopBar({toggleInfoModal}: TopBarProps) {
	const navigation = useNavigation<StackNavigation>()
	return (
		<StyledView className='flex-row justify-between items-center px-3'>
				<IconButton icon='settings' color='black' iconClassName={'text-black dark:text-white'} size={35} onPress={() => {
					navigation.navigate(appRoutes.settings)
				}} />
			<StreakCounter toggleInfoModal={toggleInfoModal} />
		</StyledView>
	)
}