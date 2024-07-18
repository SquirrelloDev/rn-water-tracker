import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import useStreakListing from "@/queries/streak/listing";
import useAuthStore from "@/stores/authStore";
import {StreakActivityStatus} from "@/components/Stats/StreakSection/StreakActivityStatus";
import {ActivityIndicator, Button} from "react-native";
import useAuth from "@/hooks/useAuth";
import {useEffect, useState} from "react";


export function StreakSection() {
    const userData = useAuthStore(state => state.userData)
    const {data, isLoading, isError, error, isSuccess} = useStreakListing({userId: userData!.id})
    const [isActive, setIsActive] = useState<boolean>(false)
    useEffect(() => {
        if(isSuccess && data){
            setIsActive(!!data.count)
        }
    }, [isSuccess, data])
    return (
        <StyledView className={'mx-3 p-4 bg-white rounded-xl shadow-sm'}>
            <StyledView className={'flex-row justify-between items-center'}>
                <StyledText className={'font-bold text-xl'}>Twoja passa 🔥</StyledText>
                <StreakActivityStatus isActive={isActive} isError={isError}/>
            </StyledView>
            <StyledView className={'mt-3 flex-row justify-between'}>
                <StyledView className={'p-3 pr-12 border border-slate-200 rounded-xl'}>
                    <StyledText className={'font-bold text-xl'}>Obecna</StyledText>
                    {isError && <StyledText className={'w-20'}>Nie możemy pobrać passy 😥</StyledText>}
                    {(isLoading && !isError) ? <ActivityIndicator /> : <StyledText className={'font-bold text-2xl'}>{data ? data.count! >= 1000 ? '999+' : data.count! : '?'}</StyledText>}
                </StyledView>
                <StyledView className={'p-3 border border-slate-200 rounded-xl'}>
                    <StyledText className={'font-bold text-xl'}>Najdłuższa</StyledText>
                    <StyledText className={'font-bold text-2xl'}>{userData.longestStreak}</StyledText>
                </StyledView>
            </StyledView>
        </StyledView>
    );
}