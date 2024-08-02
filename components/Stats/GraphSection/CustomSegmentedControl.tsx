import SegmentedControl, {SegmentedControlProps} from "@react-native-segmented-control/segmented-control";
import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {useColorScheme} from "nativewind";
import COLORS from "@/constants/theme/colors";

interface CustomSegmentedControlProps extends SegmentedControlProps {

}

export function CustomSegmentedControl({...props}: CustomSegmentedControlProps) {
    const {colorScheme} = useColorScheme()
    return (
        <StyledView className={'mx-3'}>
            <StyledText className={'my-2 text-lg font-medium dark:text-white'}>Wybierz zakres podsumowania</StyledText>
            <SegmentedControl {...props} tintColor={COLORS[colorScheme].accent} appearance={colorScheme}/>
        </StyledView>
    );
}