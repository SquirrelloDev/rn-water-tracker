import clsx from "clsx";
import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {ActivityIndicator} from "react-native";
import useBtnLoadingStyle from "@/hooks/useBtnLoadingStyle";
import useBtnColor from "@/hooks/useBtnColor";

interface CustomButtonProps {
    title: string
    onPress: () => void
    variant?: 'outline' | 'solid',
    actionColor?: 'info' | 'warning' | 'danger'
    size?: 'small' | 'normal'
    isLoading?: boolean
}
export default function CustomButton({title, onPress, isLoading, variant = 'solid', size = 'normal', actionColor = 'info'}: CustomButtonProps) {
    const {loadingTextStyles, loadingBgStyles} = useBtnLoadingStyle(variant!)
    const {bgColorValues, textColorValues} = useBtnColor(variant!, actionColor!)
    return (
        <StyledView className={clsx('mx-3 my-2.5 rounded-3xl')}>
            <StyledPressable onPress={onPress} android_ripple={{color: '#ccc', borderless: true}} disabled={isLoading}
                       className={clsx('rounded-3xl active:opacity-75', size === 'normal' ? 'py-3' : 'py-1.5' , bgColorValues, isLoading && loadingBgStyles())}>
                <StyledView className={'flex-row justify-center'}>
                {isLoading && <ActivityIndicator color={variant === 'solid' ? '#fff' : '#000'}/>}
                <StyledText
                    className={clsx('text-center text-base font-medium', textColorValues, isLoading &&  'ml-2', isLoading && loadingTextStyles())}>{title}</StyledText>
                </StyledView>
            </StyledPressable>
        </StyledView>
    )
}