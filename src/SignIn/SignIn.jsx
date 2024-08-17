import React, { useContext, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "@/context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.trim() !== "") {
      setEmailError("");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.trim() !== "") {
      setPasswordError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setEmailError("Enter an email address");
    }
    if (password.trim() === "") {
      setPasswordError("Plese enter password");
    }
    if (email && password) {
      const result = await dispatch(loginUser({ email, password }));
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/overview"); // replace with your desired path after login
      }
    }
  };
  const { setUser } = useContext(UserContext);
  const isEmailError = !email;
  const isPasswordError = !password;
  const { status, error } = useSelector((state) => state.auth);
  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <div className=" w-[340px] h-[394px] bg-[#fff] py-[24px] px-5 rounded-[8px]">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[#00263E] text-3xl font-semibold ">Sign In</h1>

          <p className="text-[#00263E] text-[14px] mt-[20px]">Email</p>
          <div
            className={`flex items-center h-[49px] border ${
              isEmailError ? "border-[#DADCE0]" : "border-[#DADCE0]"
            } bg-[#fafafa] px-[16px] py-[16px] rounded-[8px] focus-within:border-green-500`}>
            <MdOutlineMail />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className=" flex-1 outline-none px-2 bg-transparent"
            />
          </div>
          <div className="h-[24px]">
            {/* {isEmailError && ( */}
            <p className="text-red-500  text-[12px] flex items-center gap-[8px]">
              {/* <span className="w-[12px] h-[12px] text-[10px] rounded-[50%] flex items-center justify-center text-[#fff] bg-red-500">
                !
              </span> */}
              {emailError}
            </p>
            {/* )} */}
          </div>
          <p className="text-[#00263E] text-[14px] mt-[5px]">Password</p>
          <div
            className={`flex items-center h-[49px] border ${
              isPasswordError ? "border-[#DADCE0]" : "border-[#DADCE0]"
            } bg-[#fafafa] px-[16px] py-[16px] rounded-[8px] focus-within:border-green-500`}>
            <CiLock />
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className=" flex-1 outline-none px-2 bg-transparent"
            />
            <Link
              className="text-[#72849A80] text-[12px]"
              onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Link>
          </div>
          <div className="h-[24px]">
            {/* {isPasswordError && ( */}
            <p className="text-red-500  text-[12px] flex items-center gap-[8px]">
              {/* <span className="w-[12px] h-[12px] text-[10px] rounded-[50%] flex items-center justify-center text-[#fff] bg-red-500">
                !
              </span> */}
              {passwordError}
            </p>
            {/* )} */}
          </div>
          <Link to="/ForgotPassword">
            <p className=" text-[#00263E] text-center mt-[10px] underline">
              Forgot your Password?
            </p>
          </Link>
          <button
            type="submit"
            className=" w-[100%] h-[50px] bg-[#00263E] text-[#fff] rounded-[8px] mt-[10px] font-[500]">
            Log in
          </button>
          {error && (
            <p className="text-red-500 text-center mt-[10px]">
              Your email address or password is wrong!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
