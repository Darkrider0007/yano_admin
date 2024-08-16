import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Dropdown from "@/components/Dropdown";

const COLORS = ["#9B51E0", "#2F80ED", "#219653", "#F2994A", "#CCCCCC"]; // Custom colors for countries and others

const aggregateDataByCountry = (data) => {
  const counts = data.reduce((acc, item) => {
    if (item.country && item.country !== "Unknown") {
      acc[item.country] = acc[item.country] ? acc[item.country] + 1 : 1;
    }
    return acc;
  }, {});

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return Object.keys(counts).map((country) => ({
    name: country,
    value: counts[country],
    percent: ((counts[country] / total) * 100).toFixed(2),
  }));
};

function CountryRatio({ data }) {
  const [days, setDays] = useState(7);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const differenceInTime = today - itemDate;
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return differenceInDays < days;
    });
    setFilteredData(filtered);
  }, [days, data]);

  let chartData = aggregateDataByCountry(filteredData).sort(
    (a, b) => b.value - a.value
  );

  // Get the top 4 countries
  const top4Data = chartData.slice(0, 4);
  const othersData = chartData.slice(4);

  // Aggregate others
  if (othersData.length > 0) {
    const othersCount = othersData.reduce(
      (acc, country) => acc + parseInt(country.value),
      0
    );
    const othersPercent = othersData
      .reduce((acc, country) => acc + parseFloat(country.percent), 0)
      .toFixed(2);
    top4Data.push({
      name: "Others",
      value: othersCount,
      percent: othersPercent,
    });
  }

  const topCountry = top4Data.reduce(
    (max, country) => (country.value > max.value ? country : max),
    { name: "", value: 0, percent: 0 }
  );

  const options1 = [
    { label: "Today", value: "0" },
    { label: "Yesterday", value: "1" },
    { label: "Last 7 days", value: "7" },
    { label: "Last 28 days", value: "28" },
    { label: "Last 90 days", value: "90" },
  ];

  const handleDayChange = (option) => {
    setDays(parseInt(option.value));
  };

  return (
    <div className="w-[22%] h-[405px] bg-[#fff] rounded-[8px] relative shadow">
      <div className="p-[16px]">
        <h2 className="text-[#00263E] font-semibold text-[16px]">
          Usage by Country
        </h2>
        <div className="flex justify-between mt-[24px]">
          <div>
            <p className="text-[14px] py-[6px] font-medium text-[#00263E]">
              {topCountry.name}
            </p>
            <p className="text-[20px] font-bold text-[#00263E]">
              {topCountry.percent}%
            </p>
            <p className="text-[13px] text-[#72849A]">Top Country</p>
          </div>
          <PieChart width={100} height={100} className="">
            <Pie
              data={top4Data}
              cx="50%"
              cy="50%"
              outerRadius={40}
              fill="#8884d8"
              dataKey="value"
              className="outline-none">
              {top4Data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <ul>
          {top4Data.map((country, index) => (
            <li
              key={index}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
              className="my-[10px] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                  }}
                />
                <p className="text-[14px] text-[#455560]">{country.name} :</p>
              </div>
              <p className="text-[#455560] font-semibold">{country.percent}%</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex items-start justify-start border-t-2 pt-[15px] absolute bottom-[15px]">
        <div className="pl-[20px]">
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

export default CountryRatio;
