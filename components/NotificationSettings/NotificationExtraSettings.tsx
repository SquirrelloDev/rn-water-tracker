import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {Switch} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import useNotification from "@/hooks/useNotification";
import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import {useCallback, useRef, useState} from "react";
import NotificationSound from "@/components/NotificationSettings/NotificationSound";
import {notificationSounds, Sounds} from "@/constants/notificationIntervals";
import COLORS from "@/constants/theme/colors";
import {useColorScheme} from "nativewind";

export function NotificationExtraSettings() {
    const {colorScheme} = useColorScheme()
    const {soundEnabled, toggleNotificationSounds, changeNotificationSound, notificationSound} = useNotification()
    const soundSelectionModal = useRef<BottomSheetModal>(null)
    const openSoundSelect = () => {
      soundSelectionModal.current?.present()
    }
    const [selectedSoundIdx, setSelectedSoundIdx] = useState<number>(notificationSounds.findIndex(sound => sound.fileName === notificationSound.fileName)!)
    const changeSound = useCallback((soundFile: Sounds, index: number) => {
        changeNotificationSound(soundFile)
        setSelectedSoundIdx(index)
    }, [changeNotificationSound])
    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
        return <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>
    }, [])
    return (
        <StyledView>
            <StyledText className={'text-base m-3 font-medium dark:text-white'}>Dźwięki</StyledText>
            <StyledView className={'bg-white dark:bg-neutral-900'}>
                <StyledView className={'p-3 flex-row justify-between items-center'}>
                    <StyledView>
                        <StyledText className={'text-base dark:text-white'}>Dźwięki włączone</StyledText>
                        <StyledText className={'my-1 w-72 text-xs text-slate-400'}>Wyłączenie tej opcji wyłącza WSZYSTKIE DŹWIĘKI!</StyledText>
                    </StyledView>
                    <Switch value={soundEnabled} onValueChange={toggleNotificationSounds} trackColor={{true: '#49c4e1'}}/>
                </StyledView>
                <StyledPressable android_ripple={{color: '#ccc'}} className={'flex-row justify-between p-3 py-5 active:opacity-50'} onPress={openSoundSelect}>
                    <StyledText className={'text-base dark:text-white'}>Dźwięk powiadomienia</StyledText>
                    <StyledView className={'flex-row items-center'}>
                        <StyledText className={'mr-2 text-slate-400'}>{notificationSounds[selectedSoundIdx].title}</StyledText>
                        <Ionicons name={'chevron-forward'} size={20} color={'#aaa'}/>
                    </StyledView>
                </StyledPressable>
            </StyledView>
                <BottomSheetModal ref={soundSelectionModal} snapPoints={['50%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{
                    backgroundColor: colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black
                }} handleStyle={{
                    backgroundColor: COLORS[colorScheme].primary,
                    borderTopStartRadius: 12,
                    borderTopEndRadius: 12,
                }}>
                    <StyledView className={'dark:bg-neutral-800'}>
                    <StyledText className={'font-bold text-lg p-3 mx-2 dark:text-white'}>Wybierz dźwięk</StyledText>
                    </StyledView>
                    <BottomSheetScrollView style={{backgroundColor: COLORS[colorScheme].primary}}>
                        {notificationSounds.map((sound, idx) => <NotificationSound key={sound.title} soundObj={sound} setNotificationSound={changeSound} index={idx} selectedIndex={selectedSoundIdx} /> )}
                    </BottomSheetScrollView>
                </BottomSheetModal>
        </StyledView>
    );
}