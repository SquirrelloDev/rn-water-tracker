import {StyledPressable, StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {FaqQuestion} from "@/constants/faqQuestions";
import {styled} from "nativewind";
import {Ionicons} from "@expo/vector-icons";
interface FaqItemProps {
    isSelected: boolean
    toggleItemHandler: (index: number) => void
    index: number
    item: FaqQuestion
}
const StyledIcon = styled(Ionicons)
export function FaqItem({isSelected, item, toggleItemHandler, index}:FaqItemProps) {
    return (
        <StyledView>
            <StyledPressable className={'px-3 py-4 flex-row justify-between items-center border-b border-neutral-400'} onPress={() => toggleItemHandler(index)}>
                <StyledText className={'dark:text-white text-lg w-72'}>{item.question}</StyledText>
                <StyledIcon name={isSelected ? 'chevron-up' : 'chevron-down'} className={'dark:text-white'} size={24}/>
            </StyledPressable>
            {
                isSelected && (
                    <StyledView className={'px-3 py-2 dark:bg-neutral-700'}>
                        <StyledText className={'dark:text-white text-base'}>{item.answer}</StyledText>
                    </StyledView>
                )
            }
        </StyledView>
    );
}