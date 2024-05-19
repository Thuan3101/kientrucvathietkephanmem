"use client";

import React, { useState } from "react";
import Card from "../shared/card";
import type { MenuProps } from "antd";
import { Button, Dropdown, Divider } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import ProductItemXs from "./product-item-xs";
const items: MenuProps["items"] = [
  { key: "today", label: "Hôm nay" },
  { key: "week", label: "Trong tuần" },
  { key: "month", label: "Trong tháng" },
];

const topSales = [
  {
    id: "1",
    imgUrl: "/images/sample-products/product_1.jpg",
    name: "Nike Air Force 1 NDESTRUKT",
    price: 1250000,
    countInStock: 20,
    countOrdered: 15,
  },
  {
    id: "1",
    imgUrl: "/images/sample-products/product_2.jpg",
    name: "Nike Air Force 1 NDESTRUKT",
    price: 1250000,
    countInStock: 20,
    countOrdered: 15,
  },
  {
    id: "1",
    imgUrl: "/images/sample-products/product_3.jpg",
    name: "Foundations Matte Flip Flop",
    price: 1250000,
    countInStock: 20,
    countOrdered: 15,
  },
  {
    id: "1",
    imgUrl: "/images/sample-products/product_4.jpg",
    name: "Nike Air Zoom Pegasus 37 A.I.R. Chaz hahaha",
    price: 1250000,
    countInStock: 20,
    countOrdered: 15,
  },
  {
    id: "1",
    imgUrl: "/images/sample-products/product_5.jpg",
    name: "Arizona Soft Footbed Sandal",
    price: 1250000,
    countInStock: 20,
    countOrdered: 15,
  },
];

const TopSaleProduct = () => {
  const [filterBy, setFilterBy] = useState("today");

  const handleChangeFilterBy: MenuProps["onClick"] = (e) => {
    setFilterBy(e.key);
  };

  return (
    <Card className={"w-full"}>
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Top sản phẩm bán chạy</h3>
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: [`${filterBy}`],
            onClick: handleChangeFilterBy,
          }}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
        >
          {/* <Space> */}
          <Button type="text" className="flex items-center gap-1">
            {
              (items.filter((item) => (item as MenuItemType).key == filterBy).at(0) as MenuItemType)
                .label
            }
            <IoIosArrowDown />
          </Button>

          {/* </Space> */}
        </Dropdown>
      </div>

      <Divider />
      {topSales.map((item, idx) => {
        return (
          <ProductItemXs
            key={idx}
            id={item.id}
            countInStock={item.countInStock}
            countOrdered={item.countOrdered}
            name={item.name}
            imgUrl={item.imgUrl}
            price={item.price}
          />
        );
      })}
    </Card>
  );
};

export default TopSaleProduct;
