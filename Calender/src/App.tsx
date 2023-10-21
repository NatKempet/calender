import { format } from "date-fns";
import Calender from "./calender/Calender";
import { useState, useEffect } from "react";
import { db } from "./config/Firebase";
import { getDocs, collection, addDoc,deleteDoc,doc } from "firebase/firestore";
import Modal from "./Modal";

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([] as any);
  const eventsCollection = collection(db, "todo");
  const [openModal, setOpenModal] = useState(false);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [activity, setActivity] = useState("");
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

  const deleteEvents = async (id:any) => {
    const eventdoc = doc(db, "todo", id);
    await deleteDoc(eventdoc);
  };

  useEffect(() => {
    getEvents();
  }, [getEvents()]);

  const handleSetToday = () => setCurrentDate(new Date());

  const getData = async(day:any,month:any,year:any, event:any) =>{
    await addDoc(eventsCollection, {Day:day, Month:month, Year:year,Activity:event});

    getEvents();
  }

  return (
    <>
      {openModal && <Modal closeModal={setOpenModal} getData = {getData}/>}
      <div className="mt-32 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[19px]">
            Selected Date: {format(currentDate, "dd LLLL yyyy")}
          </p>
          <button
            className="px-4 py-1 rounded text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            onClick={handleSetToday}
          >
            Today
          </button>
        </div>
        <Calender value={currentDate} onChange={setCurrentDate} events={events}/>
        <div className="border w-[300px] flex flex-col divide-y divide-slate-700">
          <div
            className="flex justify-center hover:bg-gray-200 active:bg-gray-400 cursor-pointer"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <b className="text-[30px]">Add Events</b>
          </div>
          {events.map((index: any) => (
            <div className="flex flex-col items-center">
              <br />
              <h1 className="text-center text-[20px] font-[600]" key = {index.Day}>
                {index.Day} {Month[index.Month - 1]} {index.Year}
              </h1>
              <p className="text-center text-[15px]" key = {index.Activity}>{index.Activity}</p>
              <br />
              <button onClick={() => deleteEvents(index.id)} className="bg-rose-700 text-white rounded-lg">Delete Event</button>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
