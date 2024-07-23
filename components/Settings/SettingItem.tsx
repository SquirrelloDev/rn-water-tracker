import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {useNavigation} from "@react-navigation/native";
import {StackNavigation} from "@/types/navigation";
import {SettingItemType} from "@/constants/settings";
import {styled} from "nativewind";
import {Ionicons} from "@expo/vector-icons";

interface SettingItemProps {
    item: SettingItemType
}

const StyledIcon = styled(Ionicons)

export function SettingItem({item}: SettingItemProps) {
    const navigation = useNavigation<StackNavigation>()
    return (
        <StyledPressable className={'flex-row items-center justify-between bg-white p-5 mx-4 my-1.5 rounded-xl border border-slate-300'}
                         onPress={() => navigation.navigate(item.route)}>
            <StyledView className={'flex-row items-center'}>
                <StyledIcon name={item.icon} size={20}/>
                <StyledText className={'text-lg ml-3'}>{item.title}</StyledText>
            </StyledView>
            <StyledView className={'p-1 items-center justify-center bg-slate-300 rounded-full'}>
                <StyledIcon name={'chevron-forward'} size={20}/>
            </StyledView>
        </StyledPressable>
    );
}