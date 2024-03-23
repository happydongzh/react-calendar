
import { WEEK, VIEW_MODE } from "../utils";
import Day from "./Day";
import { useCalender } from "./context/Calendar.context";

const Weekday = ({ dateInfo }) => {
    const state = useCalender();
    if (state[0].viewMode === VIEW_MODE.month || state[0].viewMode === VIEW_MODE.year) {
        return WEEK.map((wd) => {
            let _data = { date: wd };
            if (state[0].viewMode === VIEW_MODE.year) {
                _data.date = wd.charAt(0);
            }
            return <Day key={`year_month_${wd}`} day={_data} />
        })
    }

    //获取当前日期所在周的周一日期
    const start = new Date(state[0].calenderDate.getTime());
    const x = WEEK.indexOf(dateInfo[0].value);
    start.setDate(start.getDate() - x - 1);

    return <div className="wd-container">
        <div><h3>{dateInfo[2].value}</h3></div>
        <div className="weekday">
            {WEEK.map((wd) => {
                start.setDate(start.getDate() + 1);
                return <Day id={start.toLocaleDateString()} key={`${wd}_${dateInfo[0].value}`}
                    day={{
                        weekday: wd,
                        date: `${dateInfo[4].value} - ${dateInfo[2].value}`,
                    }}

                />
            })}
        </div>
    </div>;

};
export default Weekday;