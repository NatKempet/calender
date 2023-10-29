import { useState, useEffect } from "react";
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
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import Modal from "../Modal";

const WeeklyPage = ({ showDetailsHandle }: any) => {
  const eventsCollection = collection(db, "todo");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([] as any);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
    setData(dayStr.split(" "));
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
      <div className="days row flex w-[75%] bg-orange-300 border-b-4 border-slate-600 bg-opacity-20">
        {days}
      </div>
    );
  };
  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="border-1 flex bg-orange-300 justify-center content-center w-[75%] items-center p-2 px-5 h-[100px] border-y-4 border-slate-600 bg-opacity-20">
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
          <div className="icon" onClick={() => changeMonthHandle("next")}>
            next month
          </div>
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
            className={`col cell border-l-2  h-[150px] text-[30px] flex justify-end hover:cursor-pointer border-b-4 border-r-2 bg-orange-300 bg-opacity-20 ${
              isSameDay(day, new Date())
                ? "border-l-[10px] border-pink-500 bg-pink-200 bg-opacity-20"
                : isSameDay(day, selectedDate)
                ? "border-l-[10px] border-blue-500 bg-blue-200 bg-opacity-20"
                : "border-zinc-400"
            }`}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc d MM yyyy");
              onDateClickHandle(cloneDay, dayStr);
              setOpenModal(true);
            }}
          >
            <Reveal>
              <span className="number text-white">{formattedDate}</span>
            </Reveal>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(<div className="row">{days}</div>);
      days = [];
    }
    return <div className="bg-transparent w-[75%] h-[150px]">{rows}</div>;
  };

  const renderFooter = () => {
    return (
      <div className="w-[75%] flex bg-orange-300 bg-opacity-20 h-[59px] items-center">
        <div className="col col-start">
          <div
            className="text-white cursor-pointer"
            onClick={() => changeWeekHandle("prev")}
          >
            prev week
          </div>
        </div>
        <div className="text-white">{currentWeek}</div>
        <div className="col col-end" onClick={() => changeWeekHandle("next")}>
          <div className="text-white cursor-pointer">next week</div>
        </div>
      </div>
    );
  };

  const getEvents = async () => {
    try {
      const data = await getDocs(eventsCollection);
      const filteredEvents = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(filteredEvents);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEvents = async (id: any) => {
    const eventdoc = doc(db, "todo", id);
    await deleteDoc(eventdoc);
  };
  useEffect(() => {
    getEvents();
  }, [getEvents()]);

  const getData = async (
    day: any,
    month: any,
    year: any,
    event: any,
    data?: any
  ) => {
    if (data == null) {
      await addDoc(eventsCollection, {
        Day: day,
        Month: month,
        Year: year,
        Activity: event,
      });
    } else {
      await addDoc(eventsCollection, {
        Day: data[1],
        Month: data[2],
        Year: data[3],
        Activity: event,
      });
    }

    getEvents();
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
        {openModal && (
          <Modal closeModal={setOpenModal} getData={getData} date={data} />
        )}
        {renderHeader()}
        {renderDays()}
        {renderCells()}
        {renderFooter()}
        <div className="text-white bg-lime-300 w-[25%] flex items-center justify-center bg-opacity-20 text-[25px] font-bold border-b">
          Events
        </div>
        {events.map((elements: any) => {
          return (
            <div className="text-white bg-lime-300 w-[25%] flex items-center justify-center bg-opacity-20 text-[25px] font-bold flex-col border-b">
              <div>
                {elements.Day} {Month[elements.Month - 1]} {elements.Year}
              </div>
              <div>{elements.Activity}</div>
              <Reveal>
                <button
                  onClick={() => deleteEvents(elements.id)}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded text-[10px]"
                >
                  Delete Event
                </button>
              </Reveal>
            </div>
          );
        })}
      </motion.div>
    </>
  );
};

export default WeeklyPage;
