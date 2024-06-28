import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {FlatList} from "react-native";
import {DrinkType} from "@/components/DrinkType";
import {ListDrinksResponse} from "@/queries/drink_types/listing";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
interface DrinkSelectablesProps<T extends FieldValues> {
	data: ListDrinksResponse,
	control: Control<T>
	name: string
}
export function DrinkSelectables<T extends FieldValues>({data, name, control}: DrinkSelectablesProps<T>) {
	return (
		<Controller control={control} render={({field: {onChange}}) => (
			<StyledView className={'my-5 mx-5'}>
				<FlatList data={data.drinks} horizontal showsHorizontalScrollIndicator={false} renderItem={({item}) => (
					<DrinkType name={item.name} id={item.id} onChange={onChange}/>
				)} keyExtractor={(item) => item.id}/>
			</StyledView>
		)} name={name as Path<T>} />

	)
}