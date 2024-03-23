
import Day from "./Day";

import { VIEW_MODE, WEEK, MONTHS } from "../utils";
import { useCalender } from "./context/Calendar.context";
import Weekday from "./Week";

const Month = ({ month, days, weekday }) => {
    const state = useCalender();
    const numOfDays = parseInt(days[4].value);

    const daysElements = (length) => {
        const _calenderDate = new Date(state[0].calenderDate.getTime());
        _calenderDate.setMonth(MONTHS.indexOf(month));

        /**
         * 设置每月第一天和最后一天所在星期的上月和下月的生育日期
         *  如某月1号是星期4
         */
        const tmp = [];
        let count = WEEK.indexOf(weekday);
        _calenderDate.setDate(0);
        let dd = _calenderDate.getDate() - count;
        for (let w = 0; w < count; w++) {
            let _d = { date: (dd + w + 1) }
            tmp.push(<Day outOfMonth={true} day={_d} key={`daysOfprvMonth_${w}_prvMonth`} />);
        }

        /**
         * 设置当月天数和日期
         */
        _calenderDate.setTime(state[0].calenderDate.getTime());
        _calenderDate.setMonth(MONTHS.indexOf(month));
        for (let d = 1; d <= length; d++) {
            _calenderDate.setDate(d);
            tmp.push(<Day key={`${month}_day_${d}`} day={{ date: d }} id={_calenderDate.toLocaleDateString()} />);
        }

        let r = tmp.length % 7;
        if(r !== 0) {
            for (let w = 0; w < (7 - r); w++) {
                // tmp.push(<Day outOfMonth={false} day={{ date: w + 1 }} key={`daysOfNextMonth_${w+1}_nextMonth`} />);
                tmp.push(<Day outOfMonth={true} day={{ date: w + 1 }} key={`daysOfNetMonth_${w+1}_nextMonth`} />);
           }
        }

        return tmp;
    };
    const fullPageStyle = state[0].viewMode === VIEW_MODE.month ? "month-FullPage" : "";
    return <div className={fullPageStyle ? "month-container" : ""}>
        <div><h3>{month}</h3></div>
        <div className="weekday">
            <Weekday />
        </div>
        {
            (state[0].viewMode === VIEW_MODE.month) &&
            <div className={`month-fullPage`}>
                {daysElements(numOfDays).map(x => x)}
            </div>
        }
        {
            !(state[0].viewMode === VIEW_MODE.month) &&
            <div className={`month`}>
                {daysElements(numOfDays).map(x => x)}
            </div>
        }
    </div>;
}
export default Month;
