import {useQuery} from "@tanstack/react-query";
import {supabase} from "../../lib/supabase";

const listDrinks = async () => {
    const supaResult = await supabase.from('drink_types').select('name')
    return supaResult.data
}
export default function useDrinkListing() {
    const {data, isLoading} = useQuery({queryKey: ['List-Drinks'], queryFn: listDrinks})
    return {data, isLoading}
}