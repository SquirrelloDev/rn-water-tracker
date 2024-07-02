import {forwardRef, PropsWithChildren, useCallback, useEffect} from "react";
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";

interface CustomBottomSheetProps extends PropsWithChildren {
    onDismiss?: () => void
}

export const CustomBottomSheet = forwardRef<BottomSheetModal, CustomBottomSheetProps>(({children, onDismiss}, ref) => {
    const toggleSheet = useBottomSheetStore(state => state.toggleSheet)
    const setSheetType = useBottomSheetStore(state => state.setSheetType)
    const isSheetOpen = useBottomSheetStore(state => state.isSheetOpen)
    useEffect(() => {
        if(isSheetOpen){
            ref.current.present()
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
    const renderBackdrop = useCallback((props) => {
        return <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>
    }, [])
    return (
        <BottomSheetModal ref={ref} snapPoints={['85%']} onChange={handleSheetChanges} backdropComponent={renderBackdrop}>
            <BottomSheetView>
				{children}
            </BottomSheetView>
        </BottomSheetModal>
    )
})