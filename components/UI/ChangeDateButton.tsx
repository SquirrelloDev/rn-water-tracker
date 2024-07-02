import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {Ionicons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {getCurrentTimeString} from "@/utils/days";

interface ChangeDateButtonProps {
    date: string,
    time?: string
    onPress: () => void
}

export function ChangeDateButton({date, time, onPress}: ChangeDateButtonProps) {
    const [createTime, setCreateTime] = useState<string>(getCurrentTimeString())
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if(!time){
            timer = setInterval(() => {
            setCreateTime(getCurrentTimeString())
        }, 1000)
        }
        return () => {
            clearInterval(timer)
        }
    }, [time])
    return (
        <StyledPressable onPress={onPress}>
            <StyledView className={'flex-row my-4 justify-center items-center'}>
                <Ionicons name={'pencil'} size={20} color={'rgb(148, 163, 184)'}/>
                <StyledText className={'ml-2 text-slate-400'}>{date} {time ? time.substring(0,5) : createTime.substring(0,5)}</StyledText>
            </StyledView>
        </StyledPressable>
    )
}