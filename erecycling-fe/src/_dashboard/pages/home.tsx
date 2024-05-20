import MonthlySale from "@/components/home/monthly-sale";
import MonthlyTraffic from "@/components/home/monthly-traffic";
import SaleStatistics from "@/components/home/sale-statistics";
import TopSaleProduct from "@/components/home/top-sale-products";
import TrafficSource from "@/components/home/traffic-source";
import Card from "@/components/shared/card";
import { Col, Row } from "antd";
import { BsBagCheckFill, BsFillPeopleFill, BsCashCoin, BsQrCode } from "react-icons/bs";

const HomePage = () => {
  return (
    <div>
      <section>
        <h2 className="pb-8 text-2xl font-semibold">Chào mừng quay trở lại 👋</h2>
        <div className="sale-overview flex gap-7">
          <div className="flex-1">
            <Card
              className={"flex-col items-center py-10 green-gradient text-[#004B50_!important]"}
            >
              <BsBagCheckFill className="green-gradient inline-block w-[100%]" fontSize={42} />
              <h3 className="text-3xl font-extrabold mb-2 mt-5 mx-auto">500</h3>
              <span className="font-medium mx-auto">Đơn hàng</span>
            </Card>
          </div>
          <div className="flex-1">
            <Card className={"flex-col items-center py-10 blue-gradient text-[#003768_!important]"}>
              <BsFillPeopleFill className="blue-gradient inline-block w-[100%]" fontSize={42} />
              <h3 className="text-3xl font-extrabold mb-2 mt-5">1200</h3>
              <span>Khách hàng</span>
            </Card>
          </div>

          <div className="flex-1">
            <Card
              className={"flex-col items-center py-10 orange-gradient text-[#7A4100_!important]"}
            >
              <BsQrCode className="orange-gradient inline-block w-[100%]" fontSize={42} />
              <h3 className="text-3xl font-extrabold mb-2 mt-5">200</h3>
              <span>Sản phẩm</span>
            </Card>
          </div>

          <div className="flex-1">
            <Card className={"flex-col items-center py-10 red-gradient text-[#7A0916_!important]"}>
              <BsCashCoin className="red-gradient inline-block w-[100%]" fontSize={42} />
              <h3 className="text-3xl font-extrabold mb-2 mt-5">145.78M</h3>
              <span>Tổng thu nhập</span>
            </Card>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <Row gutter={16}>
          <Col span={14}>
            <SaleStatistics />
          </Col>
          <Col span={10}>
            <div className="mb-3">
              <MonthlySale />
            </div>
            <div>
              <MonthlyTraffic />
            </div>
          </Col>
        </Row>
      </section>

      <section className="mt-8">
        <Row gutter={16}>
          <Col span={14}>
            <TopSaleProduct />
            {/* <SaleStatistics /> */}
          </Col>
          <Col span={10}>
            <TrafficSource />
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default HomePage;
