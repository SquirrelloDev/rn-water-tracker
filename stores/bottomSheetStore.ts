import {create} from "zustand";
interface BottomSheetStore {
    isSheetOpen: boolean
    sheetType: 'create' | 'edit' | null,
    toggleSheet: () => void
}
export const useBottomSheetStore = create<BottomSheetStore>()((setState) => ({
    isSheetOpen: false,
    sheetType: null,
    toggleSheet: () => {
        setState(state => ({
            ...state, isSheetOpen: !state.isSheetOpen
        }))
    }}))