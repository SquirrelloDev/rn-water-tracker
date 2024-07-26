import {create} from "zustand";
import {PersonalData} from "@/queries/user/edit";

interface PersonalDataStore {
    data: PersonalData
    setPersonalData: (data: PersonalData) => void
    clearPersonalData: () => void
}
const usePersonalDataStore = create<PersonalDataStore>()((setState, getState) => (
    {
        data: {weight: -1},
        setPersonalData: (data) => {
            setState((state) => {
                return {...state, data: {weight: data.weight}}
            })
        },
        clearPersonalData: () => {
            setState((state) => {
                return {...state, data: {weight: -1}}
            })
        }
    }
))
export default usePersonalDataStore