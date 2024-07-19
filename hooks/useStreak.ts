import useStreakListing, {listStreakQKString} from "@/queries/streak/listing";
import useAuthStore from "@/stores/authStore";
import useStreakAdd from "@/queries/streak/create";
import {useCallback, useEffect, useState} from "react";
import {isToday} from "@/utils/days";
import useDeleteStreakEntry from "@/queries/streak/delete";
import {queryClient} from "@/utils/api";
import {FINAL_VALUES} from "@/constants/animation_values/streakModalValues";

export default function useStreak(percentage: number, selectedDate: string) {
    //isStreakActive state represents activated streak
    const [isStreakActive, setIsStreakActive] = useState<boolean>(false)
    //isStreakActivatedToday state represents streak activation for current day. This state prevents adding other days to the streak
    const [isStreakActivatedToday, setIsStreakActivatedToday] = useState<boolean>(false)
    //isActiveStreakInitialized state represents streak initialization flag.
    const [isActiveStreakInitialized, setIsActiveStreakInitialized] = useState<boolean>(false)

    const [currentStreak, setCurrentStreak] = useState<number>(0)
    const [streakModalShown, setStreakModalShown] = useState<boolean>(false)
    const userData = useAuthStore(state => state.userData)
    const {data, isError, isLoading, isSuccess} = useStreakListing({userId: userData!.id})
    const {mutate} = useStreakAdd(() => {
        setTimeout(() => {
            queryClient.invalidateQueries({queryKey: [listStreakQKString]})
        }, FINAL_VALUES.delays.buttonSequence)
    })
    const {mutate: performDelete} = useDeleteStreakEntry(() => {
        queryClient.invalidateQueries({queryKey: [listStreakQKString]})
    })
    useEffect(() => {
        if (isError) {
            setIsStreakActive(false)
        }
        if (!isLoading && data) {
            setIsStreakActive(!!data.count)
            setCurrentStreak(data.count!)
        }
    }, [isLoading, data, isError])
    useEffect(() => {
        if (!isSuccess) {
            return
        }
        if (isSuccess && data && !isStreakActivatedToday && !isActiveStreakInitialized) {
            const isActiveToday = !!data?.list.find(item => isToday(item.date))
            setIsStreakActivatedToday(isActiveToday)
            setIsActiveStreakInitialized(true)
            return
        }
        if (percentage >= 1 && isToday(selectedDate) && !isStreakActivatedToday) {
            increaseStreak()
            setIsStreakActivatedToday(true)
            setIsStreakActive(true)
            setStreakModalShown(true)
        }
    }, [percentage, isSuccess, data, selectedDate, isToday])
    useEffect(() => {
        if (!isSuccess) {
            return
        }
        if (percentage < 1 && isToday(selectedDate) && isStreakActivatedToday && isStreakActive) {
            decreaseStreak()
            setIsStreakActivatedToday(false)
            setIsStreakActive(false)
        }
    }, [isSuccess, percentage])
    const increaseStreak = useCallback(() => {
        console.log('dodaję')
        mutate({userId: userData!.id, date: selectedDate, currentStreak})
    }, [selectedDate, userData, currentStreak])
    const decreaseStreak = useCallback(() => {
            console.log('usuwam')
            performDelete({userId: userData!.id, date: selectedDate})
        }, [userData, selectedDate])
    return {increaseStreak, decreaseStreak, isStreakActive, streakModalShown, setStreakModalShown, currentStreak}
}