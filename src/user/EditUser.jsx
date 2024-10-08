import Sidebar from "@/components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import PhoneFormDataPass from "@/components/PhoneNumberDataPass";
import BackBtn from "@/components/BackBtn";
import date from "../assets/icons/date.png";
import password from "../assets/icons/password.png";
import closegreen from "../assets/icons/closegreen.png";
import countryRev from "../assets/countryRev.json";
import SingleCalender from "@/components/SingleCalender";
import { Calendar } from "@/components/ui/calendar";
import DatePickerComponent from "@/components/DatePickerComponent";
import { formatDateInNew } from "@/helpers/farmatDate";

function EditUser() {
  const [show, setShow] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [country, setCountry] = useState("India");
  const [selectedRole, setSelectedRole] = useState("");
  const [showCalender, setShowCalender] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const location = useLocation();
  const { userID } = useParams();

  // console.log("userID", userID);

  const data1 = location.state?.user;

  const [data, setData] = useState(data1);

  // console.log("data", data);

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const formattedDate = date.toISOString().split("T")[0];
  //   return formattedDate;
  // };

  const handleInputs = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsSave(true);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  // const [dateOfBirth, setDateOfBirth] = useState(null);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  const handleDateChange = (date) => {
    setDateOfBirth(formatDateInNew(formatDate(date))); // Update the state with the selected date
  };

  const iconRef = useRef(null);
  const calendarRef = useRef(null);

  const handleSetDate = (date) => {
    setShowCalender(false); // Close the calendar
    onDateChange(date); // Pass the selected date back to the parent component
  };

  useEffect(() => {
    if (data?.userType === "doctor") {
      setSelectedRole("provider");
    } else {
      setSelectedRole("patient");
    }
    setCountry(data?.country);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mx-[32px] mt-[32px]">
        <BackBtn />
        <div
          className={` items-center justify-between rounded-[8px] px-[20px] py-[16px] w-[626px] text-[#155724] my-[24px] font-medium bg-[#C3E6CB] ${
            isSave ? "flex" : "hidden"
          }`}>
          <p>The user's password has been successfully changed.</p>
          <img
            onClick={() => {
              setIsSave(false);
            }}
            src={closegreen}
            alt=""
            className="w-[14px] h-[14px] object-contain cursor-pointer"
          />
        </div>
        <div className="w-[626px] p-[20px] bg-[#fff] rounded-[8px]">
          <h1 className="font-[600] text-[20px]">Edit User</h1>
          <div className="mt-[20px]">
            <label
              htmlFor="firstName"
              className="text-[14px] text-[#00263E] mb-[4px] font-[500]">
              First Name
            </label>
            <input
              className="w-full h-[49px] shadow-none border outline-none pl-2 bg-[#FAFAFA] rounded-[8px]"
              type="text"
              id="firstName"
              name="firstName"
              value={data?.firstName}
              readOnly
            />
          </div>
          <div className="mt-[20px]">
            <label
              htmlFor="lastName"
              className="text-[14px] text-[#00263E] mb-[4px] font-[500]">
              Last Name
            </label>
            <input
              className="w-full h-[49px] shadow-none border outline-none pl-2 bg-[#FAFAFA] rounded-[8px]"
              type="text"
              id="lastName"
              name="lastName"
              value={data?.lastName}
              readOnly
            />
          </div>
          <div className="mt-[20px]">
            <label
              htmlFor="email"
              className="text-[14px] mb-[4px] text-[#00263E] font-[500]">
              Email address
            </label>
            <input
              className="w-full h-[49px] shadow-none border outline-none pl-2 bg-[#FAFAFA] rounded-[8px]"
              type="text"
              id="email"
              name="email"
              value={data?.email || ""}
              readOnly
            />
          </div>

          <PhoneFormDataPass
            value={data?.phoneNumber}
            countryCode={data?.country || countryRev[country]}
            label="Phone number"
          />
          <PhoneFormDataPass
            value={data?.phoneNumber}
            countryCode={data?.country || countryRev[country] || "CA"}
            label="Emergency contact"
          />

          <div className="mt-[20px] mb-[16px]">
            <label
              htmlFor="dob"
              className="text-[14px] text-[#00263E] mb-[4px] font-[500]">
              Date of birth
            </label>
            <div className="flex items-center justify-between w-full h-[49px] shadow-none py-[14px] px-[16px] bg-[#FAFAFA] rounded-[8px] border-2 border-[#E7ECF2]">
              <input
                className="w-full h-full outline-none pl-2 bg-[#FAFAFA] border-none rounded-[8px]"
                type="text"
                id="dob"
                name="dob"
                value={formatDateInNew(formatDate(data?.dateOfBirth))}
                readOnly
              />
              <div className="inline-block">
                <img
                  ref={iconRef}
                  src={date}
                  alt="Select Date"
                  onClick={() => setShowCalender(!showCalender)}
                  className="w-[16px] h-[16px] object-contain cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 cursor-none">
            <label
              className={`inline-flex items-center mt-3 border-2 w-[228px] h-[50px] justify-center rounded-[8px] ${
                selectedRole === "patient"
                  ? "border-[#76BC21]"
                  : "border-gray-300"
              }`}>
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                  selectedRole === "patient"
                    ? "border-[#76BC21]"
                    : "border-gray-300"
                }`}>
                {selectedRole === "patient" && (
                  <div className="w-3 h-3 rounded-full bg-[#76BC21]"></div>
                )}
              </div>
              <input
                type="radio"
                className="hidden"
                name="role"
                value="patient"
                checked={selectedRole === "patient"}
                onChange={handleRoleChange}
              />
              <span className="ml-2 text-gray-700">Patient</span>
            </label>
            <label
              className={`inline-flex items-center mt-3 border-2 w-[228px] h-[50px] justify-center rounded-[8px] ${
                selectedRole === "provider"
                  ? "border-[#76BC21]"
                  : "border-gray-300"
              }`}>
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                  selectedRole === "provider"
                    ? "border-[#76BC21]"
                    : "border-gray-300"
                }`}>
                {selectedRole === "provider" && (
                  <div className="w-3 h-3 rounded-full bg-[#76BC21]"></div>
                )}
              </div>
              <input
                type="radio"
                className="hidden"
                name="role"
                value="provider"
                checked={selectedRole === "provider"}
                onChange={handleRoleChange}
              />
              <span className="ml-2 text-gray-700">Healthcare Provider</span>
            </label>
          </div>
        </div>
        {showCalender && (
          <div className="absolute top-32 left-[7%]">
            <SingleCalender
              currentDate={data?.dateOfBirth}
              handleSetDate={(date) => {
                setShowCalender(false);
                setDateOfBirth(formatDateInNew(formatDate(date)));
                setData((prevState) => ({
                  ...prevState,
                  dateOfBirth: date,
                }));
              }}
            />
          </div>
        )}
        <div className="w-[626px] my-[20px] p-[20px] rounded-[8px] bg-white shadow">
          <p className="text-[20px] text-darkblue font-bold pb-[32px]">
            Change password
          </p>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="password"
              className="text-[14px] mb-[4px] font-[500]">
              Password
            </label>
            <div className="flex items-center justify-between h-[49px] border bg-[#FAFAFA] px-[16px] py-[16px] rounded-[8px]">
              <img
                src={password}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
              <input
                className="flex-1 h-[46px] bg-transparent shadow-none border-none outline-none pl-2 rounded-[8px]"
                type={show ? "text" : "password"}
                id="password"
                name="password"
                value={newPassword}
                onChange={handleInputs}
              />
              <p
                className="text-[#72849A80] text-[12px]"
                onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </p>
            </div>

            <div className="mt-[32px]">
              <button
                type="submit"
                className="font-medium text-[14px] px-[24px] py-[12px] text-white bg-[#00263E] rounded-[8px]">
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
