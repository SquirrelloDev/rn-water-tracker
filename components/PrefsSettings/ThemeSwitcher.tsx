import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {useColorScheme} from "nativewind";
import useUserPrefsStore from "@/stores/userPrefsStore";
import {ColorSchemeSystem} from "nativewind/dist/style-sheet/color-scheme";

export function ThemeSwitcher() {
    const currentTheme: ColorSchemeSystem = useUserPrefsStore(state => state.currentTheme)
    const setCurrentTheme = useUserPrefsStore(state => state.setCurrentTheme)
    const setThemeHandler = (theme: ColorSchemeSystem) => {
      setCurrentTheme(theme)
    }
    return (
        <StyledView className={'flex-row justify-around'}>

            <StyledPressable onPress={() => setThemeHandler('light')}>
                <StyledText className={'dark:text-white'}>Jasny</StyledText>
                <StyledView className={'w-7 h-7 border-2 border-amber-400 rounded-full items-center justify-center'}>
                    {currentTheme === 'light' && <StyledView className={'w-5 h-5 bg-amber-400 rounded-full'}></StyledView>}
                </StyledView>
            </StyledPressable>

            <StyledPressable onPress={() => setThemeHandler('dark')}>
                <StyledText className={'dark:text-white'}>Ciemny</StyledText>
                <StyledView className={'w-7 h-7 border-2 border-amber-400 rounded-full items-center justify-center'}>
                    {currentTheme === 'dark' && <StyledView className={'w-5 h-5 bg-amber-400 rounded-full'}></StyledView>}
                </StyledView>
            </StyledPressable>

            <StyledPressable onPress={() => setThemeHandler('dark')}>
                <StyledText className={'dark:text-white'}>Systemowy</StyledText>
                <StyledView className={'w-7 h-7 border-2 border-amber-400 rounded-full items-center justify-center'}>
                    {currentTheme === 'system' && <StyledView className={'w-5 h-5 bg-amber-400 rounded-full'}></StyledView>}
                </StyledView>
            </StyledPressable>

        </StyledView>
    );
}