import BasicInfo from "@/components/product/basic-info";
import DeliveryInfo from "@/components/product/delivery-info";
import OtherInfo from "@/components/product/other-info";
import SellInfo from "@/components/product/sell-info";
import Card from "@/components/shared/card";
import { createProductBreadcumbs } from "@/data/component-data";
import { Breadcrumb, Button, Steps, message } from "antd";
import React, { useState } from "react";
import { PiArticle, PiCurrencyCircleDollar, PiTruck, PiInfo } from "react-icons/pi";
type Props = {};

const steps = [
  {
    title: "Thông tin cơ bản",
    icon: <PiArticle />,
    content: <BasicInfo />,
  },
  {
    title: "Thông tin bán hàng",
    icon: <PiCurrencyCircleDollar />,
    content: <SellInfo />,
  },
  {
    title: "Vận chuyển",
    icon: <PiTruck />,
    content: <DeliveryInfo />,
  },
  {
    title: "Thông tin khác",
    icon: <PiInfo />,
    content: <OtherInfo />,
  },
];

const CreateProduct = (props: Props) => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));
  return (
    <div>
      <h2 className="text-text-dark text-2xl font-bold mb-2">Thêm sản phẩm</h2>
      <Breadcrumb
        separator={
          <span className="inline-block h-[5px_!important] w-[5px_!important] rounded-full bg-gray-300"></span>
        }
        className="text-base font-inter mt-4"
        items={createProductBreadcumbs}
      />
      <Card className="mt-6">
        <div className="flex h-full">
          <Steps direction="vertical" current={current} items={items} className="flex-[1] h-[250px]" />
          <div className="flex-[4]">{steps[current].content}</div>
        </div>

        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success("Processing complete!")}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreateProduct;
