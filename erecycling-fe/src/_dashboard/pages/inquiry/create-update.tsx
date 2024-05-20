import { useAddNewResource, useEditResource, useGetResourceDetails } from "@/lib/react-query/query";
import { IInquiry, InquiryStatus } from "@/types/model";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import FullScreenLoader from "@/components/shared/fullscreen-loader";
import { Breadcrumb, Button, Col, Form, Input, Row, Select, Space } from "antd";
import { newInquiryBreadcrumb } from "@/data/component-data";
import { PiPlusDuotone, PiTrash } from "react-icons/pi";
import Card from "@/components/shared/card";
import UploadArea from "@/components/inquiry/upload-area";

const generateUID = () => {
  if (!localStorage.getItem("new_uid")) {
    const id = uuidv4();
    localStorage.setItem("new_uid", id);
    return id;
  } else {
    return localStorage.getItem("new_uid");
  }
};

const CreateUpdateInquiry = () => {
  const location = useLocation();
  const mode = location.pathname.split("/").pop();
  const [images, setImages] = useState([]);
  const [hasData, setHasData] = useState(false);
  const { mutateAsync: newFn, isPending } = useAddNewResource<IInquiry>("inquiry");
  const { mutateAsync: updateFn } = useEditResource("inquiry");
  const [inquiryId, setInquiryId] = useState(null);
  const { data: myInquiry, isSuccess } = useGetResourceDetails<IInquiry>(inquiryId, "inquiry");
  const [form] = Form.useForm();

  const [inquiry, setInquiry] = useState<Partial<IInquiry>>({
    uuid: generateUID(),
    product: {
      model: "",
      name: "",
      attributes: [],
      images: [...images],
    },
    status: InquiryStatus.NEW,
    isMoneyReturned: false,
    title: "",
  });

  const getInitValues = () => {
    return {
      title: inquiry.title,
      productModel: inquiry.product.model,
      productName: inquiry.product.name,
      productAttributes: inquiry.product.attributes,
      productImages: [inquiry.product.images],
      status: inquiry.status,
      isMoneyReturned: inquiry.isMoneyReturned,
    };
  };

  const retrieveUploadedUrls = (data: string[]) => {
    console.log(data);
    setImages(data);
  };

  const submitForm = () => {
    console.log(form.getFieldsValue());
    if (mode === "new") {
      newFn({ data: inquiry, resourceName: "inquiry" });
    } else {
      updateFn({ data: inquiry, resourceName: "inquiry" });
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setInquiryId(location.search.split("id=").at(1));
    }
  }, [location.search, mode]);

  useEffect(() => {
    if (myInquiry?.data) {
      setInquiry(myInquiry.data);
      setHasData(true);
    }
  }, [myInquiry]);

  if (!myInquiry || !hasData || isPending || (!isSuccess && mode == "edit")) {
    return <FullScreenLoader />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">{mode === "new" ? "Thêm mới người dùng" : "Chỉnh sửa thông tin"} </h2>
      <Breadcrumb className="text-base font-inter mt-4" items={newInquiryBreadcrumb} />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        form={form}
        layout="horizontal"
        style={{ width: 1200 }}
        initialValues={getInitValues()}
      >
        <Row gutter={24} className="mt-4">
          <Col span={15}>
            <Card>
              <h3 className="mb-2 font-medium">Thông tin yêu cầu</h3>
              <Form.Item name={"title"}>
                <Input placeholder="Tiêu đề" />
              </Form.Item>
              <Form.Item name={"status"}>
                <Select placeholder="Trạng thái của yêu cầu">
                  <Select.Option value= {InquiryStatus.NEW}>Mới</Select.Option>
                  <Select.Option value= {InquiryStatus.IN_PROGRESS}>Đang xử lý</Select.Option>
                  <Select.Option value= {InquiryStatus.DONE}>Đã xử lý</Select.Option>
                </Select>
              </Form.Item>
              <h3 className="mb-2 font-medium">Thông tin sản phẩm</h3>
              <Form.Item name={"productName"}>
                <Input placeholder="Tên máy" value={inquiry.product?.name} />
              </Form.Item>

              <Form.Item name={"productModel"}>
                <Input placeholder="Model máy" value={inquiry.product?.model} />
              </Form.Item>
              <h3 className="mb-2">Thuộc tính</h3>
              <Form.List name="productAttributes">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, "key"]}
                          rules={[{ required: true, message: "Missing key" }]}
                        >
                          <Input placeholder="Tên thuộc tính (ví dụ: kích thước, màu sắc)" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "value"]}
                          rules={[{ required: true, message: "Missing value" }]}
                        >
                          <Input placeholder="Giá trị tương ứng (ví dụ: 5.1 inch, đỏ)" />
                        </Form.Item>
                        <PiTrash onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PiPlusDuotone />}>
                        Thêm thuộc tính
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <div className="mt-5">
                <label className="inline-block font-medium mb-2" htmlFor="prod-desc">
                  Tải ảnh sản phẩm
                </label>
                <UploadArea
                  allowedTypes={["jpg"]}
                  getResult={retrieveUploadedUrls}
                  folderPath="/inquiry/product"
                  existingImages={inquiry.product?.images == undefined ? [] : inquiry.product.images}
                />
              </div>
              <Form.Item className="mt-3">
                <Button type="primary" htmlType="submit" onClick={submitForm}>
                  {mode == 'edit'? "Cập nhật": "Tạo yêu cầu"}
                </Button>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateUpdateInquiry;
