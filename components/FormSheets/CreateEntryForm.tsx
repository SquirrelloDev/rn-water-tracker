import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {CustomBottomSheet} from "@/components/FormSheets/CustomBottomSheet";
import {useCallback, useRef, useState} from "react";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {FormProvider, useForm} from "react-hook-form";
import CustomButton from "@/components/UI/CustomButton";
import useProgressCreate, {AddEntryPostData, AddEntrySchema, addEntrySchema} from "@/queries/user_progress/create";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormTextInput} from "@/components/Input/FormTextInput";
import {FormDatePicker} from "@/components/Input/FormDatePicker";
import useAuthStore from "@/stores/authStore";
import {getCurrentTimeString, getDateWithoutTime} from "@/utils/days";
import {queryClient} from "@/utils/api";
import {listProgressByRangeQKString, listuserQKString} from "@/queries/user_progress/listing";
import useDrinkListing from "@/queries/drink_types/listing";
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {DrinkSelectables} from "@/components/FormSheets/DrinkSelectables";
import {ChangeDateButton} from "@/components/UI/ChangeDateButton";
import {ErrorBox} from "@/components/Auth/ErrorBox";
type CreateValues = {
    intake: number; drinkId: number; time?: Date; date?: Date;
}
export function CreateEntryForm() {
    const userData = useAuthStore(state => state.userData)
    const [datepickerShown, setDatepickerShown] = useState<boolean>(false)
    const modalRef = useRef<BottomSheetModal>(null)
    const {data, isLoading, isError, error} = useDrinkListing()
    const {mutate, isPending, isError: isCreateError, error: createError} = useProgressCreate(() => {
        modalRef.current?.dismiss()
        queryClient.invalidateQueries({queryKey: [listuserQKString]})
        queryClient.invalidateQueries({queryKey: [listProgressByRangeQKString]})
        setDatepickerShown(false)
    })
    const methods = useForm<CreateValues>({
        defaultValues: {
            drinkId: 1,
            intake: -1
        },
        resolver: zodResolver(addEntrySchema)
    })
    const {handleSubmit, control} = methods
    const addEntry = (data: AddEntrySchema) => {
        const testObj: AddEntryPostData = {
            date: data.date ? getDateWithoutTime(data.date) : getDateWithoutTime(new Date()),
            intake: data.intake,
            userId: userData!.id,
            drinkId: data.drinkId,
            time: data.time ? data.time.toLocaleTimeString() : getCurrentTimeString()
        }
        mutate(testObj)
    }
    const onDismiss = useCallback(() => {
        setDatepickerShown(false)
    }, [])
    return (
        <CustomBottomSheet ref={modalRef} onDismiss={onDismiss}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <FormProvider {...methods}>
                {isCreateError && <ErrorBox errorMessage={'Nie można dodać rekordu'} />}
                {isError && <ErrorBox errorMessage={'Nie można pobrać napojów'} />}
                    <StyledText className={'text-center font-bold text-xl dark:text-white'}>Dodaj wpis</StyledText>
                    {!isLoading && <DrinkSelectables data={data!} name={'drinkId'} control={control}/>}
                    <FormTextInput name={'intake'} control={control} placeholder={'Wartość w ml'} isRequired
                                   keyboardType={'number-pad'}/>
                    {datepickerShown ? <StyledView className={'flex-row justify-center'}>
                            <FormDatePicker name={'date'} control={control} mode={'date'}/>
                            <FormDatePicker name={'time'} mode={'time'} control={control}/>
                        </StyledView> :
                        <ChangeDateButton date={getDateWithoutTime(new Date())}
                                          onPress={() => setDatepickerShown(true)}/>}
                    <CustomButton title={'Dodaj wpis'} onPress={handleSubmit(addEntry)} isLoading={isPending}/>
                </FormProvider>
            </TouchableWithoutFeedback>
        </CustomBottomSheet>
    )
}