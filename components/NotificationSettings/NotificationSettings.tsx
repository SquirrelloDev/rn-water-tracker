import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {NotificationIntervals} from "@/components/NotificationSettings/NotificationIntervals";
import {NotificationExtraSettings} from "@/components/NotificationSettings/NotificationExtraSettings";
export function NotificationSettings() {

    return (
        <StyledView>
            <StyledView>
                <NotificationIntervals />
                <NotificationExtraSettings />
            </StyledView>
        </StyledView>
    );
}