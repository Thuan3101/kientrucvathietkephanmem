/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Card from "../shared/card";
import { Dropdown, Button} from "antd";
import type { MenuProps } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { IoIosArrowDown } from "react-icons/io";
const itemsYear: MenuProps["items"] = [
  { key: -1, label: "Tất cả" },
  {
    key: "2020",
    label: "2020",
  },
  {
    key: "2021",
    label: "2021",
  },
  {
    key: "2022",
    label: "2022",
  },
  {
    key: "2023",
    label: "2023",
  },
  {
    key: "2024",
    label: "2024",
  },
];

const itemMonth: MenuProps["items"] = [
  {
    key: "-1",
    label: "Tất cả",
  },
  ...Array(12)
    .fill(null)
    .map((_, idx) => {
      return {
        key: Number(idx + 1).toString(),
        label: `Tháng ${idx + 1}`,
      };
    }),
];

const SaleStatistics = () => {
  const [year, setYear] = useState<string>("-1");
  const [month, setMonth] = useState<string>("-1");
  const [opt, useOpt] = useState<ApexOptions>({
    chart: {
      height: 400,
      type: "line",
    },
    stroke: {
      colors: ["rgb(255, 171, 0)"],
      width: [0, 4],
    },

    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
      style: {
        colors: ["#00A76F"],
      },
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
    ],
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Doanh thu",
        },
      },
      {
        opposite: true,
        title: {
          text: "Đơn hàng",
        },
        min: 10,
        // max: 100,
      },
    ],
    plotOptions: {
      bar: {
        columnWidth: "20%",
        // borderRadius: 510,
      },
    },
  });

  const [series, setSeries] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries>([
    {
      name: "Doanh thu",
      data: [2500000, 5024000, 1234200, 6000000, 4500000, 3500000, 1500000],
      color: "#00A76F",
      type: "column",
    },
    {
      name: "Số lượng",
      data: [30, 32, 45, 32, 34, 36, 41],
      color: "rgb(255, 171, 0)",
      type: "line",
    },
  ]);

  const handleChangeYear: MenuProps["onClick"] = (e) => {
    setYear(e.key);
  };

  const handleChangeMonth: MenuProps["onClick"] = (e) => {
    setMonth(e.key);
  };

  if (!series || !opt) {
    return <>Loading</>
  }

  return (
    <Card className={"w-full flex-wrap"}>
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-xl">Doanh số bán hàng</h4>
        <div className="flex gap-2">
          <Dropdown
            menu={{
              items: itemsYear,
              selectable: true,
              defaultSelectedKeys: [`${year}`],
              onClick: handleChangeYear,
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            {/* <Space> */}
            <Button type="text" className="flex items-center gap-1">
              {
                (
                  itemsYear
                    .filter((item) => (item as MenuItemType).key == year)
                    .at(0) as MenuItemType
                ).label
              }
              <IoIosArrowDown />
            </Button>

            {/* </Space> */}
          </Dropdown>

          <Dropdown
            menu={{
              items: itemMonth,
              selectable: true,
              defaultSelectedKeys: [`${month}`],
              onClick: handleChangeMonth,
              disabled: year == "-1",
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button type="text" className="flex gap-1 items-center" disabled={year == "-1"}>
              {
                (
                  itemMonth
                    .filter((item) => (item as MenuItemType).key == month)
                    .at(0) as MenuItemType
                ).label
              }
              <IoIosArrowDown />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="chart-area">
        <Chart type="line" options={opt} series={series} height={400} width={'100%'} />
      </div>
    </Card>
  );
};

export default SaleStatistics;
