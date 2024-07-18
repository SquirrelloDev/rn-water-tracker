import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import useStreakListing from "@/queries/streak/listing";
import useAuthStore from "@/stores/authStore";
import {StreakActivityStatus} from "@/components/Stats/StreakSection/StreakActivityStatus";


export function StreakSection() {
    const userData = useAuthStore(state => state.userData)
    const {data, isLoading, isError, error, isSuccess} = useStreakListing({userId: userData!.id})
    return (
        <StyledView className={'mx-3 p-4 bg-white rounded-xl shadow-sm'}>
            <StyledView className={'flex-row justify-between items-center'}>
                <StyledText className={'font-bold text-xl'}>Twoja passa 🔥</StyledText>
                <StreakActivityStatus isActive={true}/>
            </StyledView>
            <StyledView className={'mt-3 flex-row justify-between'}>
                <StyledView className={'p-3 pr-12 border border-slate-200 rounded-xl'}>
                    <StyledText className={'font-bold text-xl'}>Obecna</StyledText>
                    <StyledText className={'font-bold text-2xl'}>11</StyledText>
                </StyledView>
                <StyledView className={'p-3 border border-slate-200 rounded-xl'}>
                    <StyledText className={'font-bold text-xl'}>Najdłuższa</StyledText>
                    <StyledText className={'font-bold text-2xl'}>13</StyledText>
                </StyledView>
            </StyledView>
        </StyledView>
    );
}