import SegmentedControl, {SegmentedControlProps} from "@react-native-segmented-control/segmented-control";
interface CustomSegmentedControlProps extends SegmentedControlProps{

}
export function CustomSegmentedControl({...props}: CustomSegmentedControlProps) {

    return (
        <SegmentedControl {...props}/>
    );
}