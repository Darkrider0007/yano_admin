import React, { useState } from "react";

const ToggleButton = ({ on, toggle }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={on}
          //   name={name}
          onChange={toggle}
        />
        <div
          className={`w-[34px] h-[14px] rounded-[7px]  transition-colors duration-500 ${
            on ? "bg-[#76BC2161]" : "bg-[#ededed]"
          }`}
        ></div>
        <div
          className={` absolute w-[20px] h-[20px] bg-[#76BC21] rounded-full shadow -left-1 -top-[3px] transition-transform duration-500 ease-in-out transform ${
            on
              ? "translate-x-6 bg-[#76BC21]"
              : "translate-x-0 bg-white shadow-3xl"
          }`}
        ></div>
      </div>
    </label>
  );
};
// 76BC21 76BC21 76BC2161 76BC2161 background: #21212114;

export default ToggleButton;
