import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Sidebar from "@/components/Sidebar";
import { CiLock } from "react-icons/ci";
import check from "../assets/icons/check.png";
import password from "../assets/icons/password.png";
import closegreen from "../assets/icons/closegreen.png";
import BackBtn from "@/components/BackBtn";
import { useSelector } from "react-redux";
import { changePassword } from "@/API/sendData";
import { Loader2 } from "lucide-react";

function ChangePassword() {
  const [showold, setShowold] = useState(false);
  const [shownew, setShownew] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(true);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const userData = useSelector((state) => state.auth.user);

  console.log("User Data:");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSaveClicked(true);
    try {
      const res = await changePassword(userData?.userData._id, data);

      if (res) setIsSave(true);
    } catch (error) {
      setIsSave(true);
      console.error("Error changing password:", error);
      setError(true);
    } finally {
      setIsSaveClicked(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex">
      <Sidebar />
      <div className=" ml-[32px] mt-[32px]">
        <BackBtn />
        <div
          className={`items-center justify-between rounded-[8px] px-[20px] py-[16px] w-[626px] my-[24px] font-medium ${
            isSave ? "flex" : "hidden"
          } ${
            !error
              ? "text-[#155724] bg-[#C3E6CB]" // Green for success
              : "text-[#721c24] bg-[#f8d7da]" // Red for error
          }`}>
          <div className="flex flex-row gap-5">
            {!error && (
              <img
                src={!error ? check : closegreen} // Icon changes based on success/error
                alt=""
                className="w-[24px] h-[24px] object-contain"
              />
            )}
            <p className="">
              {!error
                ? "Password changed successfully"
                : "Error changing password"}
            </p>
          </div>
          <img
            src={closegreen}
            onClick={() => {
              setIsSave(false);
            }}
            alt=""
            className={`w-[24px] h-[24px] object-contain cursor-pointer ${
              error ? "filter invert sepia saturate-200 hue-rotate-180" : ""
            }`}
          />
        </div>

        <div className="h-[347px] w-[626px] bg-[#fff] p-[20px] rounded-[8px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-[#00263E] text-3xl font-semibold">
              Change Password
            </h1>

            <p className="text-[#00263E] text-[14px] mt-[20px]">
              Current Password
            </p>
            <div className="flex items-center h-[49px] border border-[#DADCE0] bg-[#fafafa] px-[16px] py-[16px] rounded-[8px] focus-within:border-green-500">
              <img
                src={password}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
              <input
                type={showold ? "text" : "password"}
                {...register("oldPassword", {
                  required: "Current Password is required",
                })}
                className="flex-1 outline-none px-2 bg-transparent"
              />
              <Link
                className="text-[#72849A80] text-[12px]"
                onClick={() => setShowold(!showold)}>
                {showold ? "HIDE" : "SHOW"}
              </Link>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.oldPassword.message}
              </p>
            )}

            <p className="text-[#00263E] text-[14px] mt-[20px]">New Password</p>
            <div className="flex items-center h-[49px] border border-[#DADCE0] bg-[#fafafa] px-[16px] py-[16px] rounded-[8px] focus-within:border-green-500">
              <img
                src={password}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
              <input
                type={shownew ? "text" : "password"}
                {...register("newPassword", {
                  required: "New Password is required",
                })}
                className="flex-1 outline-none px-2 bg-transparent"
              />
              <Link
                className="text-[#72849A80] text-[12px]"
                onClick={() => setShownew(!shownew)}>
                {shownew ? "HIDE" : "SHOW"}
              </Link>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSaveClicked}
              className="w-[83px] h-[45px] bg-[#00263E] text-[#fff] rounded-[8px] mt-[25px]">
              {isSaveClicked ? (
                <div className="flex flex-row items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                </div>
              ) : (
                "Save"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
