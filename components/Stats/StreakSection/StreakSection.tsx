import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import useStreakListing from "@/queries/streak/listing";
import useAuthStore from "@/stores/authStore";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {useEffect} from "react";

const AnimatedDot = Animated.createAnimatedComponent(StyledView)
export function StreakSection() {
    const opacityValue = useSharedValue(1)
    const scaleValue = useSharedValue(0)
    useEffect(() => {
        opacityValue.value = withRepeat(withTiming(0, {duration: 1000, easing: Easing.linear}), -1)
        scaleValue.value = withRepeat(withTiming(2, {duration: 1000, easing: Easing.linear}), -1)
    }, [])
    const animatedDotStyles = useAnimatedStyle(() => ({
        transform: [{scale: scaleValue.value}],
        opacity: opacityValue.value
    }))
    const userData = useAuthStore(state => state.userData)
    const {data, isLoading, isError, error, isSuccess} = useStreakListing({userId: userData!.id})
    return (
        <StyledView className={'mx-3 p-4 bg-white rounded-xl shadow-sm'}>
            <StyledView className={'flex-row justify-between items-center'}>
                <StyledText className={'font-bold text-xl'}>Twoja passa 🔥</StyledText>
                <StyledView className={'flex-row items-center'}>
                    <StyledView className={'relative z-10 h-3 w-3 bg-green-400 mr-3 rounded-full'}>
                        <AnimatedDot className={'absolute -z-10 h-3 w-3 rounded-full bg-green-400'} style={animatedDotStyles}></AnimatedDot>
                    </StyledView>
                    <StyledText className={'text-green-400'}>Aktywna</StyledText>
                </StyledView>
            </StyledView>
            <StyledView className={'mt-3 flex-row justify-between'}>
                <StyledView className={'p-3 pr-12 border border-slate-200 rounded-xl'}>
                    <StyledText className={'font-bold text-xl'}>Obecna</StyledText>
                    <StyledText className={'font-bold text-2xl'}>11</StyledText>
                </StyledView>
                <StyledView className={'p-3 border border-slate-200 rounded-xl'}>
                    <StyledText className={'font-bold text-xl'}>Najdłuższa</StyledText>
                    <StyledText className={'font-bold text-2xl'}>13</StyledText>
                </StyledView>
            </StyledView>
        </StyledView>
    );
}