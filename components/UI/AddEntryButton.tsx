import {Ionicons} from "@expo/vector-icons";
import {StyledPressable} from "@/components/StyledComponents/StyledComponents";
import {useBottomSheetFormStore} from "@/stores/bottomSheetStore";

export function AddEntryButton() {
    const toggleSheet = useBottomSheetFormStore(state => state.toggleSheet)
    const setSheetType = useBottomSheetFormStore(state => state.setSheetType)
    const outerPressableHandler = () => {
      return
    }
    return (
        <StyledPressable className='w-full items-center' onPress={outerPressableHandler}>
            <StyledPressable className="h-full w-12 justify-center items-center bg-teal-500 rounded-full"
                       onPress={() => {
                           setSheetType('create')
                           toggleSheet()
                       }}>
                <Ionicons name={'add'} size={40} color={'#0000ff'}/>
            </StyledPressable>
        </StyledPressable>
    )
}