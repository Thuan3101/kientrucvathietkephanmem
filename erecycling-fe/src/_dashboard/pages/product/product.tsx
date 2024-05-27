import Card from "@/components/shared/card";
import GenericTable from "@/components/shared/controlled-table/generic-table";
import OutlineBtn from "@/components/shared/outline-btn";
import PrimaryButton from "@/components/shared/primary-button";
import { useGetAuth } from "@/lib/react-query/query";
import { GeneralColumnType } from "@/types/common";
import { IProduct1, ProductStatus } from "@/types/model";
import { Avatar, Breadcrumb, TableColumnsType } from "antd";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { BiPlus } from "react-icons/bi";
import { PiArrowLineUp } from "react-icons/pi";
import { Link } from "react-router-dom";

class ColumnType extends GeneralColumnType {
  name: ReactNode;
  image: ReactNode;
  model: string;
  likeNewPercent: number;
  status: ProductStatus;
  cost: number;
  price: number;
  dateOfPurchase: string;
}

const columns: TableColumnsType<ColumnType> = [
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
  },
  {
    title: "Giá nhập",
    dataIndex: "cost",
  },
  {
    title: "Giá bán",
    dataIndex: "price",
  },
  {
    title: "Loại hàng",
    dataIndex: "likeNewPercent",
  },

  {
    title: "Ngày kích hoạt BH",
    dataIndex: "dateOfPurchase",
  },
];

function mapper(data: IProduct1[]): Partial<ColumnType>[] {
  return data.map((product) => {
    const row: Partial<ColumnType> = {};
    row.key = product._id;
    row.cost = product.cost;
    row.price = product.price;
    row.likeNewPercent = product.likeNewPercent;
    row.dateOfPurchase = dayjs(product.dateOfPurchase).format("DD/MM/YYYY");
    row.image = (
      <div>
        <Avatar shape="square" className="" size={48} src={product.images[0]} />
      </div>
    );
    row.name = (
      <div>
        <p className="text-text-dark font-medium">{product.name}</p>
        <p className="text-gray-500 text-sm">{product.model}</p>
      </div>
    );
    // row.c = product. ? (
    //   <div className="font-medium text-center inline-block px-2 py-0.5 rounded-lg text-green-600 bg-[rgba(34,_197,_94,_0.16)]">
    //     Active
    //   </div>
    // ) : (
    //   <div className="font-medium text-center inline-block px-2 py-0.5 rounded-lg text-red-600 bg-[rgba(255,_86,_48,_0.16)]">
    //     Banned
    //   </div>
    // );
    return row;
  });
}

const Products = () => {
  const { isLoading } = useGetAuth();
  if (isLoading) return <>Loading ....</>;
  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h2 className="text-text-dark text-2xl font-bold mb-2">Sản phẩm</h2>
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
                  title: "Sản phẩm",
                },
                {
                  title: "Danh sách sản phẩm",
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
          {/* <Link to={"/products/create"}>
            <PrimaryButton className="flex gap-1 items-center text-sm px-3">
              <BiPlus fontSize={18} />
              Thêm sản phẩm
            </PrimaryButton>
          </Link> */}
        </div>
      </div>

      <Card className="mt-5 pt-0 px-0">
        <GenericTable resourceName="assessment/product" columns={columns} displayMapper={mapper} enableFilter={true} />
      </Card>
    </>
  );
};

export default Products;
