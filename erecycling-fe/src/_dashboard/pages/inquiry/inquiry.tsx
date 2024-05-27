import React, { ReactNode } from "react";
import { Breadcrumb, Button } from "antd";
import { BiPlus } from "react-icons/bi";
import Card from "@/components/shared/card";
import { PiArrowLineUp } from "react-icons/pi";
import type { TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { useGetAuth } from "@/lib/react-query/query";
import UserFilter from "@/components/user/user-filter";
import GenericTable from "@/components/shared/controlled-table/generic-table";
import { IInquiry, InquiryStatus } from "@/types/model";
import { GeneralColumnType } from "@/types/common";
import OutlineBtn from "@/components/shared/outline-btn";
import PrimaryButton from "@/components/shared/primary-button";
import dayjs from "dayjs";
class ColumnType extends GeneralColumnType {
  title: string;
  productName: string;
  productModel: string;
  dateCreated: string;
  status: ReactNode;
}

const columns: TableColumnsType<ColumnType> = [
  {
    title: "Tiêu đề",
    dataIndex: "title",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "productName",
  },
  {
    title: "Model sản phẩm",
    dataIndex: "productModel",
  },
  {
    title: "Ngày tạo yêu cầu",
    dataIndex: "dateCreated",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

function mapper(data: IInquiry[], role = "customer"): Partial<ColumnType>[] {
  return data.map((inquiry) => {
    const row: Partial<ColumnType> = {};
    row.key = inquiry._id;
    row.title = inquiry.title;
    (row.productName = inquiry.product.name),
      (row.dateCreated = dayjs(inquiry.createdAt).format("DD/MM/YYYY HH:mm")),
      (row.productModel = inquiry.product.model),
      (row.status =
        inquiry.status == InquiryStatus.IN_PROGRESS ? (
          <div className="font-medium text-center inline-block px-2 py-0.5 rounded-lg text-green-600 bg-[rgba(34,_197,_94,_0.16)]">
            {inquiry.status}
          </div>
        ) : (
          <div className="font-medium text-center inline-block px-2 py-0.5 rounded-lg text-red-600 bg-[rgba(255,_86,_48,_0.16)]">
            {inquiry.status}
          </div>
        ));
    if (role != "customer") {
      row.action =
        inquiry.status == InquiryStatus.NEW ? (
          <Link to={`/assessment/new?inquiry-id=${inquiry._id}`}>
            <Button>Tiếp nhận yêu cầu</Button>
          </Link>
        ) : (
          <></>
        );
    }
    return row;
  });
}

const MyInquiry = () => {
  const { data: user, isLoading } = useGetAuth();
  if (isLoading) return <>Loading ....</>;
  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h2 className="text-text-dark text-2xl font-bold mb-2">Yêu cầu tái chế</h2>
          <div className="flex justify-between items-center">
            <Breadcrumb
              className="text-base font-inter"
              separator={
                <span className="inline-block h-[5px_!important] w-[5px_!important] rounded-full bg-gray-300"></span>
              }
              items={[
                {
                  href: "",
                  title: "Trang chủ",
                },

                {
                  href: "",
                  title: "Yêu cầu tái chế",
                },
                {
                  title: "Danh sách yêu cầu",
                },
              ]}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <OutlineBtn className="flex gap-1 items-center text-sm px-3">
            <PiArrowLineUp fontSize={18} />
            Xuất dữ liệu
          </OutlineBtn>
          <Link to={"/inquiry/new"}>
            <PrimaryButton className="flex gap-1 items-center text-sm px-3">
              <BiPlus fontSize={18} />
              Tạo mới yêu cầu
            </PrimaryButton>
          </Link>
        </div>
      </div>

      {/* <UserFilter /> */}
      <Card className="mt-5 pt-0 px-0">
        {user.role == "customer" ? (
          <GenericTable resourceName="inquiry" columns={columns} displayMapper={mapper} enableFilter={false} />
        ) : (
          <GenericTable
            resourceName="inquiry"
            columns={columns}
            displayMapper={mapper}
            maunalAddAction={true}
            enableFilter={false}
          />
        )}
      </Card>
    </>
  );
};

export default MyInquiry;
