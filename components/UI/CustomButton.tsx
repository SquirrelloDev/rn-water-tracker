import clsx from "clsx";
import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {ActivityIndicator} from "react-native";
import useBtnLoadingStyle from "@/hooks/useBtnLoadingStyle";

interface CustomButtonProps {
    title: string
    onPress: () => void
    variant?: 'outline' | 'solid',
    isLoading?: boolean
}
export default function CustomButton({title, onPress, isLoading, variant = 'solid'}: CustomButtonProps) {
    const {loadingTextStyles, loadingBgStyles} = useBtnLoadingStyle(variant!)
    return (
        <StyledView className={clsx('mx-3 my-2.5 rounded-3xl')}>
            <StyledPressable onPress={onPress} android_ripple={{color: '#ccc', borderless: true}} disabled={isLoading}
                       className={clsx('py-3 rounded-3xl active:opacity-75', variant === 'solid' ? 'bg-blue-400 ' : 'border border-blue-400', isLoading && loadingBgStyles())}>
                <StyledView className={'flex-row justify-center'}>
                {isLoading && <ActivityIndicator color={variant === 'solid' ? '#fff' : '#000'}/>}
                <StyledText
                    className={clsx('text-center text-base font-medium', variant === 'solid' ? 'text-white' : 'text-blue-400', isLoading &&  'ml-2', isLoading && loadingTextStyles())}>{title}</StyledText>
                </StyledView>
            </StyledPressable>
        </StyledView>
    )
}