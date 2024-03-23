import { useEffect, useRef } from "react";
import { VIEW_MODE } from "../utils";
import { useCalender } from "./context/Calendar.context";

const Day = ({ day, id, outOfMonth }) => {
    const state = useCalender();
    const hourDiv = useRef(null);
    const timmerDiv = useRef(null);

    useEffect(() => {
        let pixUnit = 0;
        if (hourDiv.current && timmerDiv.current) {
            const minutes = (state[0].calenderDate.getHours() * 60 + state[0].calenderDate.getMinutes());
            console.log(minutes);
            pixUnit = (hourDiv.current.children[0].children[0].offsetHeight / 60);
            console.log(pixUnit);
            timmerDiv.current.style.top = `${minutes * pixUnit + 26}px`;
        }

        let interval = setInterval(() => {
            console.log("moving clock.....", pixUnit);
            if (hourDiv.current && timmerDiv.current) {
                let currentTop = parseInt(timmerDiv.current.style.top.replace("px", "")) + pixUnit;
                if (currentTop > (hourDiv.current.offsetHeight)) {
                    currentTop = 10;
                }
                timmerDiv.current.style.top = `${currentTop}px`;
            }

        }, 60000);

        return () => {
            clearInterval(interval);
        }
    }, [state[0].viewMode]);

    const createTime = () => {
        let hours = [];
        for (let h = 0; h <= 23; h++) {
            hours.push(<div key={`div_daytime_${h}`}>
                <div key={`daytime_${h}`}>{h < 10 ? `0${h}:00` : `${h}:00`}</div>
            </div>);
        }
        return hours;
    };

    let hoursElements = null;

    if (state[0].viewMode === VIEW_MODE.day || state[0].viewMode === VIEW_MODE.week) {
        hoursElements = createTime();
        return <div className="wd-container" id={id}>
            <div>
                {state[0].viewMode === VIEW_MODE.day && <h3>{day.weekday}</h3>}
                {state[0].viewMode === VIEW_MODE.week && <h5>{day.weekday}</h5>}
            </div>
            <div className="daily-hours">
                {
                    id === state[0].today.toLocaleDateString() &&
                    <div ref={timmerDiv} className="timmer">
                        {state[0].viewMode === VIEW_MODE.day && <div></div>}
                    </div>
                }
                <div className="hours">
                    <div ref={hourDiv}>{hoursElements}</div>
                </div>
            </div>
        </div>;
    }

    if (id === state[0].today.toLocaleDateString()) {
        return <div id={id} className="highlight"><h5>{day.date}</h5></div>
    }
    return outOfMonth ? <div className="outOfMonth" id={id}><h5>{day.date}</h5></div> : <div id={id}><h5>{day.date}</h5></div>;
}

export default Day;
