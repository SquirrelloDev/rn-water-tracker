import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {Faq} from "@/components/UI/Faq";
import faqQuestions from "@/constants/faqQuestions";

export function FaqScreen() {
    return (
        <StyledView className={'flex-1 dark:bg-neutral-900'}>
            <StyledText className={'text-2xl p-3 font-bold dark:text-white text-center'}>FAQ - najczęściej zadawane pytania</StyledText>
            <Faq data={faqQuestions} />
        </StyledView>
    );
}