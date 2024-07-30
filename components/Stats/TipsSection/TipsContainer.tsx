import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {TipCard} from "@/components/Stats/TipsSection/TipCard";
import {FlatList, ImageSourcePropType} from "react-native";
import tips from "@/constants/tips";
import {TipDetails} from "@/components/Stats/TipsSection/TipDetails";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";
import {useCallback, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigation} from "@/types/navigation";
import appRoutes from "@/utils/routes";

export function TipsContainer() {
    const setSheetType = useBottomSheetStore(state => state.setSheetType)
    const toggleSheet = useBottomSheetStore(state => state.toggleSheet)
    const navigation = useNavigation<StackNavigation>()
    const sheetType = useBottomSheetStore(state => state.sheetType)
    const [tipIndex, setTipIndex] = useState<number>(0)
    const navigateToNotifications = useCallback(() => {
        setSheetType(null)
        toggleSheet()
        navigation.navigate(appRoutes.notifications)
    }, [setSheetType, toggleSheet, navigation])
    const selectTipHandler = useCallback((idx: number) => {
        setTipIndex(idx)
    }, [])
    return (
        <StyledView className={'flex-row items-center my-2'}>
            <FlatList horizontal showsHorizontalScrollIndicator={false} data={tips} keyExtractor={(item) => item.id}
                      renderItem={({item, index}) => <TipCard title={item.title} image={item.imageName as ImageSourcePropType} idx={index} selectTipHandler={selectTipHandler} id={item.id}/>}/>
            {sheetType === 'tipsInfo' && <TipDetails tip={tips[tipIndex]} navigateToNotifications={navigateToNotifications}/>}
        </StyledView>
    );
}