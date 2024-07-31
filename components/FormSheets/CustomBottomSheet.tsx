import {forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useRef} from "react";
import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetProps,
    BottomSheetView
} from "@gorhom/bottom-sheet";
import {useBottomSheetStore} from "@/stores/bottomSheetStore";
import {useColorScheme} from "nativewind";
import COLORS from "@/constants/theme/colors";

interface CustomBottomSheetProps extends BottomSheetProps {
    onDismiss?: () => void
    children: ReactNode
}

export const CustomBottomSheet = forwardRef<BottomSheetModal, CustomBottomSheetProps>(({
                                                                                           children,
                                                                                           onDismiss,
                                                                                           snapPoints,
                                                                                           ...props
                                                                                       }, forwardedRef) => {
    const {colorScheme} = useColorScheme()
    const toggleSheet = useBottomSheetStore(state => state.toggleSheet)
    const setSheetType = useBottomSheetStore(state => state.setSheetType)
    const isSheetOpen = useBottomSheetStore(state => state.isSheetOpen)
    const ref = useRef<BottomSheetModal>(null)
    useImperativeHandle(forwardedRef, () => ref.current as BottomSheetModal, [])
    useEffect(() => {
        if (isSheetOpen) {
            ref.current?.present()
        }
    }, [isSheetOpen])
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
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
        <BottomSheetModal ref={ref} snapPoints={snapPoints ? snapPoints : ['85%']} onChange={handleSheetChanges}
                          backdropComponent={renderBackdrop} {...props} handleIndicatorStyle={{
            backgroundColor: colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black
        }} handleStyle={{
            backgroundColor: COLORS[colorScheme].primary,
            borderTopStartRadius: 12,
            borderTopEndRadius: 12
        }}>
            <BottomSheetView style={{flex: 1, backgroundColor: COLORS[colorScheme].primary}}>
                {children}
            </BottomSheetView>
        </BottomSheetModal>
    )
})