import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CustomCheckbox from "../components/CheckBox";
import { Button } from "@/components/ui/button";
import downgray from "../assets/icons/downgray.png";
import closegray from "../assets/icons/closegray.png";
import check from "../assets/icons/check.png";
import upArrowDarkGray from "../assets/icons/upArrowDarkGray.png";
import { sendAMessage } from "@/API/sendData";

const Box = ({ checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`w-[18px] h-[18px] flex items-center justify-center border-[3px] border-[#707070] transition-colors ${
          checked ? "border-none" : "bg-white border-gray-400"
        }`}>
        {checked && (
          <img
            src={check}
            alt=""
            className="w-[18px] h-[18px] object-contain"
          />
        )}
      </div>
    </label>
  );
};

export default function Notification({ name, handleClose }) {
  console.log("name", name);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      to: name || "Jenny Wilson",
    };
    // console.log("Form Data:", formData);

    const res = sendAMessage(formData);

    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fafafa] bg-opacity-20">
      <div className="bg-white w-[600px] p-5 rounded-[8px] shadow-3xl">
        <div className="flex items-center justify-between mb-[32px]">
          <h2 className="text-[#00263E] text-[20px] font-Poppins font-semibold ">
            Send a message
          </h2>
          <img
            src={closegray}
            alt=""
            onClick={handleClose}
            className="w-[16px] h-[16px] object-contain cursor-pointer"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-medium text-[#00263E] mb-2">To</label>
            <div
              ref={dropdownRef}
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex justify-between items-center cursor-pointer border px-[16px] py-[14px] rounded-[8px]">
              <p>{name ? name : "Jenny Wilson"}</p>
              {isDropdownOpen === false ? (
                <img
                  src={downgray}
                  alt=""
                  className="w-[10px] h-[5px] object-contain cursor-pointer"
                />
              ) : (
                <img
                  src={upArrowDarkGray}
                  alt=""
                  className="w-[10px] h-[5px] object-contain cursor-pointer"
                />
              )}
            </div>
            {isDropdownOpen && (
              <div className="absolute bg-white shadow-3xl border rounded-[8px] w-[560px] px-[8px] py-[8px] mt-2 z-50">
                <div className="flex items-center gap-2 py-[8px] px-[14px] cursor-pointer rounded-[8px] hover:bg-[#fafafa]">
                  <Box />
                  <p>All the patients</p>
                </div>
                <div className="flex items-center gap-2 py-[8px] px-[14px] cursor-pointer rounded-[8px] hover:bg-[#fafafa]">
                  <Box />
                  <p>All the healthcare providers</p>
                </div>
                <div className="border my-[8px]" />
                <div className="flex items-center gap-2 py-[8px] px-[14px] cursor-pointer rounded-[8px] hover:bg-[#fafafa]">
                  <Box />
                  <p>{name ? name : "Jenny Wilson"}</p>
                </div>
              </div>
            )}
          </div>
          <div className="my-5">
            <label className="block font-medium text-[#00263E] mb-2">
              Subject
            </label>
            <input
              type="text"
              className="w-full text-[#455560] border px-4 py-[14px] rounded-[8px] outline-none"
              {...register("subject", { required: "Subject is required" })}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>
          <div className="my-5">
            <label className="block font-medium text-[#00263E] mb-2">
              Send via
            </label>
            <div className="flex items-center gap-4">
              <CustomCheckbox
                label="Push notification"
                checked={watch("pushNotification")}
                onChange={() =>
                  setValue("pushNotification", !watch("pushNotification"))
                }
              />
              <CustomCheckbox
                label="SMS"
                checked={watch("sms")}
                onChange={() => setValue("sms", !watch("sms"))}
              />
              <CustomCheckbox
                label="Email"
                checked={watch("email")}
                onChange={() => setValue("email", !watch("email"))}
              />
            </div>
          </div>
          <div className="my-5">
            <label className="block font-medium text-[#00263E] mb-2">
              Message
            </label>
            <textarea
              className="w-full bg-[#fafafa] text-[#455560] text-[14px] border rounded-[8px] px-[16px] py-[14px] outline-none"
              rows="4"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <div className="flex justify-start gap-2">
            <Button
              type="button"
              className="bg-white border-[#00263E] border rounded-[8px] text-[#00263E] font-medium"
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#00263E] font-medium rounded-[8px] text-white">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
