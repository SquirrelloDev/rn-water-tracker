import {StyledText, StyledView} from "@/components/StyledComponents/StyledComponents";
import {forwardRef, PropsWithChildren, useCallback, useEffect} from "react";
import clsx from "clsx";
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";

interface CustomBottomSheetProps extends PropsWithChildren {

}

export const CustomBottomSheet = forwardRef<BottomSheetModal, CustomBottomSheetProps>(({children}, ref) => {
    const toggleSheet = useBottomSheetStore(state => state.toggleSheet)
    const isSheetOpen = useBottomSheetStore(state => state.isSheetOpen)
    useEffect(() => {
        if(isSheetOpen){
            ref.current.present()
        }
    }, [isSheetOpen])
    const handleSheetChanges = useCallback((index: number) => {
        if(index === -1){
            toggleSheet()
        }
    }, [toggleSheet])
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