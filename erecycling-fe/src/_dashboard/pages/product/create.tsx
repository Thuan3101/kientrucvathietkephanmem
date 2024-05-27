import { useAddNewResource, useEditResource, useGetResourceDetails } from "@/lib/react-query/query";
import {IProduct1, ProductStatus } from "@/types/model";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Image } from "antd";
import FullScreenLoader from "@/components/shared/fullscreen-loader";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  InputNumber,
  DatePicker,
  DatePickerProps,
} from "antd";
import { newInquiryBreadcrumb } from "@/data/component-data";
import Card from "@/components/shared/card";
import UploadArea from "@/components/inquiry/upload-area";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
const { Option } = Select;

const generateUID = () => {
  if (!localStorage.getItem("new_product_uid")) {
    const id = uuidv4();
    localStorage.setItem("new_product_uid", id);
    return id;
  } else {
    return localStorage.getItem("new_product_uid");
  }
};

const CreateUpdateProduct = () => {
  const location = useLocation();
  const mode = location.pathname.split("/").pop();
  const [imgs, setImgs] = useState([]);
  const [hasData, setHasData] = useState(false);
  const { mutateAsync: newFn } = useAddNewResource<IProduct1>("assessment/product");
  const { mutateAsync: updateFn } = useEditResource<IProduct1>("assessment/product");
  const [productId, setProductId] = useState(null);
  const { data: myProduct } = useGetResourceDetails<IProduct1>(productId, "assessment/product");
  const [form] = Form.useForm();
  const [purchaseDate, setPurchaseDate] = useState<Date>(dayjs().toDate());
  const queryClient = useQueryClient();

  const [product, setProduct] = useState<IProduct1>({
    uuid: generateUID(),
    cost: 0,
    price: 0,
    images: [],
    name: "",
    sku: "",
    likeNewPercent: 0,
    dateOfPurchase: new Date(),
    status: ProductStatus.INSTOCK,
    model: "",
    updatedAt: new Date(),
    _id: "",
  });

  const getInitValues = () => {
    if (mode == "add") return {};
    return {
      cost: myProduct.data.cost,
      price: myProduct.data.price,
      images: myProduct.data.images,
      name: myProduct.data.name,
      sku: myProduct.data.sku,
      likeNewPercent: myProduct.data.likeNewPercent,
      dateOfPurchase: myProduct.data.dateOfPurchase,
      status: myProduct.data.status,
      model: myProduct.data.model,
    };
  };

  const retrieveUploadedUrls = (data: string[]) => {
    console.log(data);
    setImgs(data);
  };

  const submitForm = () => {
    console.log(form.getFieldsValue());
    console.log
    const data = {
      ...product,
      cost: form.getFieldValue("cost"),
      price: form.getFieldValue("price"),
      images: imgs,
      name: form.getFieldValue("name"),
      sku: form.getFieldValue("sku"),
      likeNewPercent: form.getFieldValue("likeNewPercent"),
      dateOfPurchase: dayjs(purchaseDate).toDate(),
      status: form.getFieldValue("likeNewPercent"),
      model: form.getFieldValue("model"),
    };
    setProduct(data);

    console.log(data);

    if (mode === "new") {
      newFn({ data: data, resourceName: "assessment/product" });
    } else {
      updateFn({ data: data, resourceName: "assessment/product" });
    }
  };

  const onChange: DatePickerProps["onChange"] = (date, _) => {
    setPurchaseDate(date.toDate());
  };

  useEffect(() => {
    if (mode === "edit") {
      setProductId(location.search.split("id=").at(1));
    } else {
      queryClient.removeQueries({ queryKey: ["get_assessment/product_details"], type: "inactive" });
    }
  }, [location.search, mode]);

  useEffect(() => {
    if (myProduct?.data) {
      setProduct(myProduct.data);
      setHasData(true);
    }
  }, [myProduct]);

  if (mode == "edit" && !hasData) {
    return <FullScreenLoader />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">{mode === "new" ? "Thêm mới người dùng" : "Chỉnh sửa thông tin"} </h2>
      <Breadcrumb className="text-base font-inter mt-4" items={newInquiryBreadcrumb} />
      <Form
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        form={form}
        layout="horizontal"
        style={{ width: 1200 }}
        initialValues={getInitValues()}
      >
        <Row gutter={24} className="mt-4">
          <Col span={15}>
            <Card>
              <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: "Please input!" }]}>
                <Input width={"100%"} />
              </Form.Item>
              <Form.Item name="model" label="Model sản phẩm" rules={[{ required: true, message: "Please input!" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="sku" label="SKU" rules={[{ required: true, message: "Please input!" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="likeNewPercent" label="Loại hàng">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="status" label="Trạng thái sản phẩm" rules={[{ required: true }]}>
                <Select allowClear>
                  <Option value={ProductStatus.INSTOCK}>Còn hàng</Option>
                  <Option value={ProductStatus.SOLD}>Đã bán</Option>
                </Select>
              </Form.Item>
              <Form.Item name="cost" label="Chi phí thu mua">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="price" label="Giá bán dự kiến">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Ngày kích hoạt">
                <DatePicker onChange={onChange} defaultValue={dayjs(purchaseDate)} />
              </Form.Item>
              <h3 className="font-semibold mb-3">Hình ảnh</h3>
              <div className="mt-5">
                <label className="inline-block font-medium mb-2" htmlFor="prod-desc">
                  Tải ảnh sản phẩm
                </label>
                <UploadArea
                  allowedTypes={["jpg"]}
                  getResult={retrieveUploadedUrls}
                  folderPath="/product"
                  existingImages={product.images == undefined ? [] : product.images}
                />
              </div>

              <Form.Item className="mt-7">
                <Button type="primary" htmlType="submit" className="create-assessment-form-button" onClick={submitForm}>
                  {mode == "new" ? "Tạo mẫu đánh giá" : "Cập nhật"}
                </Button>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateUpdateProduct;
