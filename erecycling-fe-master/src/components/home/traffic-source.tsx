/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Card from "../shared/card";
import { Select } from "antd";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

const TrafficSource = () => {
  const [period, setPeriod] = useState("month");
  const serires = [44, 50, 31, 15];
  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ['Search engine', 'Facebook', 'Tiktok', 'Others'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Card>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Nguồn truy cập</h1>
        <Select
          defaultValue="month"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "week", label: "7 ngày" },
            { value: "month", label: "30 ngày" },
            { value: "year", label: "365 ngày" },
          ]}
        />
      </div>
      <div className="mt-4">
        <Chart type="donut" options={options} series={serires} height={350}  width={"100%"} />
      </div>
    </Card>
  );
};

export default TrafficSource;
