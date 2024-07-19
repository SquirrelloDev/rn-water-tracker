import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {PropsWithChildren} from "react";
interface CardProps extends PropsWithChildren {

}
export function Card({children}: CardProps) {
    return (
        <StyledView className={'m-3 p-4 bg-white rounded-xl shadow-sm'}>
            {children}
        </StyledView>
    );
}