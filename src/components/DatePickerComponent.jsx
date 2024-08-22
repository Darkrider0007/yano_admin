import React, { useState, useRef } from "react";
import SingleCalender from "./SingleCalender";

function DatePickerComponent({ currentDate, dateIconSrc, onDateChange }) {
  const [showCalender, setShowCalender] = useState(false);
  const iconRef = useRef(null);
  const calendarRef = useRef(null);

  const handleSetDate = (date) => {
    setShowCalender(false); // Close the calendar
    onDateChange(date); // Pass the selected date back to the parent component
  };

  return (
    <div className="inline-block">
      <img
        ref={iconRef}
        src={dateIconSrc}
        alt="Select Date"
        onClick={() => setShowCalender(!showCalender)}
        className="w-[16px] h-[16px] object-contain cursor-pointer"
      />

      {showCalender && (
        <div ref={calendarRef} className="absolute z-10 top-[180px] left-2">
          <SingleCalender
            currentDate={currentDate}
            handleSetDate={handleSetDate}
          />
        </div>
      )}
    </div>
  );
}

export default DatePickerComponent;
