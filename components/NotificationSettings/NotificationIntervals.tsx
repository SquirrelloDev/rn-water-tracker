import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {Card} from "@/components/UI/Card";
import useNotification from "@/hooks/useNotification";
import intervals from "@/constants/notificationIntervals";
import clsx from "clsx";
import {impactAsync, ImpactFeedbackStyle} from "expo-haptics";


export function NotificationIntervals() {
    const {changeWaterInterval, waterNotificationInterval} = useNotification()
    return (
        <StyledView className={'my-4'}>
            <StyledView className={'my-1'}>
                <StyledText className={'font-medium text-base px-3'}>Interwał powiadomień</StyledText>
            </StyledView>
            <StyledView className={'flex-row flex-wrap items-center justify-center bg-slate-100 rounded-xl m-3'}>
            {intervals.map(interval => (
                <StyledPressable key={interval.title} className={'w-40 grow'} onPress={() => {
                    impactAsync(ImpactFeedbackStyle.Light)
                    changeWaterInterval(interval.value)
                } }>
                    <Card classNames={clsx(interval.value === waterNotificationInterval && 'bg-sky-400')}>
                        <StyledText className={clsx('text-center font-medium', interval.value === waterNotificationInterval && 'text-white')}>{interval.title}</StyledText>
                    </Card>
                </StyledPressable>
            ))}
            </StyledView>
        </StyledView>
    );
}