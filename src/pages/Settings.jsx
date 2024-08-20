import React from "react";
import { CiLock } from "react-icons/ci";
import { Link } from "react-router-dom";
import { LuUsers } from "react-icons/lu";
import { MdOutlinePeopleOutline } from "react-icons/md";
import Sidebar from "@/components/Sidebar";
import admin from "../assets/icons/Group.png";
import lock from "../assets/icons/lock.png";

function Settings() {
  return (
    <div className="h-[calc(100vh-80px)] flex">
      <Sidebar />
      <div className=" ml-[32px] mt-[32px]">
        <div className=" mb-[24px] ">
          <h1 className="text-[24px] font-bold">Settings</h1>
          <p className="text-[14px] text-[#72849A]">Yono's general settings</p>
        </div>

        <div className=" flex items-center gap-4">
          <Link to="changePassword">
            <div className=" w-[305px] h-[85px] bg-[#FFFFFF] hover:shadow-3xl flex items-center justify-between px-5 rounded-[8px] border border-[#eee]">
              <div>
                <h1 className="text-[14px] font-semibold">Security</h1>
                <p className="text-[#72849A] text-[13px]">
                  change your password
                </p>
              </div>
              <div className="w-[48px] h-[48px] rounded-[50%] bg-[#76BC21] flex items-center justify-center">
                <img
                  src={lock}
                  alt=""
                  className="w-[24px] h-[16px] object-contain"
                />
              </div>
            </div>
          </Link>
          <Link to="adminList" className=" ">
            <div className=" w-[305px] h-[85px] bg-[#FFFFFF] hover:shadow-3xl flex items-center justify-between px-5 rounded-[8px] border border-[#eee]">
              <div>
                <h1 className="text-[14px] font-semibold">Manage Roles</h1>
                <p className="text-[#72849A] text-[13px]">
                  Create new user's roles.
                </p>
              </div>
              <div className="w-[48px] h-[48px] rounded-[50%] bg-[#76BC21] flex items-center justify-center">
                <img
                  src={admin}
                  alt=""
                  className="w-[24px] h-[24px] object-contain"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;
