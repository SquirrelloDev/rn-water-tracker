import {CustomBottomSheet} from "@/components/FormSheets/CustomBottomSheet";
import {ActivityIndicator, Keyboard, TouchableWithoutFeedback} from "react-native";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {DrinkSelectables} from "@/components/FormSheets/DrinkSelectables";
import useDrinkListing from "@/queries/drink_types/listing";
import {useCallback, useEffect, useRef, useState} from "react";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import useAuthStore from "@/stores/authStore";
import {FormTextInput} from "@/components/Input/FormTextInput";
import {FormDatePicker} from "@/components/Input/FormDatePicker";
import {ChangeDateButton} from "@/components/UI/ChangeDateButton";
import {getCurrentTimeString, getDateWithoutTime} from "@/utils/days";
import CustomButton from "@/components/UI/CustomButton";
import useProgressEdit, {editEntrySchema, EditEntrySchema, EntryPutData} from "@/queries/user_progress/edit";
import {queryClient} from "@/utils/api";
import {listuserQKString, useOneProgressListing} from "@/queries/user_progress/listing";
import {ErrorBox} from "@/components/Auth/ErrorBox";

interface EditEntryFormProps {
	drinkId: number | null
}
export function EditEntryForm({drinkId}: EditEntryFormProps) {
	const userData = useAuthStore(state => state.userData)
	const [datepickerShown, setDatepickerShown] = useState<boolean>(false)
	const {data, isLoading} = useDrinkListing()
	const modalRef = useRef<BottomSheetModal>(null)
	const {data: entryData, isLoading: isEntryDataLoading, isError: isProgressError, error: progressError} = useOneProgressListing({entryId: drinkId})
	const {mutate, isPending, isError: isEditError, error: editError} = useProgressEdit(() => {
		modalRef.current?.dismiss()
		queryClient.invalidateQueries({queryKey: [listuserQKString]})
		setDatepickerShown(false)
	})
	const methods = useForm({
		defaultValues: {
			drinkId: (!isEntryDataLoading && entryData) ? entryData.progress.drink_id : 1,
			intake: (!isEntryDataLoading && entryData) ? entryData.progress.intake : 1,
			date: (!isEntryDataLoading && entryData) ? entryData.progress.date : new Date(),
			time: (!isEntryDataLoading && entryData) ? entryData.progress.time : new Date()
		},
		resolver: zodResolver(editEntrySchema)
	})
	const {handleSubmit, control, getValues, reset} = methods
	useEffect(() => {
		if(entryData){
			reset({
				intake: entryData.progress.intake,
				drinkId: entryData.progress.drink_id,
				time: new Date(`${entryData.progress.date} ${entryData.progress.time}`),
				date: new Date(entryData.progress.date)
			})
		}
	}, [entryData])
	const editEntry = (data: EditEntrySchema) => {
		const testObj: EntryPutData = {
			id: drinkId,
			date: data.date ? getDateWithoutTime(data.date) : getDateWithoutTime(new Date()),
			intake: data.intake,
			userId: userData!.id,
			drinkId: data.drinkId,
			time: data.time ? (data.time as Date).toLocaleTimeString() : getCurrentTimeString()
		}

		mutate(testObj)
	}
	const onDismiss = useCallback(() => {
		setDatepickerShown(false)
	}, [])
	return (
		<CustomBottomSheet ref={modalRef} onDismiss={onDismiss}>
			{entryData && (
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<FormProvider {...methods}>
					{isProgressError && <ErrorBox errorMessage={'Nie można pobrać danych'} />}
					{isEditError && <ErrorBox errorMessage={`Wystąpił problem z wysłaniem danych: ${editError}`} />}
						<StyledText className={'text-center font-bold text-xl'}>Edytuj wpis</StyledText>
						{(!isLoading && !isEntryDataLoading) && <DrinkSelectables data={data!} name={'drinkId'} control={control}/>}
						<FormTextInput name={'intake'} defaultValue={`${getValues('intake')}`} control={control} placeholder={'Wartość w ml'} isRequired
									   keyboardType={'number-pad'}/>
						{datepickerShown ? <StyledView className={'flex-row justify-center'}>
								<FormDatePicker name={'date'} control={control} mode={'date'}/>
								<FormDatePicker name={'time'} mode={'time'} control={control}/>
							</StyledView> :
							<ChangeDateButton date={getDateWithoutTime(entryData.progress.date)} time={entryData.progress.time}
											  onPress={() => setDatepickerShown(true)}/>}
						<CustomButton title={'Edytuj wpis'} onPress={handleSubmit(editEntry)} isLoading={isPending}/>
					</FormProvider>
				</TouchableWithoutFeedback>
			)}
			{!entryData && <ActivityIndicator />}

		</CustomBottomSheet>
	)
}