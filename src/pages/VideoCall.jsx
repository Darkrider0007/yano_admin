import React, { useState, useRef, useEffect } from "react";
import patient from "../assets/patient.png";
import thumnail from "../assets/thumbnail.png";
import device from "../assets/device.png";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdCallEnd, MdOutlineVideocam, MdVideoCall } from "react-icons/md";
import { MdOutlineVideocamOff } from "react-icons/md";
import { FaMicrophone, FaRegUserCircle } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { MdChatBubble } from "react-icons/md";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { TbReportMedical } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown, IoMdCall } from "react-icons/io";
import { callData } from "../constant/InitialData";
import { RiBluetoothConnectFill } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaPaperclip } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { IoAttachOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdCompress } from "react-icons/md";
import { BiWater } from "react-icons/bi";
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";
import { RxDash } from "react-icons/rx";
import gsap from "gsap";
import note2 from "../assets/icons/note2.png";
import tool from "../assets/icons/tool.png";
import toolopen from "../assets/icons/toolopen.png";
import prescription from "../assets/icons/prescription.png";
import mic from "../assets/icons/mic.png";
import chat from "../assets/icons/chat.png";
import chaton from "../assets/icons/chaton.png";
import videocall3 from "../assets/icons/videocall3.png";
import queue from "../assets/icons/queue.png";
import queueon from "../assets/icons/queueon.png";

function VideoCall() {
  // const [mode, setMode] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [link, setLink] = useState("Trackers");
  const [toolShow, setToolShow] = useState(true);
  const [measurement, setMeasurement] = useState(false);

  const handleClick = (l) => {
    setLink(l);
  };
  const [showProfile, setShowProfile] = useState(false);
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };
  const handleClose = () => {
    setActiveLink(null);
  };
  // chat
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() || file) {
      const newMessage = { text: input, file, sender: "User" };
      setMessages([...messages, newMessage]);
      setInput("");
      setFile(null);
      setFilePreview(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const handleTools = () => {
    setToolShow(false);
  };
  const handleMeasurement = () => {
    setMeasurement(true);
  };
  // measurement process

  const [measure, setMeasure] = useState(false);

  const startMeasure = () => {
    setMeasure(true);
    setTimeout(() => {
      setMeasure(false);
    }, 3000);
  };

  const handleMeasure = () => {
    setMeasurement(false);
    // Handle additional close logic here
  };
  return (
    <div className="flex justify-center  py-[48px] px-[68px] gap-[16px]">
      {/* <ChatMessenger /> */}
      {activeLink === "queue" && (
        <div className="h-[550px] p-[16px] bg-[#fff] w-[343px] rounded-[8px] transition-all  ">
          <div className="flex items-center justify-between">
            <p className="text-[#00263E] text-[18px] font-[600]">
              Live consultations
            </p>
            <IoClose className="cursor-pointer" onClick={handleClose} />
          </div>
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
                  <span className="">Male </span>,<span> 68 years</span>
                </div>
                <div className="flex gap-[4px] items-center text-[#455560]">
                  <MdVideoCall />
                  <span className="text-[12px]">Video call</span>
                </div>
              </div>
            </div>
            <div className="flex gap-[10px]">12:33</div>
          </div>
          <p className="mx-[16px] my-[10px]">Queue(4)</p>
          <div className=" flex flex-col gap-3 h-[330px] overflow-auto">
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
                      <span className="">{item.gender} </span>,
                      <span> {item.age} years</span>
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
      )}
      {/* main video section */}
      <div className="">
        <div className="relative w-[800px] h-[500px]">
          <div className="w-full h-full rounded-t-[8px] overflow-hidden">
            <img src={patient} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="absolute top-0 left-0 bg-[#21212166] rounded-[6px] flex items-center gap-2 m-2 p-[4px]">
            <BsClock color="white" />
            <p className="text-[#fff] text-[12px]">1:12:30</p>
          </div>
          <div className="absolute top-0 right-0">
            <img src={thumnail} alt="" />
          </div>
        </div>
        <div
          className="flex justify-between p-[15px]"
          style={{
            borderBottomWidth: "1.5px",
            borderLeftWidth: "1.5px",
            borderRightWidth: "1.5px",
          }}>
          <Link
            onClick={() => handleLinkClick("queue")}
            className="flex flex-col items-center">
            <div className="w-[40px] h-[40px] rounded-[50%] border-2 border-[#EEE] flex justify-center items-center">
              {/* <BiSolidUserDetail
                color={activeLink === "queue" ? "#0F8D47" : ""}
              /> */}
              {activeLink === "queue" ? (
                <img
                  src={queueon}
                  alt=""
                  className="w-[16px] h-[16px] object-contain"
                />
              ) : (
                <img
                  src={queue}
                  alt=""
                  className="w-[16px] h-[16px] object-contain"
                />
              )}
            </div>

            <p className="text-[12px] text-[#00263E]">Queue</p>
          </Link>
          <div className="flex gap-[17px]">
            <Link
              //   onClick={() => handleLinkClick("video")}
              className=" flex flex-col items-center">
              <div className="w-[40px] h-[40px] rounded-[50%] border-2 border-[#EEE] flex justify-center items-center">
                <img
                  src={videocall3}
                  alt=""
                  className="w-[16px] h-[16px] object-contain"
                />
              </div>

              <p className="text-[12px] text-[#00263E]">Video</p>
            </Link>
            <Link className="flex flex-col items-center">
              <div className="w-[40px] h-[40px] rounded-[50%] border-2 border-[#EEE] flex justify-center items-center">
                {/* <FaMicrophone /> */}
                <img
                  src={mic}
                  alt=""
                  className="w-[16px] h-[16px] object-contain"
                />
              </div>

              <p className="text-[12px] text-[#00263E]">Mute</p>
            </Link>
            <Link
              onClick={() => handleLinkClick("chat")}
              className="flex flex-col items-center">
              <div className="w-[40px] h-[40px] rounded-[50%] border-2 border-[#EEE] flex justify-center items-center">
                {activeLink === "chat" ? (
                  <img
                    src={chaton}
                    alt=""
                    className="w-[16px] h-[16px] object-contain"
                  />
                ) : (
                  <img
                    src={chat}
                    alt=""
                    className="w-[16px] h-[16px] object-contain"
                  />
                )}
              </div>

              <p className="text-[12px] text-[#00263E]">Chat</p>
            </Link>
            <Link
              onClick={() => handleLinkClick("tools")}
              className="flex flex-col items-center">
              <div className="w-[40px] h-[40px] rounded-[50%] border-2 border-[#EEE] flex justify-center items-center">
                {/* <MdOutlineMonitorHeart
                  color={activeLink === "tools" ? "#0F8D47" : ""}
                /> */}
                {activeLink === "tools" ? (
                  <img
                    src={toolopen}
                    alt=""
                    className="w-[16px] h-[16px] object-contain"
                  />
                ) : (
                  <img
                    src={tool}
                    alt=""
                    className="w-[16px] h-[16px] object-contain"
                  />
                )}
              </div>

              <p className="text-[12px] text-[#00263E]">Tools</p>
            </Link>
            <Link className="flex flex-col items-center">
              <div className="w-[40px] h-[40px] rounded-[50%] border-2 border-[#EEE] flex justify-center items-center">
                {/* <GrNotes /> */}
                <img
                  src={note2}
                  alt=""
                  className="w-[16px] h-[16px] object-contain"
                />
              </div>

              <p className="text-[12px] text-[#00263E]">Notes</p>
            </Link>
            <Link className="flex flex-col items-center">
              <div className="w-[40px] h-[40px] rounded-[50%] border-2 border-[#EEE] flex justify-center items-center">
                {/* <TbReportMedical /> */}
                <img
                  src={prescription}
                  alt=""
                  className="w-[16px] h-[16px] object-contain"
                />
              </div>

              <p className="text-[12px] text-[#00263E]">Prescription</p>
            </Link>
          </div>
          <div className="flex flex-col items-center                                                                                                                                                                                                                                        ">
            <Link className="w-[40px] h-[40px] rounded-[50%] bg-[#D82724] flex items-center justify-center ">
              <MdCallEnd color="#fff" />
            </Link>
            <p className="text-[12px] text-[#00263E]">End call</p>
          </div>
        </div>
      </div>
      <div className="">
        {activeLink === null && (
          <div
            className={`h-[550px] p-[16px] bg-[#fff] w-[343px] rounded-[8px] `}>
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
              <p className="text-[18px] text-[#00263E] font-[600]">
                Wade Warren
              </p>
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
                onClick={() => handleClick("Health Profile")}
                className={`w-[50%] text-center font-[600] ${
                  link === "Health Profile"
                    ? "text-[#76BC21] border-b-2 border-[#76BC21]"
                    : "text-[#00263E]"
                }`}>
                Health Profile
              </Link>
              <Link
                onClick={() => handleClick("Trackers")}
                className={`w-[50%] text-center font-[600] ${
                  link === "Trackers"
                    ? "text-[#76BC21] border-b-2 border-[#76BC21]"
                    : "text-[#00263E]"
                }`}>
                Trackers
              </Link>
            </div>
            {/*Test Code */}
            {link === "Trackers" && (
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
                <div className="mt-2 h-[270px] overflow-auto">
                  <div className="flex justify-between px-[10px] py-[0px]">
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
            {link === "Health Profile" && (
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
                    <p className="text-[13px] text-[#00263E] font-[500]">
                      Vegan
                    </p>
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
            {/* Balchal code lekha ache */}
          </div>
        )}
        {activeLink === "mute" && <div>Mute Content</div>}
        {/* chat section */}
        {activeLink === "chat" && (
          <div className="w-[343px] flex flex-col justify-between  h-[500px] border bg-white rounded-lg ">
            <div className="flex items-center justify-between px-[12px] py-[16px]">
              <h1 className="text-[00263E] font-[700]">Chat</h1>
              <IoClose
                size={20}
                color="#335165"
                className="cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <div className="flex-1 p-4 overflow-y-auto ">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.sender === "User" ? "justify-end" : "justify-start"
                  }`}>
                  <div>
                    {message.text && (
                      <div
                        className={`inline-block p-1 px-4 rounded-t-[8px] rounded-bl-[8px] ${
                          message.sender === "User"
                            ? "bg-[#00263E] text-white"
                            : "bg-gray-300"
                        }`}>
                        <p className="text-[13px]">{message.text}</p>
                        <p className="text-[8px] text-right text-[#B0BCC3]">
                          5:20 A.M
                        </p>
                      </div>
                    )}
                    {message.file && (
                      <div className="mt-2 flex items-center">
                        {message.file.type.startsWith("image/") ? (
                          <a
                            href={URL.createObjectURL(message.file)}
                            target="_blank"
                            rel="noopener noreferrer">
                            <img
                              src={URL.createObjectURL(message.file)}
                              alt="file"
                              className="max-w-[180px] rounded-lg"
                            />
                          </a>
                        ) : (
                          <div className="flex items-center gap-[10px] w-[150px]">
                            <FaFolder size={50} color="#ffc93c" />
                            <a
                              href={URL.createObjectURL(message.file)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 text-[10px] overflow-hidden">
                              {message.file.name}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSendMessage}
              className="flex h-[48px] flex-col mx-4 mb-4 bg-[#eee] space-y-2">
              {/* {filePreview && (
                <div className=" flex justify-left">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="max-w-[50px] h-[50px] rounded-lg mb-2"
                  />
                </div>
              )} */}
              <div className="flex px-2 ">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message"
                  className="flex-1 h-[48px] p-2 bg-transparent outline-none placeholder-[#546E7E]"
                />
                <button type="button" onClick={handleIconClick} className="p-2">
                  <IoAttachOutline size={25} color="#546E7E" />
                </button>
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                {/* <button type="submit">
                  <IoIosSend size={25} color="#00263E" />
                </button> */}
              </div>
            </form>
          </div>
        )}
        {activeLink === "tools" && (
          <div>
            {toolShow === true ? (
              <div className="w-[343px] bg-[#fff] p-[16px] rounded-[8px]">
                <div className="flex items-center justify-between">
                  <p>Measurement Tools</p>
                  <IoClose className="cursor-pointer" onClick={handleClose} />
                </div>
                <Link
                  onClick={handleTools}
                  className="flex items-center gap-[20px] py-[10px]">
                  <img src={device} alt="" />
                  <div className="flex flex-col gap-[5px]">
                    <p>Monitor multiparameters</p>

                    <div className="w-[103px] px-[8px] py-[4px] flex items-center gap-2 text-[#0F8D47] bg-[#E7F4ED] rounded-[6px]">
                      <RiBluetoothConnectFill />
                      <p className="text-[12px]">connected</p>
                    </div>
                  </div>
                  <FaAngleRight className="cursor-pointer" />
                </Link>
              </div>
            ) : (
              <div className="w-[343px] p-4 bg-white rounded-[8px]">
                {measurement === false ? (
                  <div>
                    <div className="flex py-4 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BsArrowLeft
                          className="cursor-pointer"
                          onClick={() => {
                            setToolShow(false);
                          }}
                          size={25}
                        />
                        <p className="text-darkblue text-[18px] font-[600]">
                          Select a measurement
                        </p>
                      </div>
                      <IoClose
                        className="cursor-pointer"
                        size={25}
                        onClick={handleClose}
                      />
                    </div>
                    <div className="flex flex-col ">
                      <Link
                        onClick={handleMeasurement}
                        className="flex items-center justify-between border-b py-4">
                        <div className="flex items-center gap-3">
                          <FaHeartCirclePlus size={25} color="#5B99C2" />
                          <p className="text-darkblue text-[16px] font-[600]">
                            Heart rate
                          </p>
                        </div>
                        <FaAngleRight className="cursor-pointer" />
                      </Link>
                      <Link
                        onClick={handleMeasurement}
                        className="flex items-center justify-between border-b py-4">
                        <div className="flex items-center gap-3">
                          <MdCompress size={25} color="red" />
                          <p className="text-darkblue text-[16px] font-[600]">
                            Blood pressure
                          </p>
                        </div>
                        <FaAngleRight className="cursor-pointer" />
                      </Link>
                      <Link className="flex items-center justify-between border-b py-4">
                        <div className="flex items-center gap-3">
                          <BiWater size={25} color="#3FA2F6" />
                          <p className="text-darkblue text-[16px] font-[600]">
                            Oxygen saturation
                          </p>
                        </div>
                        <FaAngleRight className="cursor-pointer" />
                      </Link>
                      <Link className="flex items-center justify-between border-b py-4">
                        <div className="flex items-center gap-3">
                          <FaTemperatureHalf size={25} color="1F316F" />
                          <p className="text-darkblue text-[16px] font-[600]">
                            Body temperature
                          </p>
                        </div>
                        <FaAngleRight className="cursor-pointer" />
                      </Link>
                      <Link className="flex items-center justify-between border-b py-4">
                        <div className="flex items-center gap-3">
                          <MdOutlineMonitorHeart size={25} color="green" />
                          <p className="text-darkblue text-[16px] font-[600]">
                            ECG
                          </p>
                        </div>
                        <FaAngleRight className="cursor-pointer" />
                      </Link>
                      <Link className="flex items-center justify-between  py-4">
                        <div className="flex items-center gap-3">
                          <MdBloodtype size={25} color="red" />
                          <p className="text-darkblue text-[16px] font-[600]">
                            Blood glucose
                          </p>
                        </div>
                        <FaAngleRight className="cursor-pointer" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex py-4 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BsArrowLeft
                          className="cursor-pointer"
                          onClick={() => {
                            setMeasurement(false);
                          }}
                          size={20}
                        />
                        <p className="text-darkblue text-[18px] font-[600]">
                          Heart Rate
                        </p>
                      </div>
                      <IoClose
                        className="cursor-pointer"
                        size={25}
                        onClick={handleClose}
                      />
                    </div>
                    <div className="h-[120px] border rounded-[8px]">
                      <div className="flex h-full">
                        <div className="w-[60%] relative h-full border-r flex flex-col items-center justify-center">
                          <div className="flex">
                            <RxDash size={25} />
                            <RxDash size={25} />
                          </div>
                          <p className="text-[12px]  text-lightgray absolute bottom-2">
                            beats/min
                          </p>
                        </div>
                        <div className="h-full flex-1 flex flex-col items-center justify-center">
                          <p className="text-[12px] text-darkblue">
                            Blood oxygen
                          </p>
                          <div className="flex h-[60%]">
                            <div className="flex items-center">
                              <RxDash
                                size={25}
                                color="lightgray"
                                fontWeight={700}
                              />
                              <RxDash
                                size={25}
                                fontWeight={700}
                                color="lightgray"
                              />
                            </div>
                            <p className="text-[32px] text-lightgray font-[700]">
                              %
                            </p>
                          </div>
                          <p className="text-[12px] font-[700] text-lightgray">
                            SpO2H
                          </p>
                        </div>
                      </div>
                    </div>
                    {!measure ? (
                      <button
                        className="w-full bg-darkblue py-3 rounded-[8px] text-white my-[16px]"
                        onClick={startMeasure}>
                        Start Measuring
                      </button>
                    ) : (
                      <div className="w-full bg-red-500 py-3 rounded-[8px] text-white my-[16px] text-center">
                        Stop Measurement
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {activeLink === "notes" && <div>Notes Content</div>}
        {activeLink === "prescription" && <div>Prescription Content</div>}
      </div>
    </div>
  );
}

export default VideoCall;
