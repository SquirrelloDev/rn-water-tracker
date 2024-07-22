import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {TipCard} from "@/components/Stats/TipsSection/TipCard";
import {FlatList } from "react-native";
import tips from "@/constants/tips";
import {TipDetails} from "@/components/Stats/TipsSection/TipDetails";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";

export function TipsContainer() {
    const sheetType = useBottomSheetStore(state => state.sheetType)
    return (
        <StyledView className={'flex-row items-center my-2'}>
            <FlatList horizontal showsHorizontalScrollIndicator={false} data={tips} keyExtractor={(item) => item.id}
                      renderItem={({item}) => <TipCard title={item.title} image={item.imageName} id={item.id}/>}/>
            {sheetType === 'tipsInfo' && <TipDetails tip={tips[0]}/>}
        </StyledView>
    );
}