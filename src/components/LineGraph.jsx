import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const unitMapping = {
  bloodGlucose: "ml/mol",
  oxygenSat: "%",
  bodytemp: "°C",
  heartrate: "bpm",
  bloodPressure: "mmHg",
  mood: "mmol/L",
};

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    const formattedValue = Number(payload[0].value).toFixed(2);

    return (
      <div className="bg-white p-2 shadow-3xl rounded">
        <p className="text-[#72849A] text-[12px]">Wed 25</p>
        <p className="text-[#00263E] text-[14px] font-medium">
          Avg. {formattedValue} {unit}
        </p>
      </div>
    );
  }
  return null;
};

const domainMapping = {
  bloodGlucose: [0, 40],
  oxygenSat: [0, 100],
  bodyTemperature: [30, 45],
  heartRate: [50, 100],
  bloodPressure: [80, 120],
  mood: [0, 10],
};

const LineGraph = ({ data, valueKey }) => {
  const tickFormatter = (tick) => tick.slice(-2);

  return (
    <div className="w-[100%] h-[330px]">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ left: 20, right: 10 }}>
          <CartesianGrid stroke="#EEEEEE" vertical={false} />
          <XAxis dataKey="date" tickFormatter={tickFormatter} />
          <YAxis
            domain={domainMapping[valueKey]}
            axisLine={false}
            tickLine={false}
            orientation="right"
            tickFormatter={(value) => `${value} ${unitMapping[valueKey] || ""}`}
            tick={{ fill: "#455560", fontSize: 12 }}
          />
          <Tooltip
            content={<CustomTooltip unit={unitMapping[valueKey]} />}
            cursor={{
              stroke: "#ABABAB",
              strokeDasharray: "2 4",
              strokeWidth: 1,
              strokeDashoffset: 5,
            }}
          />
          <Line
            type="linear"
            dataKey={valueKey}
            stroke="#76BC21"
            strokeWidth={3}
            activeDot={{
              stroke: "#76BC21",
              strokeWidth: 10,
              strokeDasharray: "3 0",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
