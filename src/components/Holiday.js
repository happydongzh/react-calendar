import { useState } from "react";
import { getYearHolidays } from "../utils";
import { useCalender } from "./context/Calendar.context";

import DayOfHoliday from "./DayOfHoliday";

const Holiday = () => {
    const [dataList, setDataList] = useState([]);
    const [toggles, setToggles] = useState({
        tglHoliday: false,
        tglLunar: false,
        tgleSolarTerms: false,
    });

    const calender = useCalender();

    const toggleEventHandler = (e) => {
        if (!toggles.tglHoliday) {
            const yearHoliday = getYearHolidays(calender[0].calenderDate.getFullYear());
            setDataList(yearHoliday);
        }
        setToggles(p => ({ ...p, tglHoliday: !p.tglHoliday }));
    }

    return <div className="left-holiday">
        <h3>Holiday</h3>
        <div>
            <ul>
                <li>

                    <label className="switch switch200">
                        <input type="checkbox" onChange={toggleEventHandler} checked={toggles.tglHoliday} />
                        <span className="slider slider200"></span>
                    </label>
                    <span>节假日</span>
                </li>
                <li>
                    <label className="switch switch200">
                        <input type="checkbox" />
                        <span className="slider slider200"></span>
                    </label>农历

                </li>
                <li>
                    <label className="switch switch200">
                        <input type="checkbox" />
                        <span className="slider slider200"></span>
                    </label>节气

                </li>
            </ul>
        </div>
        <div>
            <ul>
                {toggles.tglHoliday && dataList.map((h) => {
                    return <DayOfHoliday holiday={h}/>
                })}
            </ul>
        </div>
    </div>;
}

export default Holiday;
