import Sidebar from "@/components/Sidebar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import downgray from "../assets/icons/downgray.png";
import threedot from "../assets/icons/threedot.svg";
import search from "../assets/icons/search.png";
import arrowback from "../assets/icons/arrowback.png";
import arrowforward from "../assets/icons/arrowforward.png";
import edit from "../assets/icons/edit.png";
import sendnoti from "../assets/icons/sendnoti.png";
import exportreport from "../assets/icons/export.png";
import deactivate from "../assets/icons/deactivate.png";
import Notification from "@/utils/Notification";
import BackBtn from "@/components/BackBtn";
import { fetchDoctorData } from "@/API/dataFetch";
import { truncateString } from "@/helpers/truncateString";
import { Permissions } from "@/constant/permissions";
import { toggleActive } from "@/API/sendData";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AdminListPDF from "@/components/PDF/AdminListPDF";
import { PlusIcon } from "lucide-react";

function AdminList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [admin, setAdmin] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showSendNotification, setShowSendNotification] = useState(false);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);
  const popupRef = useRef(null);

  // UseMemo to filter the admins based on search query
  const filteredAdmins = useMemo(() => {
    return admin.filter((admin) => {
      const fullName = `${admin.firstName || ""} ${
        admin.lastName || ""
      }`.toLowerCase();
      const id = admin._id ? admin._id.toLowerCase() : "";

      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        id.includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, admin]);

  // UseMemo to sort the filtered admins based on the sortConfig
  const sortedAdmins = useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredAdmins].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredAdmins;
  }, [filteredAdmins, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const navigate = useNavigate();

  const handleRowClick = (user) => {
    navigate(`/user/${selectedAdmin?.id}`, { state: { selectedAdmin } });
  };

  const handleThreeDotClick = (event, admin) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY - 3,
      left: rect.left + window.scrollX - 40,
    });
    setSelectedAdmin(admin);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedAdmin(null);
  };

  const deactivateUser = async () => {
    const updateAdmin = await toggleActive(selectedAdmin.id, {
      isActive: selectedAdmin.status === "active" ? false : true,
    });
    const updatedAdmins =
      updateAdmin &&
      admin.map((item) => {
        if (item.id === selectedAdmin.id) {
          if (item.status === "active") {
            return { ...item, status: "inactive" };
          } else {
            return { ...item, status: "active" };
          }
        }
        return item;
      });

    setAdmin(updatedAdmins);
  };

  const handleClose = () => {
    setShowSendNotification(false);
  };

  const handleSendNotificationClick = () => {
    setShowSendNotification(true);
    setPopupVisible(null);
  };

  const handleExportReport = () => {
    setIsDownloadComplete(false);
    setTimeout(() => {
      closePopup();
      setIsDownloadComplete(true);
    }, 2000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const fetchAdmins = async () => {
      try {
        const response = await fetchDoctorData();
        const transformedData = response.map((item) => ({
          id: item._id,
          full_name: `${item.firstName} ${item.lastName}`,
          permission: Object.keys(item.permission)
            .filter((key) => item.permission[key])
            .map((key) => Permissions[key])
            .join(", "),
          date_of_creation: new Date(item.createdAt).toLocaleDateString(),
          status: item.isActive ? "active" : "inactive",
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          password: item.password,
          permissions: item.permission,
        }));
        setAdmin(transformedData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdmins();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] flex">
      <Sidebar />
      <div className="flex-1 mx-[32px] mt-[32px]">
        <div className="flex justify-between items-center">
          <BackBtn />
          <Link to="createAdmin">
            <Button className="flex gap-3 items-center justify-center">
              <span>
                <FaPlus size={12} />
              </span>
              Create a new admin
            </Button>
          </Link>
        </div>
        <div className="mb-[24px]">
          <h1 className="text-[24px] font-[700]">Admin List</h1>
          <p className="text-[14px] font-[400] text-[#72849A]">
            Yano's admin user list
          </p>
        </div>
        <div className="bg-[#fff] rounded-[8px]">
          <form className="p-[16px]">
            <div className="flex items-center border rounded-[8px] md:w-2/3 lg:w-1/3 bg-[#fafafa] h-[40px] px-2">
              <img src={search} alt="" />
              <input
                className="w-full bg-transparent shadow-none border-none outline-none pl-2 placeholder-[#72849A]"
                placeholder="Search for users..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => requestSort("id")}>
                  <div className="flex items-center gap-2">
                    <div className="h-[18px] w-[18px] border-[#C3C4C3] border-[3px]" />
                    <div className="flex items-center gap-3">
                      <p className="text-[#1A3353] font-medium">User ID</p>
                      <img
                        src={downgray}
                        alt=""
                        className="w-[10px] h-[5px] object-contain"
                      />
                    </div>
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => requestSort("full_name")}
                  className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <p className="text-[#1A3353] font-medium">Full name</p>
                    <img
                      src={downgray}
                      alt=""
                      className="w-[10px] h-[5px] object-contain"
                    />
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => requestSort("permission")}
                  className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <p className="text-[#1A3353] font-medium">Permissions</p>
                    <img
                      src={downgray}
                      alt=""
                      className="w-[10px] h-[5px] object-contain"
                    />
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => requestSort("date_of_creation")}
                  className="cursor-pointer">
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
                <TableHead
                  onClick={() => requestSort("status")}
                  className="cursor-pointer">
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
              {sortedAdmins?.map((admin) => (
                <TableRow key={admin?.id}>
                  <TableCell>
                    <div className="flex items-center gap-[30px] text-[#00263E]">
                      <div className="h-[18px] w-[18px] border-[#C3C4C3] border-[3px]" />
                      {admin?.id}
                    </div>
                  </TableCell>
                  <TableCell className="text-[#3E79F7] cursor-pointer">
                    <Link to={`/user/${admin?.id}`} state={{ admin }}>
                      {admin?.full_name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-[#455560]">
                    {truncateString(admin?.permission, 30)}
                  </TableCell>
                  <TableCell className="text-[#455560]">
                    {admin?.date_of_creation}
                  </TableCell>
                  <TableCell>
                    <div
                      className={`w-[55px] h-[23px] rounded-[4px] ${
                        admin?.status == "active"
                          ? "text-[#138F5B] bg-[#E8F7F1]"
                          : "text-[#8F1C13] bg-[#F7E8EB] px-8"
                      }   flex justify-center items-center`}>
                      <p>{admin?.status}</p>
                    </div>
                  </TableCell>
                  <TableCell
                    onClick={(e) => handleThreeDotClick(e, admin)}
                    className="pl-[35px]">
                    <img className="cursor-pointer" src={threedot} alt="" />
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
              <img src={arrowforward} alt="" className="w-[24px] h-[24px]" />
            </div>
          </div>
        </div>
      </div>
      {popupVisible && selectedAdmin && (
        <div
          className="absolute shadow bg-white border rounded"
          style={{ top: popupPosition.top, left: popupPosition.left }}
          ref={popupRef}>
          <ul className="flex flex-col gap-[2px] m-[4px]">
            <li
              className="flex items-center gap-[10px] rounded-[6px] px-[16px] py-[12px] cursor-pointer hover:bg-[#F5F5F5]"
              onClick={closePopup}>
              <Link
                to={`/settings/adminList/editAdmin/${selectedAdmin.id}`}
                className="w-full flex flex-row gap-[10px] items-center cursor-pointer hover:bg-[#F5F5F5]"
                state={{ selectedAdmin }}>
                <img
                  src={edit}
                  alt=""
                  className="w-[16px] h-[16px] object-contain"
                />
                <p className="text-[#455560] text-[14px]">Edit user</p>
              </Link>
            </li>
            <li
              className="flex items-center gap-[10px] rounded-[6px] px-[16px] py-[12px] cursor-pointer hover:bg-[#F5F5F5]"
              onClick={handleSendNotificationClick}>
              <img
                src={sendnoti}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
              <p className="text-[#455560] text-[14px]">Send notification</p>
            </li>
            <li
              className="flex items-center gap-[10px] rounded-[6px] px-[16px] py-[12px] cursor-pointer hover:bg-[#F5F5F5]"
              onClick={handleExportReport}>
              <img
                src={exportreport}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
              <PDFDownloadLink
                document={<AdminListPDF user={selectedAdmin} />}
                fileName="Yano_report.pdf"
                onClick={() => {
                  setIsDownloadComplete(false);
                  handleExportReport();
                }}>
                {({ blob, url, loading, error }) =>
                  loading ? (
                    <p className="text-[#455560] text-[14px]">Downloading...</p>
                  ) : !loading && !error ? (
                    <p className="text-[#455560] text-[14px]">Export report</p>
                  ) : error ? (
                    <p className="text-[#ff0000] text-[14px]">Error...</p>
                  ) : null
                }
              </PDFDownloadLink>
            </li>
            <li
              className="flex items-center gap-[10px] rounded-[6px] px-[16px] py-[12px] cursor-pointer hover:bg-[#F5F5F5]"
              onClick={() => {
                deactivateUser(selectedAdmin);
                closePopup();
              }}>
              {selectedAdmin.status === "active" ? (
                <img
                  src={deactivate}
                  alt=""
                  className="w-[16px] h-[16px] object-contain"
                />
              ) : (
                <div className="w-[16px] h-[16px] rounded-full border-2 border-[#062B42] flex items-center justify-center">
                  <PlusIcon className="w-[14px] h-[14px] object-contain" />
                </div>
              )}

              <p className="text-[#455560] text-[14px]">
                {selectedAdmin.status === "active"
                  ? "Deactivate user"
                  : "Activate user"}
              </p>
            </li>
          </ul>
        </div>
      )}
      {showSendNotification && (
        <Notification
          name={selectedAdmin.full_name}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default AdminList;
