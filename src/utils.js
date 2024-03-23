import { HolidayUtil } from "lunar-javascript/lunar";

export const VIEW_MODE = { day: "DAY", week: "WEEK", month: "MONTH", year: "YEAR" };
export const VIEW_EVENT = { holiday: "HOLIDAY", personal: "PERSON", reminder: "REMAINDER" };
export const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DateFormaterOption = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
};

export const getDateFormatter = () => {
    return new Intl.DateTimeFormat("en-US", DateFormaterOption);
};

export const getYearHolidays = (year) => {
    const holidays = HolidayUtil.getHolidays(year);
    const convertor = (dmyArr) => `${dmyArr[1]}/${dmyArr[2]}/${dmyArr[0]}`;
    return holidays.map(x => {
        return { ...x._p, day: convertor(x._p.day.split("-")), target: convertor(x._p.target.split("-")) };
    });
}

// export function throttle(func, delay = 500) {
//     let timmer = null;
//     return (...args) => {
//         if (!timmer) {
//             timmer = setTimeout(() => {
//                 func(...args);
//                 timmer = null;
//             }, delay);
//         }
//     }
// }

// export const debounce = () => { };


