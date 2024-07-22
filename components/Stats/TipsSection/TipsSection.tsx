import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {Card} from "@/components/UI/Card";
import {TipsContainer} from "@/components/Stats/TipsSection/TipsContainer";
import {Image} from "react-native";

export function TipsSection() {
    return (
        <StyledView className={'pb-14'}>
            <Card>
                <StyledText className={'font-bold text-xl'}>Porady</StyledText>
                <StyledText className={'text-sm text-slate-400'}>Zerknij na te porady, by lepiej się nawadniać</StyledText>
                <TipsContainer />
            </Card>
        </StyledView>
    );
}