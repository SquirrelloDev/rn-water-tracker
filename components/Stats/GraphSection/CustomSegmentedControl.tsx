import SegmentedControl, {SegmentedControlProps} from "@react-native-segmented-control/segmented-control";
import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";

interface CustomSegmentedControlProps extends SegmentedControlProps {

}

export function CustomSegmentedControl({...props}: CustomSegmentedControlProps) {

    return (
        <StyledView className={'mx-3'}>
            <StyledText className={'my-2 text-lg font-medium'}>Wybierz zakres podsumowania</StyledText>
            <SegmentedControl {...props}/>
        </StyledView>
    );
}