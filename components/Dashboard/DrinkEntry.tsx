import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {UserProgressEntry} from "@/types/progress";
import {IconButton} from "@/components/UI/IconButton";
import clsx from "clsx";

interface DrinkEntryProps {
    item: UserProgressEntry
    isExpanded: boolean
}

export function DrinkEntry({item, isExpanded}: DrinkEntryProps) {
    return (
        <StyledView className={'flex-row justify-between items-center mx-2 px-2 py-3'}>
            <StyledView>
                <StyledText className={'font-medium text-base'}>{item.drink.name}</StyledText>
                <StyledText className={'font-bold text-lg'}>{item.intake}ml</StyledText>
            </StyledView>
            <StyledView className={clsx('flex-row')}>
                <StyledText className={clsx('font-bold text-lg', isExpanded && 'mr-4')}>{item.time.substring(0, 5)}</StyledText>
                {
                    isExpanded && (
                        <>
                            <IconButton icon={'pencil-outline'} color={'#f2ab45'} size={24} classNames={'mr-3'}/>
                            <IconButton icon={'trash'} color={'#ff0000'} size={24} />
                        </>
                    )
                }
            </StyledView>
        </StyledView>
    )
}