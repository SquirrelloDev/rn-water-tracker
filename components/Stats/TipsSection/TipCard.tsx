import {
    StyledImageBackground,
    StyledPressable,
    StyledText,
    StyledView
} from "@/components/StyledComponents/StyledComponents";
import {ImageSourcePropType} from "react-native";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";

interface TipCardProps {
    title: string
    image: ImageSourcePropType
    id: string
    selectTipHandler: (idx: number) => void
    idx: number
}
export function TipCard({title, image, idx, selectTipHandler}: TipCardProps) {
    const toggleSheet = useBottomSheetStore(state => state.toggleSheet)
    const setSheetType = useBottomSheetStore(state => state.setSheetType)
    return (
        <StyledPressable className={'mx-2 w-32 h-36 rounded-xl items-stretch border-2 p-1 border-sky-500'} onPress={() => {
            selectTipHandler(idx)
            setSheetType('tipsInfo')
            toggleSheet()
        }}>
        <StyledImageBackground className={'w-full items-center justify-end flex-1 relative'} source={image} imageStyle={{
            resizeMode: 'cover',
            borderRadius: 8,
        }}>
            <StyledView className={'bg-black/40 absolute top-0 right-0 bottom-0 left-0 rounded-lg'}></StyledView>
                <StyledText className={'p-2 text-white font-bold'}>{title}</StyledText>
        </StyledImageBackground>
        </StyledPressable>
    );
}