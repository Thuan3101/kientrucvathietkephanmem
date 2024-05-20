import React, { ReactNode } from "react";
import { Avatar, Breadcrumb } from "antd";
import { BiPlus } from "react-icons/bi";
import Card from "@/components/shared/card";
import { PiArrowLineUp } from "react-icons/pi";
import type { TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { useGetAuth } from "@/lib/react-query/query";
import UserFilter from "@/components/user/user-filter";
import GenericTable from "@/components/shared/controlled-table/generic-table";
import { IUser } from "@/types/model";
import { getFullName } from "@/utils/app-utils";
import { GeneralColumnType } from "@/types/common";
import OutlineBtn from "@/components/shared/outline-btn";
import PrimaryButton from "@/components/shared/primary-button";
class ColumnType extends GeneralColumnType {
  name: ReactNode;
  email: string;
  roles: string;
  status: ReactNode;
}

const columns: TableColumnsType<ColumnType> = [
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Chức vụ",
    dataIndex: "roles",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

function mapper(data: IUser[]): Partial<ColumnType>[] {
  return data.map((user) => {
    const row: Partial<ColumnType> = {};
    row.key = user._id;
    row.email = user.email;
    row.name = (
      <div className="flex items-center gap-2">
        <Avatar className="" size={40} src={user.photo} />
        <span>{getFullName(user.firstName, user.lastName)}</span>
      </div>
    );
    row.roles = user.role
    row.status = user.active ? (
      <div className="font-medium text-center inline-block px-2 py-0.5 rounded-lg text-green-600 bg-[rgba(34,_197,_94,_0.16)]">
        Active
      </div>
    ) : (
      <div className="font-medium text-center inline-block px-2 py-0.5 rounded-lg text-red-600 bg-[rgba(255,_86,_48,_0.16)]">
        Banned
      </div>
    );
    return row;
  });
}

const UserManagement = () => {
  const { isLoading } = useGetAuth();
  if (isLoading) return <>Loading ....</>;
  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h2 className="text-text-dark text-2xl font-bold mb-2">Người dùng</h2>
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
                  title: "Người dùng",
                },
                {
                  title: "Danh sách người dùng",
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
          <Link to={"/user/new"}>
            <PrimaryButton className="flex gap-1 items-center text-sm px-3">
              <BiPlus fontSize={18} />
              Thêm người dùng
            </PrimaryButton>
          </Link>
        </div>
      </div>

      <UserFilter />
      <Card className="mt-5 pt-0 px-0">
        <GenericTable resourceName="user" columns={columns} displayMapper={mapper} enableFilter={false} />
      </Card>
    </>
  );
};

export default UserManagement;
