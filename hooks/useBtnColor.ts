import {useMemo} from "react";

export default function useBtnColor(variant: 'outline' | 'solid', color: 'info' | 'warning' | 'danger') {
    const bgColorValues = useMemo(() => {
        if (variant === 'solid') {
            switch (color) {
                case "info":
                    return 'bg-blue-400'
                case "warning":
                    return 'bg-amber-400'
                case "danger":
                    return 'bg-red-500'
            }
        }
        else if (variant === 'outline') {
            switch (color) {
                case "info":
                    return 'border border-blue-400'
                case "warning":
                    return 'border border-amber-400'
                case "danger":
                    return 'border border-red-400'
            }
        }
    }, [variant, color])
    const textColorValues = useMemo(() => {
        if (variant === 'outline') {
            switch (color) {
                case "info":
                    return 'text-blue-400'
                case "warning":
                    return 'text-amber-500'
                case "danger":
                    return 'text-red-400'
            }
        }
        else if (variant === 'solid'){
            return 'text-white'
        }
    }, [variant, color])
    return {bgColorValues, textColorValues}
}