import {StyledIcon, StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {useNavigation} from "@react-navigation/native";
import {StackNavigation} from "@/types/navigation";
import {SettingItemType} from "@/constants/settings";

interface SettingItemProps {
    item: SettingItemType
}

export function SettingItem({item}: SettingItemProps) {
    const navigation = useNavigation<StackNavigation>()
    return (
        <StyledPressable className={'flex-row items-center justify-between bg-white p-5 mx-4 my-1.5 rounded-xl border border-slate-300 dark:bg-neutral-800 dark:border-gray-600'}
                         onPress={() => navigation.navigate(item.route)}>
            <StyledView className={'flex-row items-center'}>
                {item.icon && <StyledIcon name={item.icon} size={20} className={'dark:text-white'}/> }
                <StyledText className={'text-lg ml-3 dark:text-white'}>{item.title}</StyledText>
            </StyledView>
            <StyledView className={'p-1 items-center justify-center bg-slate-300 rounded-full dark:bg-transparent'}>
                <StyledIcon name={'chevron-forward'} size={20} className={'dark:text-white'}/>
            </StyledView>
        </StyledPressable>
    );
}