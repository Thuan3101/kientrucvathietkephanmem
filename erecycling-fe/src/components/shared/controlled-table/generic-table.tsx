import { useDeleteResource, useGetReourceList } from "@/lib/react-query/query";
import { GeneralColumnType } from "@/types/common";
import { GeneralApiResponse, GetQueryParams } from "@/types/utils";
import { Button, Pagination, PaginationProps, Spin, Table, TableColumnsType, Popconfirm } from "antd";
import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import TableFilter from "./table-filter";

type Props<T, U extends GeneralColumnType> = {
  resourceName: string;
  displayMapper: (data: T[]) => Partial<U>[];
  columns: TableColumnsType<U>;
  defaultPagination?: {
    pageSize: number;
    pageIndex: number;
  };
  defaultSort?: {
    sortCiteria: string;
  };
  enableFilter: boolean
};

function addActionHeader(columns: TableColumnsType) {
  return [...columns, { title: "Hành động", dataIndex: "action" }];
}

function addActionColumn<U extends GeneralColumnType>(
  rows: Partial<U>[],
  resourceName: string,
  isPendingDelete: boolean,
  deleteFn: UseMutateAsyncFunction<
    GeneralApiResponse<boolean>,
    Error,
    {
      id: React.Key;
      resourceName: string;
    },
    unknown
  >
) {
  const confirm = (id: React.Key) => {
    console.log(`Delete ${resourceName} with id: ${id}`);
    deleteFn({ id: id, resourceName: resourceName });
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };
  rows.forEach((row) => {
    row.action = (
      <div className="flex gap-1">
        <Link to={`/${resourceName}/edit?id=${row.key}`}>
          <Button className="" type="text" shape="circle" icon={<MdOutlineRemoveRedEye fontSize={18} />}></Button>
        </Link>
        <Popconfirm
          title="Xoá hoàn toàn "
          description={`Bạn có chắc xoá hoàn toàn ${resourceName} khỏi hệ thống?`}
          onConfirm={() => {
            confirm(row.key);
          }}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ loading: isPendingDelete }}
        >
          <Button className="" type="text" shape="circle" icon={<BiTrash fontSize={18} />}></Button>
        </Popconfirm>
      </div>
    );
  });
  return rows;
}

export function GenericTable<T, U extends GeneralColumnType>({ resourceName, displayMapper, columns, enableFilter = true }: Props<T, U>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [queries, setQueries] = useState<Partial<GetQueryParams>>({
    searchText: "",
    pageIndex: 0,
    pageSize: 10,
    orders: null,
  });

  const { isLoading, data: resourcePage } = useGetReourceList(queries, resourceName);
  const { mutateAsync: deleteFn, isPending } = useDeleteResource(resourceName);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({
      ...queries,
      pageIndex: page - 1,
    });
  };

  if (isLoading)
    return (
      <div>
        <Spin />
      </div>
    );
  return (
    <div className="font-inter">
      <TableFilter enable = {enableFilter}/>
      <Table
        rowSelection={rowSelection}
        columns={addActionHeader(columns)}
        dataSource={addActionColumn(displayMapper(resourcePage.data as T[]), resourceName, isPending, deleteFn)}
        size="large"
        pagination={false}
      />
      <div className="text-right">
        <Pagination
          current={queries.pageIndex + 1}
          pageSize={queries.pageSize}
          total={resourcePage.totalElements}
          className="mt-4"
          onChange={onChangePage}
        />
      </div>
    </div>
  );
}

export default GenericTable;
