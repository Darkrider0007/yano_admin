// import React, { useEffect, useState } from "react";
// import { Cell, Legend, Pie, PieChart } from "recharts";
// import initialData from "../constant/InitialData";
// import Dropdown from "@/components/Dropdown";

// const COLORS = ["#FF0000", "#0000FF"];
// const CustomLegend = ({ payload }) => {
//   return (
//     <div className="custom-legend flex gap-[32px] items-center justify-center">
//       {payload.map((entry, index) => (
//         <div
//           key={`item-${index}`}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: COLORS[index % COLORS.length],
//               width: 20,
//               height: 20,
//               borderRadius: 20,
//             }}
//           />
//           {entry.value}
//         </div>
//       ))}
//     </div>
//   );
// };

// function SexRatio() {
//   const [pieData, setPieData] = useState([]);
//   const [pieChartDays, setPieChartDays] = useState(7);

//   useEffect(() => {
//     const now = new Date();
//     const filteredData = initialData.filter((d) => {
//       const date = new Date(d.date);
//       return (now - date) / (24 * 60 * 60 * 1000) <= pieChartDays;
//     });
//     setPieData(filteredData);
//   }, [pieChartDays]);

//   const aggregateData = (data) => {
//     const counts = data.reduce(
//       (acc, item) => {
//         acc[item.sex]++;
//         return acc;
//       },
//       { Male: 0, Female: 0 }
//     );
//     const total = counts.Male + counts.Female;

//     return [
//       {
//         name: "Female",
//         value: counts.Female,
//         percent: (counts.Female / total) * 100,
//       },
//       {
//         name: "Male",
//         value: counts.Male,
//         percent: (counts.Male / total) * 100,
//       },
//     ];
//   };

//   const renderCustomizedLabel = ({
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     percent,
//     index,
//   }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="white"
//         textAnchor={x > cx ? "start" : "end"}
//         dominantBaseline="central"
//       >
//         {`${percent.toFixed(0)}%`}
//       </text>
//     );
//   };

//   const chartData = aggregateData(pieData);

//   // const handleDaysChange = (event) => {
//   //   setPieChartDays(parseInt(event.target.value));
//   // };
//   const options1 = [
//     { label: "Today", value: "0" },
//     { label: "Yesterday", value: "1" },
//     { label: "Last 7 days", value: "7" },
//     { label: "Last 28 days", value: "28" },
//     { label: "Last 90 days", value: "90" },
//   ];
//   const handleDayChange = (option) => {
//     setPieChartDays(option);
//   };
//   return (
//     <div className="bg-[#fff] rounded-[8px] p-[16px] relative">
//       <h2 className="text-[#00263E] font-[600] text-[16px]">Usage by Sex</h2>
//       <PieChart width={300} height={250}>
//         <Pie
//           data={chartData}
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           fill="#8884d8"
//           dataKey="value"
//           className="outline-none"
//           labelLine={false}
//           label={renderCustomizedLabel}
//         >
//           {chartData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Legend content={<CustomLegend />} />
//       </PieChart>
//       <div className="flex items-center justify-center w-full absolute bottom-[20px]">
//         {/* <select
//           id="days"
//           value={pieChartDays}
//           onChange={handleDaysChange}
//           className="p-2 border rounded bg-[#FAFAFA] outline-none"
//         >
//           <option value={3}>Last 3 days</option>
//           <option value={7}>Last 7 days</option>
//           <option value={30}>Last Month</option>
//         </select> */}
//         <Dropdown
//           options={options1}
//           onOptionSelect={handleDayChange}
//           defaultValue="7"
//         />
//       </div>
//     </div>
//   );
// }

// export default SexRatio;
import React, { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";
import Dropdown from "@/components/Dropdown";

const COLORS = ["#ED2F51", "#2F80ED"];

const CustomLegend = ({ payload }) => {
  return (
    <div className="custom-legend flex gap-[32px] items-center justify-center">
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
          <div
            style={{
              backgroundColor: COLORS[index % COLORS.length],
              width: 20,
              height: 20,
              borderRadius: 20,
            }}
          />
          {entry.value}
        </div>
      ))}
    </div>
  );
};

function SexRatio({ data }) {
  const [pieData, setPieData] = useState([]);
  const [pieChartDays, setPieChartDays] = useState(7);

  useEffect(() => {
    const now = new Date();
    const filteredData = data.filter((d) => {
      const date = new Date(d.createdAt);
      return (now - date) / (24 * 60 * 60 * 1000) <= pieChartDays;
    });
    setPieData(filteredData);
  }, [data, pieChartDays]);

  const aggregateData = (data) => {
    const counts = data.reduce(
      (acc, item) => {
        if (item.gender === "Male") {
          acc.Male += 1;
        } else if (item.gender === "Female") {
          acc.Female += 1;
        }
        return acc;
      },
      { Male: 0, Female: 0 }
    );
    const total = counts.Male + counts.Female;

    return [
      {
        name: "Female",
        value: counts.Female,
        percent: (counts.Female / total) * 100,
      },
      {
        name: "Male",
        value: counts.Male,
        percent: (counts.Male / total) * 100,
      },
    ];
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${percent.toFixed(0)}%`}
      </text>
    );
  };

  const chartData = aggregateData(pieData);

  const options1 = [
    { label: "Today", value: "1" },
    { label: "Yesterday", value: "2" },
    { label: "Last 7 days", value: "7" },
    { label: "Last 28 days", value: "28" },
    { label: "Last 90 days", value: "90" },
  ];

  const handleDayChange = (option) => {
    // console.log("Selected option:", option);
    setPieChartDays(parseInt(option.value));
    // console.log("pieChartDays:", pieChartDays); // This might show the old value due to async state update
  };

  return (
    <div className="h-[404px] w-[30%] bg-[#fff] rounded-[8px]  relative shadow">
      <div className="p-[16px]">
        <h2 className="text-[#00263E] font-[600] text-[16px]">Usage by Sex</h2>
        <div className="flex flex-col items-center">
          <PieChart width={200} height={250}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              className="outline-none"
              labelLine={false}
              label={renderCustomizedLabel}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend content={<CustomLegend />} />
          </PieChart>
        </div>
      </div>
      <div className="flex items-start justify-start pl-[20px] w-full pt-[11px] absolute border-t-2 border-[#eee]  bottom-[15px]">
        <div className="w-full flex-1 flex items-center">
          <Dropdown
            width={190}
            options={options1}
            onOptionSelect={handleDayChange}
            defaultValue="7"
          />
        </div>
      </div>
    </div>
  );
}

export default SexRatio;
