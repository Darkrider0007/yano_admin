import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log(email);
    if (email) {
      navigate("/ResetPasswordLink");
    }
  };

  const isEmailError = isSubmitted && !email;
  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <div className=" w-[350px] h-[394px] bg-[#fff] py-[24px] px-5 rounded-[8px]">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[#00263E] text-3xl font-semibold ">
            Forgot your password?
          </h1>
          <p className="mt-[10px]">
            Enter your email address below and we'll send your password reset
            instructions.
          </p>
          <p className="text-[#00263E] text-[14px] mt-[20px]">Email</p>
          <div
            className={`flex items-center h-[49px] border ${
              isEmailError ? "border-red-500" : "border-[#DADCE0]"
            } bg-[#fafafa] px-[16px] py-[16px] rounded-[8px] focus-within:border-green-500`}>
            <MdOutlineMail />
            <input
              type="email"
              value={email}
              placeholder="email@test.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className=" flex-1 outline-none px-2 bg-transparent"
            />
          </div>
          <div className="h-[24px]">
            {isEmailError && (
              <p className="text-red-500  text-[12px] flex items-center gap-[8px]">
                <span className="w-[12px] h-[12px] text-[10px] rounded-[50%] flex items-center justify-center text-[#fff] bg-red-500">
                  !
                </span>
                Account with this email address does not exist
              </p>
            )}
          </div>
          <button
            type="submit"
            className=" w-[100%] h-[50px] bg-[#00263E] text-[#fff] rounded-[8px] mt-[10px] font-[500] ">
            Send instructions
          </button>
          <Link to="/">
            <p className=" text-[#00263E] text-center mt-[10px] mb-[20px] underline">
              Back to log in
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
