import {StyledImage, StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {useColorScheme} from "nativewind";
import useUserPrefsStore from "@/stores/userPrefsStore";
import {ColorSchemeSystem} from "nativewind/dist/style-sheet/color-scheme";
import {Image} from "react-native";
import COLORS from "@/constants/theme/colors";

export function ThemeSwitcher() {
    const {colorScheme} = useColorScheme()
    const currentTheme: ColorSchemeSystem = useUserPrefsStore(state => state.currentTheme)
    const setCurrentTheme = useUserPrefsStore(state => state.setCurrentTheme)
    const setThemeHandler = (theme: ColorSchemeSystem) => {
      setCurrentTheme(theme)
    }
    return (
        <StyledView>
            <StyledText className={'dark:text-white font-bold text-xl p-3'}>Motyw aplikacji</StyledText>
            <StyledText className={'dark:text-slate-300 text-slate-400 p-3 pt-0 mb-3'}>Wybranie poszczególnej opcji spowoduje zmianę kolorystyki aplikacji</StyledText>
            <StyledView className={'flex-row justify-around'}>
                <StyledPressable onPress={() => setThemeHandler('light')} className={'items-center p-2'}>
                <StyledImage source={require('@/assets/light-setting.png')} style={{width: 70, height: 100, borderWidth: 1, borderRadius: 8, borderColor: COLORS[colorScheme].tabBarBorder}}/>
                    <StyledText className={'dark:text-white my-2'}>Jasny</StyledText>
                    <StyledView className={'w-7 h-7 border-2 border-amber-400 rounded-full items-center justify-center'}>
                        {currentTheme === 'light' && <StyledView className={'w-5 h-5 bg-amber-400 rounded-full'}></StyledView>}
                    </StyledView>
                </StyledPressable>

                <StyledPressable onPress={() => setThemeHandler('dark')} className={'items-center p-2'}>
                    <StyledImage source={require('@/assets/dark-setting.png')} style={{width: 70, height: 100, borderWidth: 1, borderRadius: 8, borderColor: COLORS[colorScheme].tabBarBorder}}/>
                    <StyledText className={'dark:text-white my-2'}>Ciemny</StyledText>
                    <StyledView className={'w-7 h-7 border-2 border-amber-400 rounded-full items-center justify-center'}>
                        {currentTheme === 'dark' && <StyledView className={'w-5 h-5 bg-amber-400 rounded-full'}></StyledView>}
                    </StyledView>
                </StyledPressable>

                <StyledPressable onPress={() => setThemeHandler('system')} className={'items-center p-2'}>
                    <StyledImage source={require('@/assets/system-setting.png')} style={{width: 70, height: 100, borderWidth: 1, borderRadius: 8, borderColor: COLORS[colorScheme].tabBarBorder}}/>
                    <StyledText className={'dark:text-white my-2'}>System</StyledText>
                    <StyledView className={'w-7 h-7 border-2 border-amber-400 rounded-full items-center justify-center'}>
                        {currentTheme === 'system' && <StyledView className={'w-5 h-5 bg-amber-400 rounded-full'}></StyledView>}
                    </StyledView>
                </StyledPressable>

            </StyledView>
        </StyledView>
    );
}