import {QueryFunction, useQuery} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase";
const drinkListingQK = 'List-Drinks'
type DrinkListingOK = [typeof drinkListingQK]
export type ListDrinksResponse = {
    drinks: {
        id: number,
        name: string
    }[]
    }

const listDrinks:QueryFunction<ListDrinksResponse, DrinkListingOK> = async () => {
    const {data, error} = await supabase.from('drink_types').select('id, name')
    if(error){
        throw new Error(error.message)
    }
    return {drinks: data}
}
export default function useDrinkListing() {
    const {data, isLoading, isError, error} = useQuery({queryKey: [drinkListingQK], queryFn: listDrinks})
    return {data, isLoading, isError, error}
}