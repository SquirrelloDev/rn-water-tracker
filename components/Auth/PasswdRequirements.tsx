import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import useRegisterValidation from "@/hooks/useRegisterValidation";
import {Ionicons} from "@expo/vector-icons";
import clsx from "clsx";
import {useColorScheme} from "nativewind";
import COLORS from "@/constants/theme/colors";

interface PasswdRequirementsProps {
    value: string
}

export function PasswdRequirements({value}: PasswdRequirementsProps) {
    const validatePasswdResult = useRegisterValidation(value)
    const {colorScheme} = useColorScheme()
    return (
        <StyledView className={'mx-5 my-3 p-3 bg-white shadow-sm rounded-2xl border border-slate-400 dark:bg-neutral-800 dark:border-neutral-700'}>
            <StyledText className={'my-1 font-bold text-lg dark:text-white'}>Hasło musi składać się z:</StyledText>
            <StyledView className={'flex-row items-center'}>
                <Ionicons name={'checkmark'} size={20} color={validatePasswdResult.length ? '#22c55e' : colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black}/>
                <StyledText className={clsx('my-1 text-base ml-2 dark:text-white', validatePasswdResult.length && 'text-green-500')}>Co
                    najmniej 8 znaków</StyledText>
            </StyledView>
            <StyledView className={'flex-row items-center'}>
                <Ionicons name={'checkmark'} size={20} color={validatePasswdResult.digit ? '#22c55e' : colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black}/>
                <StyledText className={clsx('my-1 text-base ml-2 dark:text-white', validatePasswdResult.digit && 'text-green-500')}>Co
                    najmniej 1. cyfry</StyledText>
            </StyledView>
            <StyledView className={'flex-row items-center'}>
                <Ionicons name={'checkmark'} size={20} color={validatePasswdResult.specialCharacter ? '#22c55e' : colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black}/>
                <StyledText
                    className={clsx('my-1 text-base ml-2 dark:text-white', validatePasswdResult.specialCharacter && 'text-green-500')}>Znaku
                    specjalnego</StyledText>
            </StyledView>
        </StyledView>
    )
}