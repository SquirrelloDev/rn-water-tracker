import {Control, Controller, FieldValues, Path} from "react-hook-form";
import RNDateTimePicker from "@react-native-community/datetimepicker";
interface FormDatePickerProps<T extends FieldValues>{
	name: string
	mode: 'date' | 'time'
	control: Control<T>
}
export function FormDatePicker<T extends FieldValues>({name, control, mode}:FormDatePickerProps<T>) {
	return (
		<Controller control={control} render={({field: {onChange, value}, fieldState: {isTouched}}) => (
			<>
			<RNDateTimePicker value={value ? value : new Date()} display={"default"} mode={mode} timeZoneName={'Europe/Warsaw'} onChange={(event, date) => onChange(date)} minimumDate={new Date(1970, 0, 1)}  maximumDate={new Date()} locale={'pl-PL'}/>
			</>
		)} name={name as Path<T>}/>
	)
}