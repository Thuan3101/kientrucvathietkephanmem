import { useAddNewResource, useEditResource, useGetAuth, useGetResourceDetails } from "@/lib/react-query/query";
import { IInquiry, InquiryStatus } from "@/types/model";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import FullScreenLoader from "@/components/shared/fullscreen-loader";
import { Breadcrumb, Button, Col, Form, Input, Row, Select, Space } from "antd";
import { newInquiryBreadcrumb } from "@/data/component-data";
import { PiPlusDuotone, PiTrash } from "react-icons/pi";
import Card from "@/components/shared/card";
import UploadArea from "@/components/inquiry/upload-area";
import { useQueryClient } from "@tanstack/react-query";

const generateUID = () => {
  if (!localStorage.getItem("new_inquiry_uid")) {
    const id = uuidv4();
    localStorage.setItem("new_inquiry_uid", id);
    return id;
  } else {
    return localStorage.getItem("new_inquiry_uid");
  }
};

const CreateUpdateInquiry = () => {
  const location = useLocation();
 
  const mode = location.pathname.split("/").pop();
  const [images, setImages] = useState([]);
  const [hasData, setHasData] = useState(false);
  const { mutateAsync: newFn, isPending } = useAddNewResource<IInquiry>("inquiry");
  const { mutateAsync: updateFn } = useEditResource<IInquiry>("inquiry");
  const [inquiryId, setInquiryId] = useState(null);
  const { data: myInquiry, isSuccess } = useGetResourceDetails<IInquiry>(inquiryId, "inquiry");
  const [form] = Form.useForm();
  const {data: user} = useGetAuth()
  const queryClient = useQueryClient();
  // console.log(iId)
  const [inquiry, setInquiry] = useState<Partial<IInquiry>>({
    uuid: generateUID(),
    product: {
      model: "",
      name: "",
      attributes: [],
      images: [...images],
    },
    cashbackAmount: 0,
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
    // console.log(data);
    setImages(data);
  };

  const submitForm = () => {
    console.log(form.getFieldsValue());
    const data = {
      ...inquiry,
      title: form.getFieldValue("title"),
      status:  form.getFieldValue("status"),
      cashbackAmount: form.getFieldValue("cashbackAmount"),
      product: {
        model: form.getFieldValue("productModel"),
        name: form.getFieldValue("productName"),
        attributes: form.getFieldValue("productAttributes"),
        images: [...inquiry.product.images, ...images],
      },
    };
    setInquiry(data);

    console.log(data);

    if (mode === "new") {
      newFn({ data: data, resourceName: "inquiry" });
    } else {
      updateFn({ data: data, resourceName: "inquiry" });
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setInquiryId(location.search.split("id=").at(1));
    } else {
      queryClient.removeQueries({ queryKey: ["get_inquiry_details"], type: "inactive" });
    }
  }, [location.search, mode]);

  useEffect(() => {
    if (myInquiry?.data) {
      setInquiry(myInquiry.data);
      setHasData(true);
    }
  }, [myInquiry]);

  if (mode == "edit" && (!hasData || isPending || !myInquiry)) {
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
                <Select placeholder="Trạng thái của yêu cầu" disabled = {user.role == 'customer'}>
                  <Select.Option value={InquiryStatus.NEW}>Mới</Select.Option>
                  <Select.Option value={InquiryStatus.IN_PROGRESS}>Đang xử lý</Select.Option>
                  <Select.Option value={InquiryStatus.DONE}>Đã xử lý</Select.Option>
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

              <Form.Item name={"cashbackAmount"}>
                <Input placeholder="Tiền hoàn" />
              </Form.Item>

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
                  {mode == "edit" ? "Cập nhật" : "Tạo yêu cầu"}
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
