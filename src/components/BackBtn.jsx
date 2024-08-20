import React from "react";
import { Link, useNavigate } from "react-router-dom";
import back from "../assets/icons/back.png";

function BackBtn() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Link
      onClick={handleGoBack}
      className="w-[92px] h-[40px] flex justify-center items-center bg-[#fff] my-3 gap-2 rounded-[8px]">
      <img src={back} alt="" className="w-[16px] h-[16px] object-contain" />
      <p className="text-[#455560] text-[14px] font-medium leading-[20px] tracking-[0.2px] text-left font-poppins">
        Back
      </p>
    </Link>
  );
}

export default BackBtn;
