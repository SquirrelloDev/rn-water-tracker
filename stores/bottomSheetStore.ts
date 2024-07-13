import {create} from "zustand";
export type SheetType = 'create' | 'edit' | 'delete' | null
export interface BottomSheetStore {
    isSheetOpen: boolean
    sheetType: SheetType,
    selectedDrinkId: number | null
    setDrinkId: (id: number) => void
    clearDrinkId: () => void
    setSheetType: (type: SheetType) => void
    toggleSheet: () => void
}
export const useBottomSheetFormStore = create<BottomSheetStore>()((setState) => ({
    isSheetOpen: false,
    sheetType: null,
    selectedDrinkId: null,
    setDrinkId: (id) =>{
        setState(state => ({
            ...state, selectedDrinkId: id
        }))
    },
    clearDrinkId: () => {
        setState(state => ({
            ...state, selectedDrinkId: null
        }))
    },
    setSheetType: (type) =>{
        setState(state => ({
            ...state, sheetType: type
        }))
    },
    toggleSheet: () => {
        setState(state => ({
            ...state, isSheetOpen: !state.isSheetOpen
        }))
    }}))