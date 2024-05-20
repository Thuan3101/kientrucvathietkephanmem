import Card from "@/components/shared/card";
import GenericTable from "@/components/shared/controlled-table/generic-table";
import OutlineBtn from "@/components/shared/outline-btn";
import UserFilter from "@/components/user/user-filter";
import { useGetAuth } from "@/lib/react-query/query";
import { GeneralColumnType } from "@/types/common";
import { AssessmentStatus, IAssessment } from "@/types/model";
import { getFullName } from "@/utils/app-utils";
import { Avatar, Breadcrumb, Button, TableColumnsType } from "antd";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { BiPlus } from "react-icons/bi";
import { PiArrowLineUp } from "react-icons/pi";
import { Link } from "react-router-dom";

class ColumnType extends GeneralColumnType {
  checker: ReactNode;
  inqruiryTitle: string;
  inquiryMaker: ReactNode;
  inquiryProduct: ReactNode;
  dateCreated: string;
  status: ReactNode;
}

const columns: TableColumnsType<ColumnType> = [
  {
    title: "Người kiểm tra",
    dataIndex: "checker",
  },
  {
    title: "Tên yêu cầu",
    dataIndex: "inqruiryTitle",
  },
  {
    title: "Người tạo yêu cầu",
    dataIndex: "inquiryMaker",
  },
  {
    title: "Thông tin sản phẩm",
    dataIndex: "inquiryProduct",
  },
  {
    title: "Ngày tạo mẫu đánh giá",
    dataIndex: "dateCreated",
  },

  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

function mapper(data: IAssessment[]): Partial<ColumnType>[] {
  return data.map((assessment) => {
    const row: Partial<ColumnType> = {};
    row.key = assessment._id;
    row.inqruiryTitle = assessment.inquiry.title;

    row.checker = (
      <div className="flex items-center gap-2">
        <Avatar className="" size={40} src={assessment.checker.photo} />
        <span>{getFullName(assessment.checker.firstName, assessment.checker.lastName)}</span>
      </div>
    );

    row.inquiryMaker = (
      <span>{getFullName(assessment.inquiry.maker.firstName, assessment.inquiry.maker.lastName)}</span>
    );

    (row.dateCreated = dayjs(assessment.updatedAt).format("DD/MM/YYYY HH:mm")),
      (row.inquiryProduct = assessment.inquiry.product.name),
      (row.status =
        assessment.status == AssessmentStatus.NEW ? (
          <div className="font-medium text-center inline-block px-2 py-0.5 rounded-lg text-green-600 bg-[rgba(34,_197,_94,_0.16)]">
            {assessment.status}
          </div>
        ) : (
          <div className="font-medium text-center inline-block px-2 py-0.5 rounded-lg text-red-600 bg-[rgba(255,_86,_48,_0.16)]">
            {assessment.status}
          </div>
        ));
    return row;
  });
}
const AssessmentList = () => {
  const { isLoading } = useGetAuth();
  if (isLoading) return <>Loading ....</>;
  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h2 className="text-text-dark text-2xl font-bold mb-2">Mẫu đánh giá của tôi</h2>
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
                  title: "Phiếu đánh giá sản phẩm",
                },
                {
                  title: "Tất cả",
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
          <Link to={"/assessment/new"}>
            <Button className="flex gap-1 items-center text-sm px-3">
              <BiPlus fontSize={18} />
              Tạo phiếu đánh giá
            </Button>
          </Link>
        </div>
      </div>

      <UserFilter />
      <Card className="mt-5 pt-0 px-0">
        <GenericTable resourceName="assessment" columns={columns} displayMapper={mapper} enableFilter={false} />
      </Card>
    </>
  );
};

export default AssessmentList;
