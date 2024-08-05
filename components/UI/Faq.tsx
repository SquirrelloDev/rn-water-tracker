import {FaqQuestion} from "@/constants/faqQuestions";
import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {FlatList} from "react-native";
import {useCallback, useState} from "react";
import {FaqItem} from "@/components/UI/FaqItem";

interface FaqProps {
    data: FaqQuestion[]
}

export function Faq({data}: FaqProps) {
    const [selectedItem, setSelectedItem] = useState<number>(-1)
    const toggleItemHandler = useCallback((index: number) => {
        setSelectedItem(selectedItem === index ? -1 : index)
    }, [selectedItem])
    return (
        <StyledView>
            <FlatList data={data} renderItem={({item, index}) => <FaqItem isSelected={index === selectedItem} toggleItemHandler={toggleItemHandler} index={index} item={item} />} />
        </StyledView>
    );
}