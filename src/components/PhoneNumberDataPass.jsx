import React, { useState } from "react";
import CountryDropdown from "./CountryDropdown";
import CountryDropdownData from "./CountryDropDownData";

const PhoneFormDataPass = ({ label, name, value, countryCode = "IN" }) => {
  const [selectedCode, setSelectedCode] = useState("+52"); // default to Mexico

  const handleSelectCode = (code) => {
    setSelectedCode(code);
  };

  return (
    <div className="mb-4 mt-4 ">
      <label
        className="block text-sm text-[#00263E] font-medium"
        htmlFor={name}>
        {label}
      </label>
      <div className="mt-1 flex gap-5 rounded-md shadow-sm">
        <CountryDropdownData
          onSelect={handleSelectCode}
          countryCode={countryCode}
        />
        <input
          type="text"
          value={value}
          name={name}
          id={name}
          className="h-[50px] outline-none border bg-[#fafafa] flex-1 block w-full rounded-[6px] px-[16px] sm:text-sm border-gray-300"
        />
      </div>
    </div>
  );
};

export default PhoneFormDataPass;
