import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {Switch} from "react-native";
import {NotificationSettings} from "@/components/NotificationSettings/NotificationSettings";
import useNotification from "@/hooks/useNotification";

export function NotificationsScreen() {
    const {toggleNotificationsHandler, notificationsAllowed} = useNotification()
    return (
        <StyledView className={'bg-white flex-1'}>
            <StyledView className={'flex-row items-center justify-between p-3'}>
                <StyledText className={'text-base font-bold'}>Powiadomienia</StyledText>
                <Switch value={notificationsAllowed} onValueChange={toggleNotificationsHandler} trackColor={{true: '#49c4e1'}}/>
            </StyledView>
            {notificationsAllowed && <NotificationSettings/>}
        </StyledView>
    );
}