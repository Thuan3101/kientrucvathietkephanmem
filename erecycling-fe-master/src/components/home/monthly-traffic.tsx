import { useState } from "react";
import Card from "../shared/card";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

function MonthlyTraffic() {
  const [opt, _] = useState<ApexOptions>({
    chart: {
      height: 150,
      type: "area",
    },
    stroke: {
      curve: "smooth",
    },

    dataLabels: {
      enabled: false,
    },
    colors: ['#FAAF00'],

    xaxis: {
      type: "datetime",
      categories: [
        "2023-09-02T00:00:00.000Z",
        "2023-09-10T00:00:00.000Z",
        "2023-09-20T00:00:00.000Z",
        "2023-09-30T00:00:00.000Z",
      ],
    },
    grid: {
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    yaxis: {
      min: 100,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  });

  const [series, setSeries] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries>([
    {
      name: "Lượt truy cập",
      data: [150, 200, 175, 333],
    },
  ]);
  return (
    <Card>
      <h3 className="font-semibold text-xl">Lưu lượng truy cập</h3>
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-center font-medium text-text-soft">Tháng</p>
          <h2 className="text-xl font-semibold">9.28K</h2>
          <span className="flex items-center gap-1 text-sm text-primary">
            <BsArrowUp /> 4.63%
          </span>
        </div>

        <div>
          <p className="text-center font-medium text-text-soft">Tuần</p>
          <h2 className="text-xl font-semibold">9.28K</h2>
          <span className="flex items-center gap-1 text-primary">
            <BsArrowUp /> 4.63%
          </span>
        </div>

        <div>
          <p className="text-center font-medium text-text-soft">Ngày</p>

          <h2 className="text-xl font-semibold">9.28K</h2>
          <span className="flex items-center gap-1 text-red-600">
            <BsArrowDown /> 4.63%
          </span>
        </div>
      </div>
      <div className="chart-area mt-4">
        <Chart type="area" options={opt} series={series} height={150}  width={"100%"} />
      </div>
    </Card>
  );
}

export default MonthlyTraffic;
