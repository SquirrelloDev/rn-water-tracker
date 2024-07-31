import {StyledView} from "@/components/StyledComponents/StyledComponents";
import {PropsWithChildren} from "react";
import clsx from "clsx";
interface CardProps extends PropsWithChildren {
    classNames?: string
}
export function Card({children, classNames}: CardProps) {
    return (
        <StyledView className={clsx('m-3 p-4 bg-white rounded-xl shadow-sm dark:bg-neutral-800', classNames)}>
            {children}
        </StyledView>
    );
}