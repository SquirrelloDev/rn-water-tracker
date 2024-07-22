import {CustomBottomSheet} from "@/components/FormSheets/CustomBottomSheet";
import {
    StyledImageBackground,
    StyledPressable,
    StyledText,
    StyledView
} from "@/components/StyledComponents/StyledComponents";
import {Tip} from "@/constants/tips";
import {useRef} from "react";
import BottomSheet, {BottomSheetModal} from "@gorhom/bottom-sheet";
import useSafeAreaStyle from "@/hooks/useSafeAreaStyle";
import {ImageBackground, ImageBackgroundProps} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";
import {styled} from "nativewind";
import {BlurView} from "expo-blur";

interface TipDetailsProps {
    tip: Tip
}
const StyledBlurView = styled(BlurView)
const StyledIcon = styled(Ionicons)
export function TipDetails({tip}: TipDetailsProps) {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const setSheetType = useBottomSheetStore(state => state.setSheetType)
    const toggleSheet = useBottomSheetStore(state => state.toggleSheet)
    return (
        <CustomBottomSheet ref={bottomSheetRef} snapPoints={['100%']} enableOverDrag={false} enableDynamicSizing={false} handleStyle={{
            display: 'none'
        }}>
            <StyledView className={'mt-0'}>
                <StyledImageBackground source={tip.imageName as ImageBackgroundProps} imageStyle={{
                    resizeMode: 'cover',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                }}
                className={'h-full justify-between'}>
                    <StyledPressable className={'m-10 mr-3 mt-12 self-end bg-white rounded-full w-12 h-12 items-center justify-center'} onPress={() =>{
                        setSheetType(null)
                        toggleSheet()
                    }}>
                        <StyledIcon name={'close'} className={'text-3xl'}/>
                    </StyledPressable>
                    <StyledBlurView intensity={65} tint={'dark'} className={'px-4 py-6 mb-14 mx-3 overflow-hidden rounded-xl'}>
                        <StyledText className={'text-xl font-bold text-white mb-3'}>{tip.title}</StyledText>
                        <StyledText className={'text-base text-white'}>{tip.description}</StyledText>
                    </StyledBlurView>
                </StyledImageBackground>
            </StyledView>
        </CustomBottomSheet>
    );
}