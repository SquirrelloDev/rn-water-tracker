import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {TopBar} from "@/components/Dashboard/TopBar";
import {RowCalendar} from "@/components/Dashboard/RowCalendar";
import {StyledView} from "@/components/StyledComponents/StyledComponents";
export default function Dashboard(){
	const insetsStyles = useSafeAreaStyle()
	return (
		<StyledView style={[insetsStyles]} className="flex-1">
			<TopBar />
			<RowCalendar />
		</StyledView>
	)
}