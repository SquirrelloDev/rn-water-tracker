import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {Audio, AVPlaybackSource} from "expo-av";
import {memo, useCallback, useEffect, useState} from "react";
import {Sound} from "expo-av/build/Audio/Sound";
import {Sounds} from "@/constants/notificationIntervals";
interface NotificationSoundProps {
    soundObj: Sounds
    setNotificationSound: (sound: Sounds, index: number) => void
    index: number
    selectedIndex: number

}
function NotificationSound({soundObj, setNotificationSound, index, selectedIndex}:NotificationSoundProps) {
    const [sound, setSound] = useState<Sound | null>(null)
    const playSound = useCallback(async () => {
        const {sound} = await Audio.Sound.createAsync(soundObj.source)
        setSound(sound)
        setNotificationSound(soundObj, index)
        await sound.playAsync()
    }, [setNotificationSound, soundObj, index])
    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                if (sound instanceof Sound) {
                    sound.unloadAsync();
                }
            }
            : undefined;
    }, [sound])
    return (
        <StyledPressable className={'p-3 mx-2 active:opacity-50 flex-row justify-between items-center'} onPress={playSound}>
            <StyledText className={'text-lg font-medium'}>{soundObj.title}</StyledText>
            <StyledView className={'w-7 h-7 border-2 border-amber-400 rounded-full items-center justify-center'}>
                {index === selectedIndex && <StyledView className={'w-5 h-5 bg-amber-400 rounded-full'}></StyledView>}
            </StyledView>
        </StyledPressable>
    );
}
export default memo(NotificationSound)