import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {NotificationIntervals} from "@/components/NotificationSettings/NotificationIntervals";
export function NotificationSettings() {

    return (
        <StyledView>
            <StyledText>Ustawienia</StyledText>
            <StyledView>
                <NotificationIntervals />
            </StyledView>
        </StyledView>
    );
}