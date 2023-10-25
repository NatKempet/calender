import React, { useState } from "react";
import "./components/Modal.css";
import { da } from "date-fns/locale";
import "./App";
import Reveal from "./components/Reveal";

const Modal = ({ closeModal, getData }: any) => {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [event, setEvent] = useState("");
  return (
    <div className="modalBackground">
      <Reveal>
      <div className="modalContainer">
        <div className="title">
          <h1 className="text-[30px] font-[700] text-white">Add Events</h1>
        </div>
        <br />
        <br />
        <input
          placeholder="day..."
          type="number"
          className="border-solid border-2 border-slate-800 focus:bg-slate-300 h-[50px] bg-gray-500 text-white"
          onChange={(e) => {
            setDay(parseInt(e.target.value));
          }}
        />
        <br />
        <br />
        <input
          placeholder="Month..."
          type="number"
          className="border-solid border-2 border-slate-800 focus:bg-slate-300 h-[50px] bg-gray-500 text-white"
          onChange={(e) => {
            setMonth(parseInt(e.target.value));
          }}
        />
        <br />
        <br />
        <input
          placeholder="Year..."
          type="number"
          className="border-solid border-2 border-slate-800 focus:bg-slate-300 h-[50px] bg-gray-500 text-white"
          onChange={(e) => {
            setYear(parseInt(e.target.value));
          }}
        />
        <br />
        <br />
        <input
          placeholder="Event title..."
          className="border-solid border-2 border-slate-800 focus:bg-slate-300 h-[50px] bg-gray-500 text-white"
          onChange={(e) => {
            setEvent(e.target.value);
          }}
        />
        <br />
        <br />
        <div className="footer">
          <button onClick={() => closeModal(false)}>cancel</button>
          <button
            onClick={() => {
              getData(day, month, year, event);
            }}
          >
            Add
          </button>
        </div>
      </div>
      </Reveal>
    </div>
  );
};

export default Modal;
