import {IconButton} from "@/components/UI/IconButton";
import {StreakCounter} from "@/components/Dashboard/StreakCounter";
import {StyledView} from "@/components/StyledComponents/StyledComponents";

export function TopBar() {
	return (
		<StyledView className='flex-row justify-between items-center px-3'>
			<IconButton icon='cog' color='black' size={35} />
			<StreakCounter />
		</StyledView>
	)
}