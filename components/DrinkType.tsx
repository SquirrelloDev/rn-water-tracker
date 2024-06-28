import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import clsx from "clsx";
import {useFormContext} from "react-hook-form";
interface DrinkTypeProps {
	name: string,
	id: number
	onChange: (...event: any[]) => void

}
export function DrinkType({name, id, onChange}: DrinkTypeProps) {
	const {watch} = useFormContext()
	const selectedDrinkId = watch('drinkId')
	const setDrinkId = () => {
	  onChange(id)
	}
	return (
		<StyledPressable className={clsx('py-4 px-2 mx-2 bg-slate-200 rounded', selectedDrinkId === id && 'border border-blue-400')} onPress={setDrinkId}>
			<StyledText>{name}</StyledText>
		</StyledPressable>
	)
}