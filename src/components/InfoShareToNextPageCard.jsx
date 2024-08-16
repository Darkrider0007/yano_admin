import React from "react";
import { Link } from "react-router-dom";

function InfoShareToNextPageCard({ title, text, img, onClick, state }) {
  return (
    <Link
      onClick={onClick}
      className=" w-[305px] h-[85px] bg-[#FFF] gap-[16px] border border-[#eee] flex items-center justify-between px-4 rounded-[8px] hover:shadow-3xl"
      state={state}>
      <div>
        <h1 className="text-[14px] font-semibold">{title}</h1>
        <p className="text-[#72849A] text-[13px]">{text}</p>
      </div>
      <div className="w-[48px] h-[48px] rounded-[50%] bg-[#76BC21] flex items-center justify-center">
        {img}
      </div>
    </Link>
  );
}

export default InfoShareToNextPageCard;
