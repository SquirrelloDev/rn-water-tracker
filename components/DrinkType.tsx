import clsx from "clsx";
import {useFormContext} from "react-hook-form";
import {IconButton} from "@/components/UI/IconButton";
import {impactAsync, ImpactFeedbackStyle} from "expo-haptics";

interface DrinkTypeProps {
    name: string,
    id: number
    index: number
    onChange: (...event: any[]) => void

}
const drinkTypesColors = ['#49c4e1', '#c7782e', '#c7972e', '#be3838', '#66c232']

export function DrinkType({id, onChange, index}: DrinkTypeProps) {
    const {watch} = useFormContext()
    const selectedDrinkId = watch('drinkId')
    const setDrinkId = () => {
        impactAsync(ImpactFeedbackStyle.Soft)
        onChange(id)
    }
    return (
        <IconButton icon={'water'} color={drinkTypesColors[index]} size={24} onPress={setDrinkId} wrapperClassName={clsx('mx-2 bg-white w-14 h-14 rounded-full justify-center items-center', selectedDrinkId === id && 'border-2 border-blue-400')}/>
    )
}