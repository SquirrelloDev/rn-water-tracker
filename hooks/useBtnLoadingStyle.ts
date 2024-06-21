export default function useBtnLoadingStyle(variant: 'outline' | 'solid'){
    const loadingBgStyles = () => {
        if(variant === 'solid'){
            return 'bg-slate-400'
        }
        else{
            return 'border border-slate-400'
        }
    }
    const loadingTextStyles = () => {
        if(variant === 'solid'){
            return 'text-slate-200'
        }
        else {
            return 'text-slate-400'
        }
    }
    return {loadingBgStyles, loadingTextStyles}
}