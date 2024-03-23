
import { useState } from "react";
import Year from "../Year";
import Day from "../Day";
import Month from "../Month";
import { VIEW_MODE, getDateFormatter, VIEW_EVENT, getYearHolidays } from "../../utils";
import { useCalender } from "../context/Calendar.context";
import Weekday from "../Week";
import Holiday from "../Holiday";
import Person from "../Person";
import Reminder from "../Reminder";

const Layout = () => {
    const state = useCalender();

    const [showSidePanel, setShowSidePanel] = useState(false);

    let leftSidePanel = null;
    switch (state[0].viewEvent) {
        case VIEW_EVENT.holiday:
            leftSidePanel = <Holiday />
            break;

        case VIEW_EVENT.personal:
            leftSidePanel = <Person />
            break;
        case VIEW_EVENT.reminder:
            leftSidePanel = <Reminder />
            break;
        default:
            leftSidePanel = null;
            break;
    }

    let calender = <Year />;
    let dt = new Date(state[0].calenderDate.getTime());
    const dateFormater = getDateFormatter();
    const mm = dateFormater.formatToParts(dt);
    switch (state[0].viewMode) {
        case VIEW_MODE.month:
            //the weekday of the 1st day of this month
            dt.setDate(1);
            const wkd = dateFormater.formatToParts(dt);

            //number of days in this month
            dt.setMonth(dt.getMonth() + 1);
            dt.setDate(0);
            const dd = dateFormater.formatToParts(dt);

            calender = <Month month={mm[2].value} days={dd} weekday={wkd[0].value} />;
            break;
        case VIEW_MODE.week:
            calender = <Weekday dateInfo={mm} />
            break;
        case VIEW_MODE.day:
            // calender = <><div style={{ backgroundColor: "#3c3c3c" }}><h3>{`${mm[0].value} ${mm[2].value} ${mm[4].value}`}</h3></div><Day /></>;
            let _day = {
                weekday: `${mm[0].value} ${mm[4].value} - ${mm[2].value}`,
                date: `${mm[4].value} - ${mm[2].value}`,
            };
            calender = <Day day={_day} id={state[0].calenderDate.toLocaleDateString()} />;
            break;
        default:
            <div>UNKNOW</div>
            break;
    }
    const gridTemplateColumns = { gridTemplateColumns: `${showSidePanel ? "20%" : 0} auto` };

    const toggleSidePanel = (evt) => {
        if (evt === state[0].viewEvent) {
            setShowSidePanel(false);
            state[1]({ type: "EVENT", viewEvent: "" });    
            return;
        }
        setShowSidePanel(true);
        state[1]({ type: "EVENT", viewEvent: evt });  
    };

    return <>
        <div className="MainLayout" style={gridTemplateColumns}>
            <div className="left">
                {leftSidePanel}
            </div>
            {/* <div className="split" draggable onDragStart={splitDragStart} onDragEnd={splitDrop}></div> */}
            <div className="right">
                <div className="top-bar">
                    <div className="view-mode">
                        <button className={state[0].viewEvent === VIEW_EVENT.holiday ? 'highlight' : ''} onClick={() => {
                            toggleSidePanel(VIEW_EVENT.holiday);
                        }}>🎉</button>
                        <button className={state[0].viewEvent === VIEW_EVENT.personal ? 'highlight' : ''} onClick={() => {
                            toggleSidePanel(VIEW_EVENT.personal)
                        }}>📥</button>
                        <button className={state[0].viewEvent === VIEW_EVENT.reminder ? 'highlight' : ''} onClick={() => {
                            toggleSidePanel(VIEW_EVENT.reminder);
                        }}>❖</button>
                        <button>✚</button>
                    </div>
                    <div><h2>{state[0].calenderDate.getFullYear()}</h2></div>
                    <div className="view-mode">
                        <button onClick={() => {
                            state[1]({ type: VIEW_MODE.day });
                        }} className={state[0].viewMode === VIEW_MODE.day ? 'highlight' : ''}>Day</button>
                        <button onClick={() => {
                            state[1]({ type: VIEW_MODE.week });
                        }} className={state[0].viewMode === VIEW_MODE.week ? 'highlight' : ''}>Week</button>
                        <button onClick={() => {
                            state[1]({ type: VIEW_MODE.month });
                        }} className={state[0].viewMode === VIEW_MODE.month ? 'highlight' : ''}>Month</button>
                        <button onClick={() => {
                            state[1]({ type: VIEW_MODE.year });
                        }} className={state[0].viewMode === VIEW_MODE.year ? 'highlight' : ''}>Year</button>
                    </div>
                    <div className="view-mode">
                        <button onClick={() => {
                            state[1]({ type: "DATE", dir: "BACKWARD" });
                        }}>←</button>
                        <button onClick={() => {
                            state[1]({ type: "DATE", dir: "TODAY" });
                        }}>Today</button>
                        <button onClick={() => {
                            state[1]({ type: "DATE", dir: "FORWARD" });
                        }}>→</button>
                    </div>
                </div>
                {calender}
            </div>
        </div>
    </>;
}

export default Layout;
