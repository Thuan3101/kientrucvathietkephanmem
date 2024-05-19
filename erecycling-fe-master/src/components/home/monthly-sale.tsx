import Card from "../shared/card";
import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";

const MonthlySale = () => {
  return (
    <Card className={"green-dark-gradient-bg text-[#fff_!important]"}>
      <div className="flex justify-between">
        <h4 className="font-medium text-base">Doanh số trong tháng</h4>
        <Link to={"/home"}>Xem báo cáo</Link>
      </div>
      <div className="mt-3">
        <h1 className="text-2xl font-bold">18.000.000</h1>
        <p className="flex gap-1 items-center mt-1 opacity-65">
          <BsArrowUpRight fontWeight={800} />
          <span className="font-semibold ">+2.26%</span> so với tháng trước
        </p>
      </div>
    </Card>
  );
};

export default MonthlySale;
