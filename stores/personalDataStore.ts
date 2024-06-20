import {create} from "zustand";
import {PersonalData} from "@/components/Auth/SignUpPersonalForm";

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
                return {...state, data}
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