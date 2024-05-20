import { Col, Row, Select, SelectProps, Input } from "antd";
import React from "react";
import type { SearchProps } from "antd/es/input/Search";
const { Search } = Input;

const UserFilter = () => {
  const options: SelectProps["options"] = [
    {
      label: "Khách hàng",
      value: "customer",
    },
    {
      label: "Nhân viên",
      value: "staff",
    },
    {
      label: "Quản trị viên",
      value: "admin",
    },
  ];

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);

  const log = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Select
            className="rounded-md"
            size="large"
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Quyền hạn"
            // defaultValue={["a10", "c12"]}
            onChange={handleChange}
            options={options}
          />
        </Col>
        <Col span={16}>
          <Search
            size="large"
            className="rounded-md"
            placeholder="Tìm người dùng"
            allowClear
            onSearch={onSearch}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UserFilter;
