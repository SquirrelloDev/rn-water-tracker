import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {TipCard} from "@/components/Stats/TipsSection/TipCard";
import {FlatList } from "react-native";
import tips from "@/constants/tips";

export function TipsContainer() {
    return (
        <StyledView className={'flex-row items-center my-2'}>
            <FlatList horizontal showsHorizontalScrollIndicator={false} data={tips} keyExtractor={(item) => item.id}
                      renderItem={({item}) => <TipCard title={item.title} image={item.imageName}/>}/>
        </StyledView>
    );
}