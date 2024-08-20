// import React, { useState } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import initialData from "../constant/InitialData";
// import Dropdown from "@/components/Dropdown";

// function BarGraph() {
//   const [selectedCountry, setSelectedCountry] = useState("All");
//   const [selectedMetric, setSelectedMetric] = useState("bloodGlucose");

//   const handleCountryChange = (option) => {
//     setSelectedCountry(option);
//     // console.log(selectedCountry);
//   };

//   // const handleMetricChange = (e) => {
//   //   setSelectedMetric(e.target.value);
//   // };

//   const filteredBarData =
//     selectedCountry === "All"
//       ? initialData
//       : initialData.filter((item) => item.country === selectedCountry);

//   const ageRanges = [
//     "18-24",
//     "25-34",
//     "35-44",
//     "45-54",
//     "55-64",
//     "65-74",
//     "75+",
//   ];
//   const ageRangeData = ageRanges.map((range) => {
//     const [min, max] = range.includes("+")
//       ? [75, 110]
//       : range.split("-").map((age) => parseInt(age));
//     const groupData = filteredBarData.filter(
//       (item) => item.age >= min && item.age <= max
//     );
//     const avgMetric =
//       groupData.reduce((sum, item) => sum + item[selectedMetric], 0) /
//         groupData.length || 0;
//     return { ageRange: range, avgMetric };
//   });
//   const maxAvgMetric = Math.max(...ageRangeData.map((item) => item.avgMetric));
//   // const [selectedOption, setSelectedOption] = useState(null);

//   const options1 = [
//     { label: "Today", value: "All" },
//     { label: "Yesterday", value: "USA" },
//     { label: "Last 7 days", value: "Canada" },
//     { label: "Last 28 days", value: "India" },
//     { label: "Last 90 days", value: "Japan" },
//   ];
//   const options2 = [
//     { label: "Blood Glucose", value: "bloodGlucose" },
//     { label: "Oxygen Saturation", value: "oxygenSat" },
//     { label: "Body Temperature", value: "bodytemp" },
//     { label: "Heart Rate", value: "heartrate" },
//     { label: "Blood Pressure", value: "bp" },
//     { label: "Mood", value: "mood" },
//   ];
//   // const handleOptionSelect = (option) => {
//   //   selectedCountry(option);
//   //   console.log(selectedCountry);
//   // };
//   const handleOption = (option) => {
//     setSelectedMetric(option);
//     // console.log(selectedMetric);
//   };
//   return (
//     <div className="bg-[#fff] rounded-[8px] p-[16px] relative">
//       <h1 className="text-[#00263E] font-[600] text-[16px]">Age</h1>
//       <BarChart width={500} height={250} data={ageRangeData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="ageRange" />
//         <YAxis orientation="right" />
//         <Tooltip />
//         <Bar dataKey="avgMetric">
//           {ageRangeData.map((entry, index) => (
//             <Cell
//               key={`cell-${index}`}
//               fill={entry.avgMetric === maxAvgMetric ? "#416712" : "#76BC21"}
//             />
//           ))}
//         </Bar>
//       </BarChart>
//       <div className="flex gap-4  absolute bottom-[20px]">
//         <label>
//           {/* <select
//             value={selectedCountry}
//             onChange={handleCountryChange}
//             className="p-2 border rounded bg-[#FAFAFA] outline-none"
//           >
//             <option value="All">All Country</option>
//             <option value="USA">USA</option>
//             <option value="Canada">Canada</option>
//           </select> */}
//           <Dropdown
//             options={options1}
//             onOptionSelect={handleCountryChange}
//             defaultValue="Canada"
//           />
//         </label>
//         <label>
//           {/* <select
//             value={selectedMetric}
//             onChange={handleMetricChange}
//             className="p-2 border rounded bg-[#FAFAFA] outline-none"
//           >
//             <option value="bloodGlucose">Blood Glucose</option>
//             <option value="oxygenSat">Oxygen Saturation</option>
//             <option value="bodytemp">Body Temperature</option>
//             <option value="heartrate">Heart Rate</option>
//             <option value="bp">Blood Pressure</option>
//             <option value="mood">Mood</option>
//           </select> */}
//           <Dropdown
//             options={options2}
//             onOptionSelect={handleOption}
//             defaultValue="bloodGlucose"
//           />
//         </label>
//       </div>
//     </div>
//   );
// }

// export default BarGraph;
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import Dropdown from "@/components/Dropdown";
import { fetchData } from "@/API/dataFetch";

const endpoints = {
  bloodGlucose: "blood-glucose",
  bloodOxygen: "blood-oxygen",
  bodyTemp: "body-temp",
  heartRate: "heart-rate",
  bloodPressure: "blood-pressure",
  mood: "mood",
};

function  BarGraph() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedMetric, setSelectedMetric] = useState("bloodGlucose");
  const [ageRangeData, setAgeRangeData] = useState([]);

  const handleDayChange = (option) => {
    setSelectedCountry(option.value);
  };

  const handleMetricChange = (option) => {
    setSelectedMetric(option.value);
  };

  const ageRanges = [
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65-74",
    "75+",
  ];

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(endpoints[selectedMetric]);
      // console.log("Fetched Data:", data); // Log fetched data

      if (data && data.length > 0) {
        const filteredData =
          selectedCountry === "All"
            ? data
            : data.filter((item) => item.country === selectedCountry);

        // console.log("Filtered Data:", filteredData); // Log filtered data

        const calculatedAgeRangeData = ageRanges.map((range) => {
          const [min, max] = range.includes("+")
            ? [75, 110]
            : range.split("-").map((age) => parseInt(age));

          const groupData = filteredData.filter(
            (item) => item.age >= min && item.age <= max
          );

          // console.log(`Data for ${range}:`, groupData); // Log group data for each range

          const avgMetric =
            groupData.reduce((sum, item) => sum + item.data, 0) /
              groupData.length || 0;

          return { ageRange: range, avgMetric };
        });

        // console.log("Calculated Age Range Data:", calculatedAgeRangeData); // Log final calculated data

        setAgeRangeData(calculatedAgeRangeData);
      } else {
        console.error("No data returned or data structure is incorrect.");
      }
    };

    getData();
  }, [selectedCountry, selectedMetric]);

  const maxAvgMetric = Math.max(...ageRangeData.map((item) => item.avgMetric));

  const daysFilter = [
    { label: "Today", value: "All" },
    { label: "Yesterday", value: "USA" },
    { label: "Last 7 days", value: "Canada" },
    { label: "Last 28 days", value: "India" },
    { label: "Last 90 days", value: "Japan" },
  ];

  const options2 = [
    { label: "Blood Glucose", value: "bloodGlucose" },
    { label: "Oxygen Saturation", value: "bloodOxygen" },
    { label: "Body Temperature", value: "bodyTemp" },
    { label: "Heart Rate", value: "heartRate" },
    { label: "Blood Pressure", value: "bloodPressure" },
    { label: "Mood", value: "mood" },
  ];

  return (
    <div className=" h-[404px] w-[45%] bg-[#fff] rounded-[8px]  relative shadow">
      <h1 className="text-[#00263E] font-[600] text-[16px] p-[16px]">Age</h1>
      {ageRangeData.length > 0 ? (
        <BarChart width={520} height={280} data={ageRangeData}>
          <CartesianGrid stroke="#EEEEEE" vertical={false} />
          <XAxis
            dataKey="ageRange"
            tick={{ fill: "#455560", fontSize: 14 }}
            tickLine={false}
          />
          <YAxis
            domain={[0, maxAvgMetric || 40]}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#455560",
              fontSize: 14,
            }}
            tickFormatter={(value) => `${value}%`}
          />
          <Bar dataKey="avgMetric">
            {ageRangeData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.avgMetric === maxAvgMetric ? "#416712" : "#76BC21"}
              />
            ))}
          </Bar>
        </BarChart>
      ) : (
        <p className="text-center text-red-500">No data available</p>
      )}
      <div className="border-t-2 border-[#eee]" />
      <div className="flex gap-4  absolute bottom-[15px] pl-[30px] ">
        <label>
          <Dropdown
            options={daysFilter}
            onOptionSelect={handleDayChange}
            defaultValue="Canada"
            width={190}
          />
        </label>
        <label>
          <Dropdown
            width={250}
            options={options2}
            onOptionSelect={handleMetricChange}
            defaultValue="bloodGlucose"
          />
        </label>
      </div>
    </div>
  );
}

export default BarGraph;
