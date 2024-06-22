import {Button} from "react-native";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {TopBar} from "@/components/Dashboard/TopBar";
import {RowCalendar} from "@/components/Dashboard/RowCalendar";
import {useLoginAuth, useSignAnon, useSignOut, useSignupAuth} from "@/queries/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {supabase} from "@/lib/supabase";
import {StyledView} from "@/components/StyledComponents/StyledComponents";
export default function Dashboard(){
	const insetsStyles = useSafeAreaStyle()
	const {mutate} = useLoginAuth()
	const {mutate: signUp} = useSignupAuth()
	const {mutate: signOut} = useSignOut()
	const {mutate: signAnon} = useSignAnon()
	const getKeyAsync = async () => {
		const user = supabase.auth.getUser()
		const storeValue = await AsyncStorage.getItem('auth')
		console.log(JSON.parse(storeValue!))
		console.log(user)
	}
	return (
		<StyledView style={[insetsStyles]} className="flex-1">
			<TopBar />
			<RowCalendar />
		</StyledView>
	)
}