import { Calendar } from "@/components/ui/calendar";
import React from "react";

function CalenderTwoSide({ handleSetDate }) {
  const [firstDate, setFirstDate] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const firstHandleDateChange = (date) => {
    setFirstDate(date);
  };

  const secondHandleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSetDateClick = () => {
    handleSetDate(firstDate, selectedDate);
  };

  return (
    <div className="flex bg-white shadow-lg rounded-xl py-6 border-2">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col px-7">
            <Calendar customYear={100} onDayClick={firstHandleDateChange} />
          </div>
          <div className="border-l-2 flex px-7 flex-col">
            <Calendar customYear={100} onDayClick={secondHandleDateChange} />
          </div>
        </div>

        <div className="flex items-center justify-end px-6 pt-6 pb-0">
          <div className="flex items-center gap-x-2">
            <button
              onClick={handleSetDate}
              className="px-4 py-2 text-[14px] rounded-[8px] text-[#19181A] bg-[#E5E9EB] outline-none">
              Cancel
            </button>
            <button
              onClick={handleSetDateClick}
              className="px-4 py-2 text-[14px] text-white bg-[#00263E] rounded-[8px]">
              Set Date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalenderTwoSide;
