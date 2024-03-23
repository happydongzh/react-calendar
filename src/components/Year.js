import Month from "./Month";

import { useCalender } from "./context/Calendar.context";

import { DateFormaterOption } from "../utils";

const Year = () => {
    const state = useCalender();
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const dateFormater = new Intl.DateTimeFormat("en-US", DateFormaterOption);
    // const fmtArrayObj = dateFormater.formatToParts(month);
    return <>
        <div className="year-container">
            <div className="year">
                {
                    months.map(m => {
                        let dt = new Date(state[0].calenderDate.getTime());
                        dt.setMonth(m);
                        //month info
                        const mm = dateFormater.formatToParts(dt);

                        //the weekday of the 1st day of this month
                        dt.setDate(1);
                        const wkd = dateFormater.formatToParts(dt);

                        //number of days in this month
                        dt.setMonth(m + 1);
                        dt.setDate(0);
                        const dd = dateFormater.formatToParts(dt);
                        return <Month
                            key={`${mm[2].value}_month`}
                            month={mm[2].value}
                            days={dd}
                            weekday={wkd[0].value}
                        />
                    })
                }
            </div>
        </div>
    </>;
}

export default Year;