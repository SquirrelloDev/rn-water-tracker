import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
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
        <Controller control={control} render={({field: {onChange, value}}) => (

            <StyledView className={'my-5 mx-5'}>
                <FlatList data={data.drinks} horizontal showsHorizontalScrollIndicator={false} renderItem={({item, index}) => (
                    <DrinkType name={item.name} id={item.id} onChange={onChange} index={index}/>
                )} keyExtractor={(item) => String(item.id)}/>
                <StyledView className={'my-3'}>
                    <StyledText className={'dark:text-white text-center font-bold text-2xl'}>{data.drinks[value - 1].name}</StyledText>
                </StyledView>
            </StyledView>
        )} name={name as Path<T>}/>

    )
}