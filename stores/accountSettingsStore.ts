import {create} from "zustand";
interface AccountSettingsStore {
    isRequestPerformed: boolean
    setIsRequestPerformed: (value: boolean) => void
}
const useAccountSettingsStore = create<AccountSettingsStore>()((setState) => ({
    isRequestPerformed: false,
    setIsRequestPerformed: (value) => {
        setState({
            isRequestPerformed: value
        })
    }
    })
)
export default useAccountSettingsStore