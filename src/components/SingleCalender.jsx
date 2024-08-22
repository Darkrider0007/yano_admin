import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "./ui/calendar";

function SingleCalender({ currentDate, handleSetDate }) {
  const calendarRef = useRef(null); // Define the calendarRef here
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
  const [selectedDay, setSelectedDay] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date); // Set the selected date
    setSelectedDay(date); // Set the selected date
  };

  return (
    <div
      ref={calendarRef}
      className="absolute left-[500px] top-[150px] border-2 flex w-[340px] bg-white pt-4 shadow-lg rounded-xl">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col w-full items-center justify-center pr-1 ">
          <Calendar
            customYear={100}
            selectedDateFromCalender={currentDate}
            onDayClick={handleDateChange}
          />
        </div>
        <div className="flex items-center justify-center px-6 py-6">
          <div className="flex items-center justify-center w-full gap-2 pb-2">
            <button
              onClick={() => handleSetDate(selectedDate)}
              className="px-11 py-2 text-[14px] rounded-[8px] text-darkblue font-semibold bg-[#E5E9EB] outline-none">
              Cancel
            </button>
            <button
              onClick={() => handleSetDate(selectedDate)}
              className="px-10 py-2 text-[14px] text-white bg-[#00263E] rounded-[8px]">
              Set Date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCalender;
