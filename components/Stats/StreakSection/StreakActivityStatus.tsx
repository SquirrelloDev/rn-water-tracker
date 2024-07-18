import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {useEffect} from "react";
import clsx from "clsx";
const AnimatedDot = Animated.createAnimatedComponent(StyledView)
interface StreakActivityStatusProps {
    isActive: boolean
}
export function StreakActivityStatus({isActive}: StreakActivityStatusProps) {
    const opacityValue = useSharedValue(1)
    const scaleValue = useSharedValue(0)
    useEffect(() => {
        if(isActive){
        opacityValue.value = withRepeat(withTiming(0, {duration: 1000, easing: Easing.linear}), -1)
        scaleValue.value = withRepeat(withTiming(2, {duration: 1000, easing: Easing.linear}), -1)
        }
    }, [isActive])
    const animatedDotStyles = useAnimatedStyle(() => ({
        transform: [{scale: scaleValue.value}],
        opacity: opacityValue.value
    }))
    return (
        <StyledView className={'flex-row items-center'}>
            <StyledView className={clsx('relative z-10 h-3 w-3 mr-3 rounded-full', isActive ? 'bg-green-400' : 'bg-slate-200') }>
                <AnimatedDot className={clsx('absolute -z-10 h-3 w-3 rounded-full',  isActive ? 'bg-green-400' : 'bg-slate-200')} style={isActive ? animatedDotStyles : []}></AnimatedDot>
            </StyledView>
            <StyledText className={clsx(isActive ? 'text-green-400' : 'text-slate-200')}>{isActive ? 'Aktywna' : 'Nieaktywna'}</StyledText>
        </StyledView>
    );
}