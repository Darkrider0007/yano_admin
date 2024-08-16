import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Sidebar from "@/components/Sidebar";
import { FaPlus } from "react-icons/fa6";
import downgray from "../assets/icons/downgray.png";
import threedot from "../assets/icons/threedot.jpg";
import search from "../assets/icons/search.png";
import filterimg from "../assets/icons/filter.png";
import FilterDropdown from "@/components/FilterDropdown";
import close from "../assets/icons/close.png";
import arrowback from "../assets/icons/arrowback.png";
import arrowforward from "../assets/icons/arrowforward.png";
import calendar from "../assets/icons/calendar.png";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import edit from "../assets/icons/edit.png";
import sendnoti from "../assets/icons/sendnoti.png";
import exportreport from "../assets/icons/export.png";
import deactivate from "../assets/icons/deactivate.png";
import CalenderTwoSide from "./CalenderTwoSide";
import Notification from "@/utils/Notification";
import CustomCheckBox from "@/components/CustomCheckBox";
import axios from "axios";
import { fetchDoctorUserData, fetchPatientUserData } from "@/API/dataFetch";

const data = [
  {
    user_id: "1",
    fullName: "John Doe",
    country: "USA",
    type: "patient",
    date_of_creation: "2024-07-25",
    status: "active",
  },
  {
    user_id: "2",
    fullName: "Jane Smith",
    country: "Canada",
    type: "patient",
    date_of_creation: "2024-07-24",
    status: "active",
  },
  {
    user_id: "3",
    fullName: "Carlos Ramirez",
    country: "Mexico",
    type: "patient",
    date_of_creation: "2024-07-23",
    status: "active",
  },
  {
    user_id: "4",
    fullName: "Anna Müller",
    country: "Germany",
    type: "patient",
    date_of_creation: "2024-07-22",
    status: "active",
  },
  {
    user_id: "5",
    fullName: "Yuki Tanaka",
    country: "Japan",
    type: "patient",
    date_of_creation: "2024-07-21",
    status: "active",
  },
];
const statusList = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export default function User() {
  const [country, setCountry] = useState(null);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);
  const [filter, setFilter] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showSendNotification, setShowSendNotification] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const popupRef = useRef(null);
  // fetch user from api
  // const baseUrl = import.meta.env.BASE_URL;
  // Function to fetch data from the first API using Axios

  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchAndCombineData = async () => {
      try {
        const doctorData = await fetchDoctorUserData();
        const patientData = await fetchPatientUserData();

        // Combine the data in an alternating fashion
        const maxLength = Math.max(doctorData.length, patientData.length);
        const combinedData = [];

        for (let i = 0; i < maxLength; i++) {
          if (i < doctorData.length) {
            combinedData.push(doctorData[i]);
          }
          if (i < patientData.length) {
            combinedData.push(patientData[i]);
          }
        }

        setCombinedData(combinedData); // Store the combined data in state
      } catch (error) {
        console.error("Error combining data:", error);
      }
    };

    fetchAndCombineData(); // Call the function to fetch and combine data
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const countryList = [
    { label: "Mexico", value: "Mexico" },
    { label: "Brazil", value: "Brazil" },
    { label: "Venezuela", value: "Venezuela" },
    { label: "Colombia", value: "Colombia" },
  ];
  const statusList = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];
  const typeList = [
    { label: "Patient", value: "patient" },
    { label: "Helthcare provider", value: "doctor" },
  ];
  const handleCountryChange = (option) => {
    setCountry(option);
  };
  const handleStatus = (option) => {
    setStatus(option);
  };
  // const handleType = (option) => {
  //   setType(option);
  // };
  const navigate = useNavigate();

  const handleRowClick = (user) => {
    navigate(`/user/${user?._id}`, { state: { user } });
    // console.log(user?.firstName);
  };

  const handleActionClick = (event, user) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY - 3,
      left: rect.left + window.scrollX - 40,
    });
    setSelectedUser(user);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  const handleSendNotificationClick = () => {
    setShowSendNotification(true);
    setSelectedUser(null);
  };
  const handleClose = () => {
    setShowSendNotification(false);
  };

  // row check box function
  const handleRowSelection = ({ user_id, fullName }) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.some((user) => user.user_id === user_id)
        ? prevSelectedRows.filter((user) => user.user_id !== user_id)
        : [...prevSelectedRows, { user_id, fullName }]
    );
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        data.map(({ user_id, fullName }) => ({ user_id, fullName }))
      );
    }
    setSelectAll(!selectAll);
  };
  // for search section and filtering functions
  const [selectedTypes, setSelectedTypes] = useState([]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle type filter change
  const handleTypeChange = (selectedOptions) => {
    setSelectedTypes(selectedOptions.map((option) => option.value));
  };

  // Filter the data based on the search query and selected types
  const filteredData = combinedData.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearchQuery =
      fullName.includes(searchQuery.toLowerCase()) ||
      user._id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTypeFilter =
      selectedTypes.length === 0 || selectedTypes.includes(user.userType);

    return matchesSearchQuery && matchesTypeFilter;
  });

  const CheckOption = () => {
    return (
      <div className="flex items-center gap-[8px]  ">
        <div className="flex items-center bg-[#fafafa] border p-[10px] gap-[8px] rounded-[8px] ">
          <img src={edit} alt="" className="w-[16px] h-[16px] object-contain" />
          <p className="text-[#455560] text-[14px]">Edit user</p>
        </div>
        <div className="flex items-center bg-[#fafafa] border p-[10px] gap-[8px] rounded-[8px] ">
          <img
            src={deactivate}
            alt=""
            className="w-[16px] h-[16px] object-contain"
          />
          <p className="text-[#455560] text-[14px]">Deactivate</p>
        </div>
        <div className="flex items-center bg-[#fafafa] border p-[10px] gap-[8px] rounded-[8px] ">
          <img
            src={exportreport}
            alt=""
            className="w-[16px] h-[16px] object-contain"
          />
          <p className="text-[#455560] text-[14px]">Export</p>
        </div>
        <div className="flex items-center bg-[#fafafa] border p-[10px] gap-[8px] rounded-[8px] ">
          <img
            src={sendnoti}
            alt=""
            className="w-[16px] h-[16px] object-contain"
          />
          <p className="text-[#455560] text-[14px]">Send Message</p>
        </div>
      </div>
    );
  };

  return (
    <div className="grid min-h-screen max-w-screen">
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 h-screen mx-[32px] mt-[32px]">
          <div className="flex justify-between items-center mb-[24px]">
            <div>
              <h1 className="text-[#00263E] text-[24px] font-[700]">Users</h1>
              <p className="text-[#72849A]">Yano's user database</p>
            </div>

            <Link to="createUser">
              <Button className="flex gap-3 items-center justify-center bg-darkblue">
                <span>
                  <FaPlus size={12} />
                </span>
                Create a new user
              </Button>
            </Link>
          </div>

          <div className="flex flex-col flex-1">
            <main className="flex flex-col gap-4">
              <div className="border shadow-sm rounded-lg bg-white">
                <div className="">
                  {selectAll ? (
                    <div className="flex items-center justify-between p-4">
                      <p className="text-[#00263E] text-[16px] ">
                        All the users on this database are selected.
                      </p>
                      <CheckOption />
                    </div>
                  ) : selectedRows.length === 1 ? (
                    <div className="flex items-center justify-between p-4">
                      <p className="text-darkblue text-[16px] ]">
                        The user{" "}
                        <span className="font-semibold">
                          {selectedRows[0].firstName}
                        </span>{" "}
                        with the ID{" "}
                        <span className="font-semibold">
                          {selectedRows[0]._id}
                        </span>{" "}
                        is selected.
                      </p>
                      <CheckOption />
                    </div>
                  ) : selectedRows.length > 1 ? (
                    <div className="flex items-center justify-between p-4">
                      <p className="text-darkblue text-[16px] ">
                        The user{" "}
                        <span className="font-semibold">
                          {selectedRows[0].firstName}
                        </span>{" "}
                        with the ID{" "}
                        <span className="font-semibold">
                          {selectedRows[0]._id}
                        </span>{" "}
                        and {selectedRows.length - 1} other users are selected.
                      </p>
                      <CheckOption />
                    </div>
                  ) : (
                    <form className="p-[16px] flex justify-between items-center">
                      <div
                        className={`flex items-center border rounded-[8px]  bg-[#fafafa] h-[40px] px-2 ${
                          filter ? "w-1/4" : "w-1/3"
                        }`}>
                        <img src={search} alt="" />
                        <input
                          className="w-full bg-transparent shadow-none border-none outline-none pl-2 placeholder-[#72849A]"
                          placeholder="Search for users ..."
                          type="search"
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                      </div>
                      <div className="flex-1 flex justify-end items-center">
                        {filter === false ? (
                          <Link
                            onClick={() => {
                              setFilter(true);
                            }}
                            className="flex items-center flex-wrap gap-[8px] border-2 px-[12px] py-[8px] rounded-[8px]">
                            <img
                              src={filterimg}
                              alt=""
                              className="w-[16px] h-[16px] object-contain"
                            />
                            <p className="text-[#455560] font-medium">
                              Add filter
                            </p>
                          </Link>
                        ) : (
                          <div className="flex gap-[24px]">
                            <FilterDropdown
                              width={180}
                              options={statusList}
                              onOptionSelect={handleStatus}
                              name="Status"
                            />
                            <FilterDropdown
                              width={180}
                              options={countryList}
                              onOptionSelect={handleCountryChange}
                              name="country"
                            />

                            <FilterDropdown
                              options={typeList}
                              onOptionSelect={handleTypeChange}
                              name="Type"
                              width={180}
                            />
                            <Link
                              onClick={() => {
                                setShowCalender(!showCalender);
                              }}
                              className="flex items-center gap-2 px-[12px] py-[6px] border-2 rounded-[6px] bg-[#fafafa]">
                              <p className="text-[#455560]">
                                May 8 - June 8, 1992
                              </p>
                              <img
                                src={calendar}
                                alt=""
                                className="w-[16px] h-[16px]"
                              />
                            </Link>
                            {}
                            {showCalender ? (
                              <div className="bg-[#fafafa]  absolute right-[80px] bottom-[80px] z-50">
                                <CalenderTwoSide
                                  handleSetDate={() => {
                                    setShowCalender(false);
                                  }}
                                />
                              </div>
                            ) : (
                              ""
                            )}

                            <Link
                              onClick={() => {
                                setFilter(false);
                              }}
                              className="flex items-center justify-center px-[12px] py-[8px] border-2 rounded-[6px] bg-[#fff]">
                              <img src={close} alt="" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </form>
                  )}
                </div>
                <Table className="">
                  <TableHeader className="border-t">
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center gap-2 ">
                          <CustomCheckBox
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                          <div className="flex items-center gap-3">
                            <p className="text-[#1A3353] font-medium">
                              User ID
                            </p>
                            <img
                              src={downgray}
                              alt=""
                              className="w-[10px] h-[5px] object-contain"
                            />
                          </div>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-3">
                          <p className="text-[#1A3353] font-medium">
                            Full name
                          </p>
                          <img
                            src={downgray}
                            alt=""
                            className="w-[10px] h-[5px] object-contain"
                          />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-3">
                          <p className="text-[#1A3353] font-medium">Country</p>
                          <img
                            src={downgray}
                            alt=""
                            className="w-[10px] h-[5px] object-contain"
                          />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-3">
                          <p className="text-[#1A3353] font-medium">Type</p>
                          <img
                            src={downgray}
                            alt=""
                            className="w-[10px] h-[5px] object-contain"
                          />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-3">
                          <p className="text-[#1A3353] font-medium">
                            Date of creation
                          </p>
                          <img
                            src={downgray}
                            alt=""
                            className="w-[10px] h-[5px] object-contain"
                          />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-3">
                          <p className="text-[#1A3353] font-medium">Status</p>
                          <img
                            src={downgray}
                            alt=""
                            className="w-[10px] h-[5px] object-contain"
                          />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-3">
                          <p className="text-[#1A3353] font-medium">Actions</p>
                          <img
                            src={downgray}
                            alt=""
                            className="w-[10px] h-[5px] object-contain"
                          />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData?.map((user) => (
                      <TableRow
                        className={`cursor-pointer ${
                          selectedRows.some(
                            (selectedUser) => selectedUser._id === user._id
                          )
                            ? "bg-[#ECF2FE] hover:bg-[#ECF2FE]"
                            : ""
                        }`}
                        key={user?._id}>
                        <TableCell>
                          <div className="flex items-center gap-[30px] text-[#00263E]">
                            <CustomCheckBox
                              checked={selectedRows.some(
                                (selectedUser) => selectedUser._id === user._id
                              )}
                              onChange={() => handleRowSelection(user)}
                            />
                            {user?._id}
                          </div>
                        </TableCell>
                        <TableCell
                          onClick={() => handleRowClick(user)}
                          className="text-[#3E79F7]">
                          {user?.firstName} {user?.lastName}
                        </TableCell>
                        <TableCell className="text-[#455560]">
                          {/* {user?.country} */}
                          {/* {user?.firstName} */}
                          India
                        </TableCell>
                        <TableCell className="text-[#455560]">
                          {user?.userType}
                        </TableCell>
                        <TableCell className="text-[#455560]">
                          {formatDate(user?.createdAt)}
                        </TableCell>
                        <TableCell className="">
                          <div className="w-[55px] h-[23px] bg-[#E8F7F1] rounded-[4px] text-[#138F5B] p-[8px] flex justify-center items-center">
                            {/* <p>{user?.status}</p> */}
                            {/* {user?.firstName} */}
                            active
                          </div>
                        </TableCell>
                        <TableCell
                          onClick={(event) => handleActionClick(event, user)}
                          className="pl-[35px] relative">
                          <img
                            src={threedot}
                            alt=""
                            className="cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between p-[16px] border-t">
                  <div className="flex items-center gap-2">
                    <p className="text-[#72849A] ">
                      Rows per page: <span className="text-[#455560]">8</span>
                    </p>
                    <img
                      src={downgray}
                      alt=""
                      className="w-[10px] h-[5px] object-contain"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-[#72849A]">1-8 of 1240</p>
                    <img src={arrowback} alt="" className="w-[24px] h-[24px]" />
                    <img
                      src={arrowforward}
                      alt=""
                      className="w-[24px] h-[24px]"
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {selectedUser && (
        <div
          className="  absolute shadow  bg-white border rounded"
          style={{ top: popupPosition.top, left: popupPosition.left }}
          ref={popupRef}>
          <ul className="flex flex-col gap-[2px] m-[4px]">
            <li
              className=" flex items-center gap-[10px] rounded-[6px] px-[16px] py-[12px] cursor-pointer hover:bg-[#F5F5F5]"
              onClick={closePopup}>
              <img
                src={edit}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
              <p className="text-[#455560] text-[14px]">Edit user</p>
            </li>
            <li
              onClick={handleSendNotificationClick}
              className="flex items-center gap-[10px] rounded-[6px] px-[16px] py-[12px] cursor-pointer hover:bg-[#F5F5F5]"
              // onClick={closePopup}
            >
              <img
                src={sendnoti}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
              <p className="text-[#455560] text-[14px]">Send notification</p>
            </li>
            <li
              className="flex items-center gap-[10px] rounded-[6px] px-[16px] py-[12px] cursor-pointer hover:bg-[#F5F5F5]   "
              onClick={closePopup}>
              <img
                src={exportreport}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
              <p className="text-[#455560] text-[14px]">Export report</p>
            </li>
            <li
              className="flex items-center gap-[10px] rounded-[6px] px-[16px] py-[12px] cursor-pointer hover:bg-[#F5F5F5]"
              onClick={closePopup}>
              <img
                src={deactivate}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
              <p className="text-[#455560] text-[14px]">Deactivate user</p>
            </li>
          </ul>
        </div>
      )}
      {showSendNotification && <Notification handleClose={handleClose} />}
    </div>
  );
}
