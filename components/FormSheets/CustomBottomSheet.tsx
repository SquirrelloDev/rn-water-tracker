import {forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useRef} from "react";
import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetProps,
    BottomSheetView
} from "@gorhom/bottom-sheet";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";

interface CustomBottomSheetProps extends BottomSheetProps{
    onDismiss?: () => void
    children: ReactNode
}

export const CustomBottomSheet = forwardRef<BottomSheetModal, CustomBottomSheetProps>(({children, onDismiss, snapPoints, ...props}, forwardedRef) => {
    const toggleSheet = useBottomSheetStore(state => state.toggleSheet)
    const setSheetType = useBottomSheetStore(state => state.setSheetType)
    const isSheetOpen = useBottomSheetStore(state => state.isSheetOpen)
    const ref = useRef<BottomSheetModal>(null)
    useImperativeHandle(forwardedRef, () => ref.current as BottomSheetModal, [])
    useEffect(() => {
        if(isSheetOpen){
            ref.current?.present()
        }
    }, [isSheetOpen])
    const handleSheetChanges = useCallback((index: number) => {
        if(index === -1){
            setSheetType(null)
            toggleSheet()
            if (onDismiss) {
                onDismiss()
            }
        }
    }, [setSheetType, toggleSheet, onDismiss])
    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
        return <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>
    }, [])
    return (
        <BottomSheetModal ref={ref} snapPoints={snapPoints ? snapPoints : ['85%']} onChange={handleSheetChanges} backdropComponent={renderBackdrop} {...props}>
            <BottomSheetView>
				{children}
            </BottomSheetView>
        </BottomSheetModal>
    )
})