import {create} from "zustand";
import dayjs from "dayjs";

interface DateStore {
    selectedDate: string,
    setSelectedDate: (date: string) => void
}
const initializeState = () => {
    const year = dayjs().year()
    const month = dayjs().month() < 10 ? '0' + (dayjs().month() + 1) : dayjs().month() + 1
    const date = dayjs().date()
    return `${year}-${month}-${date}`
}
const useDateStore = create<DateStore>()((setState, getState) => (
    {
        selectedDate: initializeState(),
        setSelectedDate: (date) => {
            setState((state) => {
                return {...state, selectedDate: date}
            })
        }
    }
))
export default useDateStore