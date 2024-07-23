import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
interface SettingSectionHeaderProps {
    title: string
}
export function SettingSectionHeader({title}: SettingSectionHeaderProps) {
    return (
        <StyledView className={'px-4 py-2'}>
            <StyledText className={'text-xl font-bold'}>{title}</StyledText>
        </StyledView>
    );
}