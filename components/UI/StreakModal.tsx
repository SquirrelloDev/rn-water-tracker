import React, {useCallback, useEffect, useRef} from "react";
import Modal from "react-native-modal";
import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import CustomButton from "./CustomButton";
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
    withTiming,
    Easing, withDelay, interpolateColor
} from "react-native-reanimated";
import {FINAL_VALUES, INITIAL_VALUES} from "@/constants/animation_values/streakModalValues";
import * as Haptics from "expo-haptics";
import {NotificationFeedbackType} from "expo-haptics";

interface StreakModalProps {
    currentStreak: number
    isVisible: boolean
    toggleModal: () => void
}
const AnimatedText = Animated.createAnimatedComponent(StyledText)
const AnimatedView = Animated.createAnimatedComponent(StyledView)
export function StreakModal({isVisible, toggleModal, currentStreak}: StreakModalProps) {
    const positionValue = useSharedValue(INITIAL_VALUES.counterPositionValue)
    const newStreakValue = useSharedValue(INITIAL_VALUES.counterFontValue)
    const colorValue = useSharedValue(INITIAL_VALUES.counterColorValue)
    const opacityValue = useSharedValue(INITIAL_VALUES.buttonOpactiyValue)
    const transformButtonValue = useSharedValue(INITIAL_VALUES.transformButtonValue)
    const modalHeightVal = useSharedValue(INITIAL_VALUES.modalHeightValue)
    const defferedPosVal = useDerivedValue(() => {
        return positionValue.value - 95
    })
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{translateY: withTiming(positionValue.value, {duration: FINAL_VALUES.delays.counterSequence, easing: Easing.bezier(0.86, -0.05, 0.25, 1)})}]
    }))
    const animatedStyles2 = useAnimatedStyle(() => ({
        transform: [{translateY: withTiming(defferedPosVal.value, {duration: FINAL_VALUES.delays.counterSequence, easing: Easing.bezier(0.86, -0.05, 0.25, 1)})}],
        fontSize: withDelay(1, withSpring(newStreakValue.value)),
        color: interpolateColor(colorValue.value, [0,1], ['black', 'orange'])
    }))
    const buttonAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{translateY: withDelay(FINAL_VALUES.delays.buttonSequence, withSpring(transformButtonValue.value))}],
        opacity: withDelay(FINAL_VALUES.delays.buttonSequence, withTiming(opacityValue.value, {duration: 100, easing: Easing.linear}))
    }))
    const modalAnimatedStyles = useAnimatedStyle(() => ({
        height: withDelay(FINAL_VALUES.delays.buttonSequence, withSpring(modalHeightVal.value))
    }))
    const applyAnimation = useCallback(() => {
        Haptics.notificationAsync(NotificationFeedbackType.Success)
        positionValue.value = FINAL_VALUES.sharedValues.positionValue
        newStreakValue.value = FINAL_VALUES.sharedValues.fontValue
        colorValue.value = withDelay(1700, withTiming(1 - colorValue.value, {duration: 75}))
        opacityValue.value = FINAL_VALUES.sharedValues.opactiyValue
        transformButtonValue.value = FINAL_VALUES.sharedValues.transformButtonValue
        modalHeightVal.value = FINAL_VALUES.sharedValues.modalHeightValue

    }, [])
    const resetAnimation = useCallback(() => {
        positionValue.value = INITIAL_VALUES.counterPositionValue
        newStreakValue.value = INITIAL_VALUES.counterFontValue
        colorValue.value = INITIAL_VALUES.counterColorValue
        opacityValue.value = INITIAL_VALUES.buttonOpactiyValue
        transformButtonValue.value = INITIAL_VALUES.transformButtonValue
        modalHeightVal.value = INITIAL_VALUES.modalHeightValue
    }, [positionValue.value, newStreakValue.value, colorValue.value, opacityValue.value, transformButtonValue.value, modalHeightVal.value])
    const nextStreakValue = useRef<number>()
    useEffect(() => {
        let hapticTimer;
        if(isVisible){
            applyAnimation()
            hapticTimer = setTimeout(() => {
                Haptics.notificationAsync(NotificationFeedbackType.Success)
            }, FINAL_VALUES.delays.buttonSequence)
            nextStreakValue.current = currentStreak + 1
        }
        return () => {
            clearTimeout(hapticTimer)
        }
    }, [isVisible, applyAnimation])
    return (
        <Modal isVisible={isVisible} animationIn={"zoomIn"} animationOut={'zoomOut'} animationOutTiming={400}>
            <AnimatedView className={'p-4 rounded-xl bg-white items-center'} style={modalAnimatedStyles}>
                <StyledView>
                    <StyledText className={'my-4 text-4xl font-bold'}>Twoja passa</StyledText>
                </StyledView>
                <StyledView className={'relative my-2 px-2 justify-center items-center overflow-hidden'}>
                    <AnimatedText style={animatedStyles2} className={'text-5xl pt-1.5 font-bold'}>{nextStreakValue.current}</AnimatedText>
                    <AnimatedText style={animatedStyles} className={'text-5xl absolute'}>{currentStreak}</AnimatedText>
                </StyledView>
                <AnimatedView className={'w-full absolute'} style={buttonAnimatedStyles}>
                    <StyledText className={'text-center font-medium text-2xl my-1'}>Tak trzymaj!</StyledText>
                    <CustomButton title="Super!" onPress={() => {
                        resetAnimation()
                        toggleModal()
                    }}/>
                </AnimatedView>
            </AnimatedView>
        </Modal>
    );
}