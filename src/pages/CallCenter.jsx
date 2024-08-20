import Sidebar from "@/components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import patient from "../assets/patient.png";
import { MdVideoCall } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ToggleButton from "@/components/ToggleButton";
import { IoClose } from "react-icons/io5";
import { gsap } from "gsap";
import { IoIosTrendingDown } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import gender from "../assets/icons/gender.png";
import Dropdown from "@/components/Dropdown";
const callData = [
  {
    name: "Ester Howard",
    gender: "Female",
    age: "36",
    callType: "video",
    blood: "O+",
    weight: "80",
    height: "170",
    location: "Mexico",
  },
  {
    name: "Foster Howard",
    gender: "Female",
    age: "40",
    callType: "video",
    blood: "O+",
    weight: "80",
    height: "170",
    location: "Mexico",
  },
  {
    name: "Harry Howard",
    gender: "Male",
    age: "50",
    callType: "Audio",
    blood: "O+",
    weight: "80",
    height: "170",
    location: "Mexico",
  },
  {
    name: "Alex Howard",
    gender: "Male",
    age: "32",
    callType: "video",
    blood: "O+",
    weight: "80",
    height: "170",
    location: "Mexico",
  },
];

function CallCenter() {
  const [showProfile, setShowProfile] = useState(false);
  const [mode, setMode] = useState(false);
  const [activeLink, setActiveLink] = useState("Trackers");
  const liveConsultationRef = useRef(null);
  const doctor = useRef(null);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };
  const handleMode = () => {
    setMode(!mode);
    setShowProfile(false);
  };
  useEffect(() => {
    if (doctor.current) {
      if (mode === false) {
        gsap.fromTo(
          doctor.current,
          { x: 400, duration: 0.5 }, // Start position off-screen
          { x: 0, duration: 0.5 } // End position at the destination
        );
      } else {
        gsap.fromTo(
          doctor.current,
          { x: -400, duration: 0.5 }, // Start position off-screen
          { x: 0, duration: 0.5 } // End position at the destination
        );
      }
    }
  }, [mode, showProfile]);

  useEffect(() => {
    if (liveConsultationRef.current) {
      if (mode === true) {
        gsap.fromTo(
          liveConsultationRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        );
      } else {
        gsap.fromTo(
          liveConsultationRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 0.5 }
        );
      }
    }
  }, [mode]);
  const [day, setDay] = useState(null);
  const daysfilter = [
    { label: "Today", value: "0" },
    { label: "Yesterday", value: "1" },
    { label: "Last 7 days", value: "7" },
    { label: "Last 28 days", value: "28" },
    { label: "Last 90 days", value: "90" },
  ];

  const handleDays = (option) => {
    setDay(option);
  };

  const [loading, setLoading] = useState(false);
  const LoadingScreen = () => {
    return (
      <div className="fixed inset-0 bg-[#0D223C] flex items-center justify-center z-50 flex-col">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
        <span className="text-white mt-4 transform scale-100">
          Loading consultation...
        </span>
      </div>
    );
  };
  const navigate = useNavigate();
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/videoCall");
    }, 10000);
  };
  return (
    <div className="h-[calc(100vh-80px)] flex  ">
      {loading && <LoadingScreen />}
      <Sidebar />
      <div className="p-[32px] flex gap-[30px] bg-[#FAFAFA] flex-1  h-[calc(100vh-80px)] overflow-x-auto">
        <div
          // style={{
          //   boxShadow:
          //     " -2px 2px 5px rgba(0, 0, 0, 0.1), 2px -2px 5px rgba(0, 0, 0, 0.1)",
          // }}
          ref={liveConsultationRef}
          className={`h-[550px] p-[16px] border border-[#EEEEEE] bg-[#fff] w-[343px] rounded-[8px] transition-all  ${
            mode ? "block" : "hidden"
          }`}>
          <p className="text-[#00263E] text-[18px] font-[600]">
            Live consultations
          </p>

          <div className="flex items-center gap-[10px] p-[16px] ">
            <div className="bg-[#0F8D47] h-[8px] w-[8px] rounded-[50%]" />
            <p className="text-[#3D5A6C] texxt-[12px] font-[600]">Active</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-[8px]">
              <img
                src={patient}
                alt=""
                className="object-cover w-[32px] h-[32px] rounded-[50%]"
              />
              <div>
                <p className="text-[14px] text-[#00263E] font-[600]">
                  Wade Warren
                </p>
                <div className="flex gap-[4px] items-center text-[#455560] text-[12px]">
                  <span className="flex items-center gap-1">
                    <span>
                      <img
                        src={gender}
                        alt=""
                        className="w-[12px] h-[12px] object-contain"
                      />
                    </span>
                    Male{" "}
                  </span>
                  ,<span> 68 years</span>
                </div>
                <div className="flex gap-[4px] items-center text-[#455560]">
                  <MdVideoCall />
                  <span className="text-[12px]">Video call</span>
                </div>
              </div>
            </div>
            <div className="flex gap-[10px]">
              <Link
                onClick={handleClick}
                // to="/videoCall"
                className="w-[32px] h-[32px] rounded-[50%] bg-[#0F8D47] flex items-center justify-center ">
                <IoMdCall color="#fff" />
              </Link>
              <Link className="w-[32px] h-[32px] rounded-[50%] bg-[#D82724] flex items-center justify-center ">
                <MdCallEnd color="#fff" />
              </Link>
              <Link className="w-[32px] h-[32px] border rounded-[50%] flex items-center justify-center ">
                <FaRegUserCircle
                  color="#76BC21"
                  onClick={() => setShowProfile(!showProfile)}
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-[10px] p-[16px] ">
            <div className="bg-[#F98E02] h-[8px] w-[8px] rounded-[50%]" />
            <p className="text-[#3D5A6C] texxt-[12px] font-[600]">Queue(4)</p>
          </div>
          <div>{/* <p className="mx-[16px] my-[10px]"></p> */}</div>
          <div className=" flex flex-col gap-3">
            {callData.map((item) => (
              <div className="flex items-center justify-between mt-2 border-b-[1px]">
                <div className="flex gap-[8px]">
                  <img
                    src={patient}
                    alt=""
                    className="object-cover w-[32px] h-[32px] rounded-[50%]"
                  />
                  <div>
                    <p className="text-[14px] text-[#00263E] font-[600]">
                      {item.name}
                    </p>
                    <div className="flex gap-[4px] items-center text-[#455560] text-[12px]">
                      <span className="flex items-center gap-1">
                        <span>
                          <img
                            src={gender}
                            alt=""
                            className="w-[12px] h-[12px] object-contain"
                          />
                        </span>
                        {item.gender}{" "}
                      </span>
                      ,<span> {item.age} years</span>
                    </div>
                    <div className="flex gap-[4px] items-center text-[#455560]">
                      <MdVideoCall />
                      <span className="text-[12px]">{item.callType} call</span>
                    </div>
                  </div>
                </div>
                <Link>
                  <FaRegUserCircle color="#000" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div
          // style={{
          //   boxShadow:
          //     " -2px 2px 5px rgba(0, 0, 0, 0.1), 2px -2px 5px rgba(0, 0, 0, 0.1)",
          // }}
          className={`h-[550px] p-[16px]  bg-[#fff] border border-[#EEEEEE] w-[343px] rounded-[8px] ${
            showProfile ? "block" : "hidden"
          }`}>
          <div className="flex  justify-between">
            <img
              src={patient}
              alt=""
              className="object-cover w-[56px] h-[56px] rounded-[50%]"
            />
            <Link onClick={() => setShowProfile(false)}>
              <IoClose size={25} />
            </Link>
          </div>
          <div className="border-b-2 py-[16px]">
            <p className="text-[18px] text-[#00263E] font-[600]">Wade Warren</p>
            <div className="flex gap-[32px] text-[13px] text-[#546E7E]">
              <div>
                <p>
                  Sex: <span className="text-darkblue font-[600]">Male</span>
                </p>
                <p>
                  Blood type:{" "}
                  <span className="text-darkblue font-[600]">O+</span>
                </p>
                <p>
                  Height:
                  <span className="text-darkblue font-[600]"> 160 cm</span>
                </p>
              </div>

              <div>
                <p>
                  Age: <span className="text-darkblue font-[600]">68</span>
                </p>
                <p>
                  Weight: <span className="text-darkblue font-[600]">80</span>
                </p>
                <p>
                  Location:{" "}
                  <span className="text-darkblue font-[600]">Mexico</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between p-[10px]">
            <Link
              onClick={() => handleLinkClick("Health Profile")}
              className={`w-[50%] text-center font-[600]  ${
                activeLink === "Health Profile"
                  ? "text-[#76BC21] border-b-2 border-[#76BC21]  "
                  : "text-[#00263E] hover:bg-lightgreen"
              }`}>
              Health Profile
            </Link>
            <Link
              onClick={() => handleLinkClick("Trackers")}
              className={`w-[50%] text-center font-[600] ${
                activeLink === "Trackers"
                  ? "text-[#76BC21] border-b-2 border-[#76BC21]"
                  : "text-[#00263E] hover:bg-lightgreen"
              }`}>
              Trackers
            </Link>
          </div>
          {/* Code for testing purpose */}
          {activeLink === "Trackers" && (
            <div>
              <div className="flex justify-between bg-[#f5f5f5] p-[8px]">
                <div className="flex gap-3 items-center">
                  <p className="text-[13px] text-[#1A3353]">Tracker</p>
                  <IoMdArrowDropdown />
                </div>
                <div className="flex gap-3 items-center">
                  <p className="text-[13px] text-[#1A3353]">Measurement</p>
                  <IoMdArrowDropdown />
                </div>
              </div>
              <div className="h-[270px] overflow-auto">
                <div className="flex justify-between p-[10px]">
                  <div>
                    <p className="text-[12px] text-[#00263E] ">
                      Oxygen saturation
                    </p>
                    <p className="text-[12px] text-[#00263E] ">
                      04:04 PM , 31 Aug
                    </p>
                  </div>
                  <p className="text-[14px] text-[#00263E] ">98spO2H</p>
                </div>
                <div className="flex justify-between p-[10px]">
                  <div>
                    <p className="text-[12px] text-[#00263E] ">
                      Oxygen saturation
                    </p>
                    <p className="text-[12px] text-[#00263E] ">
                      04:04 PM , 31 Aug
                    </p>
                  </div>
                  <p className="text-[14px] text-[#00263E] ">98spO2H</p>
                </div>
                <div className="flex justify-between p-[10px]">
                  <div>
                    <p className="text-[12px] text-[#00263E] ">
                      Oxygen saturation
                    </p>
                    <p className="text-[12px] text-[#00263E] ">
                      04:04 PM , 31 Aug
                    </p>
                  </div>
                  <p className="text-[14px] text-[#00263E] ">98spO2H</p>
                </div>
                <div className="flex justify-between p-[10px]">
                  <div>
                    <p className="text-[12px] text-[#00263E] ">
                      Oxygen saturation
                    </p>
                    <p className="text-[12px] text-[#00263E] ">
                      04:04 PM , 31 Aug
                    </p>
                  </div>
                  <p className="text-[14px] text-[#00263E] ">98spO2H</p>
                </div>
                <div className="flex justify-between p-[10px]">
                  <div>
                    <p className="text-[12px] text-[#00263E] ">
                      Oxygen saturation
                    </p>
                    <p className="text-[12px] text-[#00263E] ">
                      04:04 PM , 31 Aug
                    </p>
                  </div>
                  <p className="text-[14px] text-[#00263E] ">98spO2H</p>
                </div>
                <div className="flex justify-between p-[10px]">
                  <div>
                    <p className="text-[12px] text-[#00263E] ">
                      Oxygen saturation
                    </p>
                    <p className="text-[12px] text-[#00263E] ">
                      04:04 PM , 31 Aug
                    </p>
                  </div>
                  <p className="text-[14px] text-[#00263E] ">98spO2H</p>
                </div>
              </div>
            </div>
          )}
          {activeLink === "Health Profile" && (
            <div>
              <div className="bg-[#f5f5f5] p-[8px]">
                <p className="text-[13px] text-[#1A3353]">Social history</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center ">
                  <p className="text-[13px] ">Occupation:</p>
                  <p className="text-[13px] text-[#00263E] font-[500]">
                    Engineer
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="text-[13px] ">Education:</p>
                  <p className="text-[13px] text-[#00263E] font-[500]">
                    Msc 2008
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="text-[13px] ">Birthplace:</p>
                  <p className="text-[13px] text-[#00263E] font-[500]">
                    Barquisimeto
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="text-[13px] ">Marital status:</p>
                  <p className="text-[13px] text-[#00263E] font-[500]">
                    Married
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="text-[13px] ">Children: </p>
                  <p className="text-[13px] text-[#00263E] font-[500]">2</p>
                </div>
                <div className="flex items-center ">
                  <p className="text-[13px] ">Religion:</p>
                  <p className="text-[13px] text-[#00263E] font-[500]">
                    Agnostic
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="text-[13px] ">Diet:</p>
                  <p className="text-[13px] text-[#00263E] font-[500]">Vegan</p>
                </div>
                <div className="flex items-center ">
                  <p className="text-[13px] ">Sexual orientation :</p>
                  <p className="text-[13px] text-[#00263E] font-[500]">
                    Heterosexual
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="text-[13px] ">Smoking: </p>
                  <p className="text-[13px] text-[#00263E] font-[500]">No</p>
                </div>
                <div className="flex items-center ">
                  <p className="text-[13px] ">Alcohol consumption: </p>
                  <p className="text-[13px] text-[#00263E] font-[500]">No</p>
                </div>
                <div className="flex items-center ">
                  <p className="text-[13px] ">Substance use: </p>
                  <p className="text-[13px] text-[#00263E] font-[500]">No</p>
                </div>
              </div>
            </div>
          )}
          {/* Code for testing*/}
        </div>
        {/* doctor profile */}
        <div
          // style={{
          //   boxShadow:
          //     " -2px 2px 5px rgba(0, 0, 0, 0.1), 2px -2px 5px rgba(0, 0, 0, 0.1)",
          // }}
          ref={doctor}
          className="p-[16px] bg-[#fff] w-[343px] border  border-[#EEEEEE] rounded-[8px] h-[415px]">
          <img
            src={patient}
            alt=""
            className="object-cover w-[56px] h-[56px] rounded-[50%]"
          />
          <p className="text-[16px] text-[#00263E] font-[600] py-[10px]">
            Dr. Roger Hopkins
          </p>
          <p className="text-[14px] text-[#546E7E] ">General medecine</p>

          <div className="flex gap-[10px] border-b-2 py-[16px]">
            {mode ? (
              <div
                onClick={handleMode}
                className="flex justify-center items-center cursor-pointer bg-[#E7F4ED] w-[80px] px-[6px] py-[4px] gap-2 rounded-[45px]">
                <div className="w-[8px] h-[8px] bg-[#0F8D47] rounded-[8px]" />
                <p className="text-[12px] text-[#0F8D47] font-[600]">Online</p>
              </div>
            ) : (
              <div
                onClick={handleMode}
                className="flex justify-center cursor-pointer items-center bg-[#FBE9E9] w-[80px] px-[6px] py-[4px] gap-2 rounded-[45px]">
                <div className="w-[8px] h-[8px] bg-[#D82724] rounded-[8px]" />
                <p className="text-[12px] text-[#D82724] font-[600]">Offline</p>
              </div>
            )}

            <ToggleButton on={mode} toggle={handleMode} />
          </div>
          <div className="grid grid-cols-2 mt-[15px]">
            <div className="m-[10px]">
              <p className="text-[#335165] text-[13px]">Total patient</p>
              <div className="flex items-end   gap-[10px]">
                <p className="font-[600] text-[18px]">120</p>
                <div className="flex items-center gap-1">
                  <IoIosTrendingDown color="red" />
                  <p className="text-red-600 text-[12px]">2%</p>
                </div>
              </div>
            </div>
            <div className="m-[10px]">
              <p className="text-[#335165] text-[13px]">Average age</p>
              <div className="flex gap-[10px] items-end ">
                <p className="font-[600] text-[18px]">55</p>
                <div className="flex items-center gap-1">
                  <IoIosTrendingDown color="red" />
                  <p className="text-red-600 text-[12px]">2%</p>
                </div>
              </div>
            </div>
            <div className="m-[10px]">
              <p className="text-[#335165] text-[13px]">
                Consultations canceled
              </p>
              <div className="flex gap-[10px] items-end ">
                <p className="font-[600] text-[18px]">120</p>
                <div className="flex items-center gap-1 ">
                  <IoIosTrendingDown color="red" />
                  <p className="text-red-600 text-[12px]">2%</p>
                </div>
              </div>
            </div>
            <div className="m-[10px]">
              <p className="text-[#335165] text-[13px]">Average duration</p>
              <div className="flex gap-[10px] items-end ">
                <p className="font-[600] text-[18px]">30 min</p>
                <div className="flex items-center gap-1">
                  <IoIosTrendingDown color="red" />
                  <p className="text-red-600 text-[12px]">2%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pb-[20px]">
            <Dropdown
              width={190}
              options={daysfilter}
              onOptionSelect={handleDays}
              defaultValue="7"
            />

            {/* <select
              name=""
              id=""
              className="outline-none border p-1 bg-[#f5f5f5] rounded-[4px]"
            >
              <option value="">Today</option>
              <option value="">Yesterday</option>
              <option value="" selected>
                Last 7 Days
              </option>
              <option value="">Last 28 Days</option>
              <option value="">Last 90 Days</option>
            </select> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallCenter;
