import { add, differenceInDays, endOfMonth, format, getMonth, setDate, startOfMonth, sub } from "date-fns";
import Cell from "./Cell";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface props {
  value?: Date;
  onChange?: (value: Date) => void;
  events?: any;
}

const Calender: React.FC<props> = ({ value = new Date(), onChange, events }) => {
  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => onChange && onChange(sub(value, { months: 1 }));
  const nextMonth = () => onChange && onChange(add(value, { months: 1 }));
  const prevYear = () => onChange && onChange(sub(value, { years: 1 }));
  const nextYear = () => onChange && onChange(add(value, { years: 1 }));

  const handleDate = (index: number) =>{
    const date = setDate(value, index);
    onChange && onChange(date);
  };  
  return (
    <>
      <div className="w-[600px] border-t border-l">
        <div className="grid grid-cols-7 items-center justify-center text-center">
          <Cell onClick={prevYear}>{"<<"}</Cell>
          <Cell onClick={prevMonth}>{"<"}</Cell>
          <Cell className="col-span-3 text-[20px]">{format(value, 'LLLL yyyy')}</Cell>
          <Cell onClick={nextMonth}>{">"}</Cell>
          <Cell onClick={nextYear}>{">>"}</Cell>

          {daysOfWeek.map((day) => (
            <Cell key={day} className="font-bold">
              {day}
            </Cell>
          ))}

          {Array.from({ length: prefixDays }).map((_, index) => (
            <Cell key={index} />
          ))}

          {Array.from({ length: numDays }).map((_, index) => {
            const date = index + 1;
            const isCurrentDate = date === value.getDate();
            const isEvent = events.some((elements:any) => {
              return elements.Day == date && elements.Month - 1 == value.getMonth() && elements.Year == value.getFullYear();
            });
            return <Cell isActive = {isCurrentDate} onClick = {() => handleDate(date)} key={date} isEvent = {isEvent}>{date}</Cell>;
          })}

          {Array.from({ length: suffixDays }).map((_, index) => (
            <Cell key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Calender;
