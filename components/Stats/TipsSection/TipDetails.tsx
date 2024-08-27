import {CustomBottomSheet} from "@/components/FormSheets/CustomBottomSheet";
import {
    StyledIcon,
    StyledImageBackground,
    StyledPressable,
    StyledText,
    StyledView
} from "@/components/StyledComponents/StyledComponents";
import {Tip} from "@/constants/tips";
import {useRef} from "react";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {ImageSourcePropType} from "react-native";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";
import {styled, useColorScheme} from "nativewind";
import {BlurView} from "expo-blur";
import CustomButton from "@/components/UI/CustomButton";
import COLORS from "@/constants/theme/colors";

interface TipDetailsProps {
    tip: Tip
    navigateToNotifications: () => void
}
const StyledBlurView = styled(BlurView)
export function TipDetails({tip, navigateToNotifications}: TipDetailsProps) {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const setSheetType = useBottomSheetStore(state => state.setSheetType)
    const toggleSheet = useBottomSheetStore(state => state.toggleSheet)
    const {colorScheme} = useColorScheme()
    return (
        <CustomBottomSheet ref={bottomSheetRef} snapPoints={['100%']} enableOverDrag={false} enableDynamicSizing={false} handleStyle={{
            display: 'none'
        }}>
            <StyledView className={'mt-0'}>
                <StyledImageBackground source={tip.imageName as ImageSourcePropType} imageStyle={{
                    resizeMode: 'cover',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                }}
                className={'h-full justify-between'}>
                    <StyledPressable className={'m-10 mr-3 mt-12 self-end bg-white rounded-full w-12 h-12 items-center justify-center dark:bg-neutral-800'} onPress={() =>{
                        setSheetType(null)
                        toggleSheet()
                    }}>
                        <StyledIcon name={'close'} className={'text-3xl'} color={colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black}/>
                    </StyledPressable>
                    <StyledBlurView intensity={65} tint={'dark'} className={'px-4 py-6 mb-14 mx-3 overflow-hidden rounded-xl'}>
                        <StyledText className={'text-xl font-bold text-white mb-3'}>{tip.title}</StyledText>
                        <StyledText className={'text-base text-white'}>{tip.description}</StyledText>
                        {tip.isReminder && <CustomButton title={'Przejdź do ustawień'} onPress={navigateToNotifications} />}
                    </StyledBlurView>
                </StyledImageBackground>
            </StyledView>
        </CustomBottomSheet>
    );
}