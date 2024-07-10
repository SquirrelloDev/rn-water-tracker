import {CustomBottomSheet} from "@/components/FormSheets/CustomBottomSheet";
import {useRef} from "react";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {Alert, Keyboard, TouchableWithoutFeedback} from "react-native";
import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import CustomButton from "@/components/UI/CustomButton";
import useProgressDelete from "@/queries/user_progress/delete";
import {queryClient} from "@/utils/api";
import {listuserQKString} from "@/queries/user_progress/listing";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";
import {ErrorBox} from "@/components/Auth/ErrorBox";

interface DeleteEntryFormProps {
    drinkId: number | null
    isStreakActive: boolean
}

export function DeleteEntryForm({drinkId, isStreakActive}: DeleteEntryFormProps) {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const clearDrinkId = useBottomSheetStore(state => state.clearDrinkId)
    const setSheetType = useBottomSheetStore(state => state.setSheetType)
    const {mutate, isPending, error, isError} = useProgressDelete(() => {
        bottomSheetRef.current?.dismiss()
        queryClient.invalidateQueries({queryKey: [listuserQKString]})
        clearDrinkId()
        setSheetType(null)

    })
    const confirmDelete = () => {
        if (isStreakActive) {
            Alert.alert('UWAGA!', 'Posiadasz aktywną passę. Usunięcie wpisu spowoduje jej utratę! Czy kontynuować?', [{
                style: 'default',
                text: 'Anuluj',
                isPreferred: true
            },{
                style: "destructive",
                text: 'Usuń',
                onPress: () => mutate(drinkId)
            }])
            return
        }
        mutate(drinkId)
    }
    return (
        <CustomBottomSheet ref={bottomSheetRef} snapPoints={['30%']}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <StyledView>
                    {isError && <ErrorBox errorMessage={`Nie można usunąć wpisu: ${error}`}/>}
                    <StyledText className={'text-center font-bold text-xl'}>Czy na pewno chcesz usunąć
                        wpis?</StyledText>
                    <CustomButton title={'Usuń'} onPress={confirmDelete} isLoading={isPending}/>
                    <CustomButton title={'Anuluj'} onPress={() => bottomSheetRef.current?.dismiss()} variant={'outline'}
                                  isLoading={isPending}/>
                </StyledView>
            </TouchableWithoutFeedback>
        </CustomBottomSheet>
    )
}