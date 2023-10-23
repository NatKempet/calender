import { format } from "date-fns";
import Calender from "../calender/Calender";
import { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Modal from "../Modal";
import downArrow from "../pictures/61932.png";
import upArrow from "../pictures/56841.png";
import { motion } from "framer-motion";

const CalenderPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([] as any);
  const eventsCollection = collection(db, "todo");
  const [openModal, setOpenModal] = useState(false);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [activity, setActivity] = useState("");
  const [selected, setSelected] = useState(false);
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
    document.body.style.backgroundColor = "#f1ecff";
    getEvents();
  }, [getEvents()]);

  const handleSetToday = () => setCurrentDate(new Date());

  const getData = async (day: any, month: any, year: any, event: any) => {
    await addDoc(eventsCollection, {
      Day: day,
      Month: month,
      Year: year,
      Activity: event,
    });

    getEvents();
  };
  const toggle = () => {
    if (selected == false) {
      return setSelected(true);
    }
    return setSelected(false);
  };
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth,transition:{duration: 0.7} }}
    >
      {openModal && <Modal closeModal={setOpenModal} getData={getData} />}
      <div className="mt-32 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[25px] text-white">
            Selected Date: {format(currentDate, "dd LLLL yyyy")}
          </p>
          <div>
            {events.map((elements: any) => {
              if (
                elements.Day == currentDate.getDate() &&
                elements.Month == currentDate.getMonth() + 1 &&
                elements.Year == currentDate.getFullYear()
              ) {
                return (
                  <p className="font-bold text-[25px] text-white">
                    {elements.Activity}{" "}
                  </p>
                );
              } else {
                return null;
              }
            })}
          </div>
          <button
            className="px-4 py-1 rounded text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            onClick={handleSetToday}
          >
            Today
          </button>
        </div>
        <Calender
          value={currentDate}
          onChange={setCurrentDate}
          events={events}
        />
        <div className="border w-[300px] flex flex-col divide-y divide-slate-700">
          <div
            className="flex justify-center hover:bg-gray-200 active:bg-gray-400 cursor-pointer"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <b className="text-[30px] text-white">Add Events</b>
          </div>
          <div
            className="grid justify-items-center hover:bg-gray-200 active:bg-gray-400 cursor-pointer"
            onClick={() => toggle()}
          >
            <img
              src={selected == true ? upArrow : downArrow}
              className="h-8 w-30"
            />
          </div>
          {events.map((index: any) =>
            selected == true ? (
              <div className="flex flex-col items-center">
                <br />
                <h1
                  className="text-center text-[20px] font-[600] text-white"
                  key={index.Day}
                >
                  {index.Day} {Month[index.Month - 1]} {index.Year}
                </h1>
                <p
                  className="text-center text-[15px] text-white"
                  key={index.Activity}
                >
                  {index.Activity}
                </p>
                <br />
                <button
                  onClick={() => deleteEvents(index.id)}
                  className="bg-rose-700 text-white rounded-lg"
                >
                  Delete Event
                </button>
                <br />
              </div>
            ) : null
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CalenderPage;
