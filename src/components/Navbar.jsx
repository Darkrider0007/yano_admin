import React, { useState, useEffect, useRef, useContext } from "react";
import Logo from "../assets/Logo.png";
import patient from "../assets/patient.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import spain from "../assets/icons/spa.png";
import us from "../assets/icons/usa.png";
import brazil from "../assets/icons/brasil.png";
import downside from "../assets/icons/downside.png";
import UserContext from "@/context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [language, setLanguage] = useState(false);
  const [isOption, setIsOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const options = [
    { label: "English", img: us, value: "EN" },
    { label: "Spanish", img: spain, value: "SP" },
    { label: "Portuguese", img: brazil, value: "PO" },
  ];

  // const { user, setUser } = useContext(UserContext);
  // console.log(user);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOption(false);
      }
    };

    if (isOption) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOption]);

  const toggleDropdown = () => {
    setIsOption(!isOption);
  };
  const navigate = useNavigate();
  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setSelectedValue(option.value);
    setIsOption(false);
  };

  // const handleClick = () => {
  //   setIsLogin(false);
  //   setUser(false);
  // };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
    // setUser(null);
    setIsLogin(false);
  };

  return (
    <div className="h-[80px] bg-[#fff] flex items-center flex-row justify-between px-[32px] sticky z-50 top-0 border-b">
      {/* to={user ? "/overview" : "/signin"} */}
      <Link>
        <img src={Logo} alt="" className="w-[104px] h-[40px]" />
      </Link>
      <div className="flex gap-[20px] items-center">
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <div>
            <button
              type="button"
              className="w-[57px] flex gap-1 items-center  justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-[#00263E] hover:bg-gray-50 focus:outline-none"
              onClick={toggleDropdown}
            >
              {selectedValue || "EN"}
              <img src={downside} alt="" />
            </button>
          </div>

          {isOption && (
            <div
              className="origin-top-right absolute  -right-4 mt-2 w-[148px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="p-1" role="none">
                {options.map((option) => (
                  <a
                    key={option.value}
                    href="#"
                    className={`flex items-center gap-[10px]  text-[#455560] px-4 py-4 text-sm hover:bg-gray-100 `}
                    role="menuitem"
                    onClick={() => handleOptionClick(option)}
                  >
                    <img
                      src={option.img}
                      alt=""
                      className="w-[16px] h-[16px] object-cover"
                    />
                    {option.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        {user && <div className="border h-[40px] border-[#EEEEEE] " />}
        {/* dropdown end  */}

        {user ? (
          <div className="flex items-center gap-2 ">
            <div>
              <p className="text-darkblue font-[600]">
                {user.userData.firstName} {user.userData.lastName}
              </p>
              <p className="text-lightgray text-[12px] text-right">
                {user.userData.speciality}
                {user?.speciality}
              </p>
            </div>
            <img
              src={patient}
              alt=""
              className="w-[40px] h-[40px] rounded-[50%] object-cover"
            />
            {isLogin ? (
              <IoIosArrowUp
                size={25}
                className="cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              />
            ) : (
              <IoIosArrowDown
                size={25}
                className="cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              />
            )}
          </div>
        ) : (
          ""
        )}

        {isLogin && (
          <div
            onClick={handleLogout}
            className="w-[150px] h-[60px] bg-white absolute right-10 top-[70px] cursor-pointer shadow rounded-[8px] flex justify-center items-center gap-2"
          >
            <MdLogout fontWeight={600} />
            <p className="text-darkblue font-[600]">Sign out</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
