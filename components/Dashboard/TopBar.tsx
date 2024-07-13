import {IconButton} from "@/components/UI/IconButton";
import {StreakCounter} from "@/components/Dashboard/StreakCounter";
import {StyledView} from "@/components/StyledComponents/StyledComponents";
interface TopBarProps {
	toggleInfoModal: () => void
}
export function TopBar({toggleInfoModal}: TopBarProps) {
	return (
		<StyledView className='flex-row justify-between items-center px-3'>
			<IconButton icon='cog' color='black' size={35} />
			<StreakCounter toggleInfoModal={toggleInfoModal} />
		</StyledView>
	)
}