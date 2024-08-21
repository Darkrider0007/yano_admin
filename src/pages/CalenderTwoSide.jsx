import CalenderPicker from "@/components/CalenderDropdown";
import FilterDropdown from "@/components/FilterDropdown";
import { Calendar } from "@/components/ui/calendar";
import YearDropdown from "@/components/YearDropdown";
import CustomDropdown from "@/components/YearDropdown";
import React from "react";

function CalenderTwoSide({ handleSetDate }) {
  const months = [
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
  const countryList = [
    { label: "Mexico", value: "Mexico" },
    { label: "Brazil", value: "Brazil" },
    { label: "Venezuela", value: "Venezuela" },
    { label: "Colombia", value: "Colombia" },
  ];
  const handleCountryChange = (option) => {
    setCountry(option);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Set the selected date
  };
  return (
    // <div class="flex items-center justify-center w-full min-h-screen bg-gray-50">
    <div class="flex  bg-white shadow-lg rounded-xl">
      <div class="flex flex-col">
        <div className="flex">
          <div className="flex flex-col ">
            <Calendar customYear={100} onDayClick={handleDateChange} />
          </div>
          <div className="flex flex-col  ">
            <Calendar customYear={100} onDayClick={handleDateChange} />
          </div>
        </div>

        <div class="flex items-center justify-end px-6 py-4">
          <div class="flex items-center space-x-2">
            <button
              onClick={handleSetDate}
              class="px-4 py-2 text-[14px] rounded-[8px] text-[#19181A] bg-[#E5E9EB] outline-none">
              Cancel
            </button>
            <button
              onClick={handleSetDate}
              class="px-4 py-2 text-[14px] text-white bg-[#00263E] rounded-[8px]">
              Set Date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalenderTwoSide;
