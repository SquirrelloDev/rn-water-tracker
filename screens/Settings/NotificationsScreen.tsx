import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {Switch} from "react-native";
import {NotificationSettings} from "@/components/NotificationSettings/NotificationSettings";
import useNotification from "@/hooks/useNotification";

export function NotificationsScreen() {
    const {toggleNotificationsHandler, notificationsAllowed} = useNotification()
    return (
        <StyledView>
            <StyledView className={'flex-row items-center justify-between'}>
                <StyledText>Powiadomienia</StyledText>
                <Switch value={notificationsAllowed} onValueChange={toggleNotificationsHandler}/>
            </StyledView>
            {notificationsAllowed && <NotificationSettings/>}
        </StyledView>
    );
}