// import React from "react";

// function UserCard({ title, data, img }) {
//   return (
//     <div className="flex flex-1 items-center gap-3 border px-[16px] py-[8px] rounded-[8px] bg-white ">
//       <div className="w-[32px] h-[32px] rounded-[50%] flex items-center justify-center bg-[#DEEFCA]">
//         {img}
//       </div>

//       <div>
//         <p className="text-[12px] text-lightgray font-[400] ">{title}</p>
//         <p className="text-[16px] text-darkblue font-[500] ">{data}</p>
//       </div>
//     </div>
//   );
// }

// export default UserCard;

import React from "react";

function UserCard({ title, data, img }) {
  return (
    <div className="flex flex-1 items-center gap-3 border px-[16px] py-[8px] rounded-[8px] bg-white h-[80px]">
      <div className="w-[32px] h-[32px] rounded-[50%] flex items-center justify-center bg-[#DEEFCA]">
        {img}{" "}
      </div>

      <div>
        {/* Title with appropriate styling */}
        <p className="text-[12px] text-lightgray font-[400]">{title}</p>
        {/* Data with appropriate styling */}
        <p className="text-[16px] text-darkblue font-[500]">{data}</p>
      </div>
    </div>
  );
}

export default UserCard;
