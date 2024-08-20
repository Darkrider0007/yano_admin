import React from "react";
import { NavLink } from "react-router-dom";
import overview from "../assets/icons/overview.png";
import user from "../assets/icons/user.png";
import settings from "../assets/icons/settings.png";
import callcenter from "../assets/icons/callcenter.png";
import overviewgray from "../assets/icons/overviewgray.png";
import usergray from "../assets/icons/usergray.png";
import callcentergray from "../assets/icons/callcentergray.png";
import settingsgray from "../assets/icons/settingsgray.png";
const sidebarData = [
  {
    navigate: "/overview",
    name: "Overview",
    imgActive: overview,
    img: overviewgray,
  },
  {
    navigate: "/user",
    name: "Users",
    imgActive: user,
    img: usergray,
  },
  {
    navigate: "/callCenter",
    name: "Call Center",
    imgActive: callcenter,
    img: callcentergray,
  },
];

function Sidebar() {
  return (
    <div className="w-[200px] border-r bg-[#fff]">
      <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0 ">
        <div className=" overflow-auto pl-2 sticky top-[90px]">
          <nav className="grid gap-[20px] items-start  text-sm font-medium">
            {sidebarData.map((item) => (
              <NavLink
                key={item.name}
                className={({ isActive }) =>
                  ` ml-[16px] flex items-center text-[14px]  gap-3 rounded-l-[10px] pl-4 pr-9 py-3  transition-all hover:text-[#00263E] ${
                    isActive
                      ? "bg-[#F5F5F5] border-r-4 border-darkgreen text-[#00263E] font-medium"
                      : "text-[#455560]"
                  }`
                }
                to={item.navigate}>
                {({ isActive }) => (
                  <>
                    <img
                      className="w-[18px] h-[18px] object-contain"
                      src={isActive ? item.imgActive : item.img}
                      alt={item.name}
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
            <div className="border-t w-full" />
            <NavLink
              className={({ isActive }) =>
                ` ml-[16px]  flex items-center gap-3 rounded-l-[10px]  pl-4 pr-9 py-3 transition-all hover:text-[#00263E]  ${
                  isActive
                    ? "bg-[#F5F5F5] border-r-4 border-darkgreen text-[#00263E] font-medium"
                    : "text-[#455560]"
                }`
              }
              to="/Settings">
              {({ isActive }) => (
                <>
                  <img
                    className="w-[18px] h-[18px] object-contain"
                    src={isActive ? settings : settingsgray}
                  />
                  Settings
                </>
              )}
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
