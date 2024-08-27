import {StyledIcon, StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {FaqQuestion} from "@/constants/faqQuestions";
import {styled} from "nativewind";
import {Ionicons} from "@expo/vector-icons";
import clsx from "clsx";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {useEffect} from "react";

interface FaqItemProps {
    isSelected: boolean
    toggleItemHandler: (index: number) => void
    index: number
    item: FaqQuestion
}

const AnimatedIcon = Animated.createAnimatedComponent(StyledIcon)
const AnimatedView = Animated.createAnimatedComponent(StyledView)

export function FaqItem({isSelected, item, toggleItemHandler, index}: FaqItemProps) {
    const rotateValue = useSharedValue(0)
    const rotateStyles = useAnimatedStyle(() => ({
        transform: [{rotate: withTiming(`${rotateValue.value}deg`, {duration: 300, easing: Easing.ease})}]
    }), [])
    const faqItemHandler = () => {
        toggleItemHandler(index)
        rotateValue.value = isSelected ? rotateValue.value + 180 : rotateValue.value - 180
    }
    useEffect(() => {
        if (!isSelected) {
            rotateValue.value = 0
        }

    }, [isSelected, rotateValue])
    return (
        <StyledView>
            <StyledPressable
                className={clsx('px-3 py-4 flex-row justify-between items-center', isSelected && 'bg-neutral-700')}
                onPress={() => faqItemHandler()}>
                <StyledText className={'dark:text-white text-lg w-72'}>{item.question}</StyledText>
                <AnimatedIcon name={'chevron-down'} className={'dark:text-white'} style={rotateStyles} size={24}/>
            </StyledPressable>
            {
                isSelected && (
                    <AnimatedView className={'px-3 py-2 dark:bg-neutral-700 origin-top'}>
                        <StyledText className={'dark:text-white text-base'}>{item.answer}</StyledText>
                    </AnimatedView>
                )
            }
        </StyledView>
    );
}