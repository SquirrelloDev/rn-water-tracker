import {Alert} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {StyledPressable} from "@/components/StyledComponents/StyledComponents";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";

export function AddEntryButton() {
    const toggleSheet = useBottomSheetStore(state => state.toggleSheet)
    const outerPressableHandler = () => {
      return
    }
    return (
        <StyledPressable className='w-full items-center' onPress={outerPressableHandler}>
            <StyledPressable className="h-full w-12 justify-center items-center bg-teal-500 rounded-full"
                       onPress={() => toggleSheet()}>
                <Ionicons name={'add'} size={40} color={'#0000ff'}/>
            </StyledPressable>
        </StyledPressable>
    )
}