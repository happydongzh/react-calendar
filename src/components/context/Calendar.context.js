import { createContext, useContext, useReducer } from "react";

import { VIEW_EVENT, VIEW_MODE, getYearHolidays } from "../../utils";

const updateDate = (type, date, forward_backward) => {
    switch (type) {
        case VIEW_MODE.year:
            date.setYear(date.getFullYear() + (forward_backward ? 1 : -1));
            break;
        case VIEW_MODE.month:
            date.setMonth(date.getMonth() + (forward_backward ? 1 : -1));
            break;
        case VIEW_MODE.week:
            date.setDate(date.getDate() + (forward_backward ? 7 : -7));
            break;
        case VIEW_MODE.day:
            date.setDate(date.getDate() + (forward_backward ? 1 : -1));
            break;
        default:
            date = new Date();
            break;
    }
    return date;
}
const changeDateReducer = (state, action) => {
    if (action.type === "DATE") {
        let tmp = { ...state };
        switch (action.dir) {
            case "FORWARD":
                tmp = { ...tmp, calenderDate: updateDate(state.viewMode, state.calenderDate, true) }
                break;
            case "BACKWARD":
                tmp = { ...tmp, calenderDate: updateDate(state.viewMode, state.calenderDate, false) };
                break;
            case "TODAY":
                tmp = { ...tmp, calenderDate: new Date() };
                break;
            default:
                break;
        }
        return tmp;
    }

    // if (action.type === "DATA") {
    // }
    if (action.type === "EVENT") {
        return { ...state, viewEvent: action.viewEvent };
    }
    return { ...state, viewMode: action.type }
};


const CalenderContext = createContext();
const CalendarContextProvider = ({ children }) => {
    const date = new Date();
    const [calenderDate, setCalenderDate] = useReducer(changeDateReducer, {
        viewMode: VIEW_MODE.year,
        calenderDate: date,
        today: date,
        viewEvent: "",
        calenderData: []
    });

    return <CalenderContext.Provider value={[calenderDate, setCalenderDate]}>
        {children}
    </CalenderContext.Provider>;
}

export const useCalender = () => {
    return useContext(CalenderContext);
}
export default CalendarContextProvider;
