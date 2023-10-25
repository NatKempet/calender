import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import "../Css/stylesweekly.css";

const WeeklyPage = ({ showDetailsHandle }: any) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonthHandle = (btnType: any) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType: any) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day: any, dayStr: any) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center text-white" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return (
      <div className="days row flex w-[75%] bg-orange-300 border-b-4 border-slate-600">
        {days}
      </div>
    );
  };
  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="border-1 flex bg-orange-300 justify-center content-center w-[75%] items-center p-2 px-5 h-[100px] border-y-4 border-slate-600">
        <div className="col col-start">
          <div
            className="icon text-white text-[25px] cursor-pointer"
            onClick={() => changeMonthHandle("prev")}
          >
            prev month
          </div>
        </div>
        <div className="col col-center text-white text-[25px]">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end text-white text-[25px] cursor-pointer">
          <Reveal>
            <div className="icon" onClick={() => changeMonthHandle("next")}>
              next month
            </div>
          </Reveal>
        </div>
      </div>
    );
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell border-l-4 border-zinc-400 h-[150px] text-[30px] flex justify-end hover:cursor-pointer ${
              isSameDay(day, new Date())
                ? "border-l-[10px] border-pink-500 bg-pink-100"
                : isSameDay(day, selectedDate)
                ? "border-l-[10px] border-blue-500 bg-blue-100"
                : ""
            }`}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <Reveal>
              <span className="number">{formattedDate}</span>
            </Reveal>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(<div className="row">{days}</div>);
      days = [];
    }
    return <div className="bg-white w-[75%] h-[150px]">{rows}</div>;
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center flex-col"
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </motion.div>
    </>
  );
};

export default WeeklyPage;
