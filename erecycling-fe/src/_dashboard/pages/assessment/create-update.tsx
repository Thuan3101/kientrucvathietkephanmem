import { useAddNewResource, useEditResource, useGetResourceDetails } from "@/lib/react-query/query";
import { AssessmentStatus, IAssessment, InquiryStatus, ProductStatus } from "@/types/model";
import { useEffect, useState } from "react";
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
  Switch,
  DatePicker,
  DatePickerProps,
} from "antd";
import { newInquiryBreadcrumb } from "@/data/component-data";
import Card from "@/components/shared/card";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getFullName } from "@/utils/app-utils";

const { Option } = Select;

const generateUID = () => {
  if (!localStorage.getItem("new_assessment_uid")) {
    const id = uuidv4();
    localStorage.setItem("new_assessment_uid", id);
    return id;
  } else {
    return localStorage.getItem("new_assessment_uid");
  }
};

const CreateUpdateAssessment = () => {
  const location = useLocation();
  const mode = location.pathname.split("/").pop();
  const [hasData, setHasData] = useState(false);
  const { mutateAsync: newFn, isPending } = useAddNewResource<IAssessment>("assessment");
  const { mutateAsync: updateFn } = useEditResource<IAssessment>("assessment");
  const [assessmentId, setAssessmentId] = useState(null);
  const { data: myAssessment, isSuccess } = useGetResourceDetails<IAssessment>(assessmentId, "assessment");
  const [purchaseDate, setPurchaseDate] = useState<Date>(dayjs().toDate());
  const [form] = Form.useForm();
  const searchParams = new URLSearchParams(location.search);
  const iId = searchParams.get("inquiry-id");
  const queryClient = useQueryClient();

  const [assessment, setAssessment] = useState<Partial<IAssessment>>({
    uuid: generateUID(),

    title: "",
    product: {
      model: "",
      name: "",
      images: [],
      sku: "",
      likeNewPercent: 0,
      status: ProductStatus.INSTOCK,
      cost: 0,
      price: 0,
      dateOfPurchase: purchaseDate,
      updatedAt: undefined,
      _id: "",
    },

    status: AssessmentStatus.NEW,
    isMoneySentToUser: false,
    updatedAt: dayjs().toDate(),
    cashbackAmount: 0,
    result: "",

    inquiry: {
      maker: {
        id: "",
        firstName: "",
        lastName: "",
        photo: "",
      },
      uuid: "",
      title: "",
      status: InquiryStatus.NEW,
      isMoneyReturned: false,
      createdAt: undefined,
      _id: iId,
    },
  });

  console.log(iId);
  const getInitValues = () => {
    const fetchedData = myAssessment?.data;
    if (!fetchedData) {
      return {
        iId: iId,
      };
    }
    return {
      status: fetchedData.status,
      isMoneySentToUser: fetchedData.isMoneySentToUser,
      updatedAt: fetchedData.updatedAt,
      cashbackAmount: fetchedData.cashbackAmount,
      result: fetchedData.result,
      title: fetchedData.title,

      pModel: fetchedData.product.model,
      pName: fetchedData.product.name,
      pImages: [...fetchedData.product.images],
      pSku: fetchedData.product.sku,
      pLikeNewPercent: fetchedData.product.likeNewPercent,
      pStatus: fetchedData.product.status,
      pCost: fetchedData.product.cost,
      pPrice: fetchedData.product.price,
      pDateOfPurchase: fetchedData.product.dateOfPurchase,
      pUpdatedAt: fetchedData.product.updatedAt,

      iMakerFirstName: fetchedData.inquiry.maker.firstName,
      iMakerLastName: fetchedData.inquiry.maker.lastName,
      iMakerPhoto: fetchedData.inquiry.maker.photo,
      iTitle: fetchedData.inquiry.title,
      iStatus: fetchedData.inquiry.status,
      iIsMoneyReturned: fetchedData.inquiry.isMoneyReturned,
      iId: iId,
    };
  };

  const submitForm = () => {
    console.log(form.getFieldsValue());
    // form.validateFields()
    const data: Partial<IAssessment> = {
      ...assessment,
      uuid: "",
      status: form.getFieldValue("status"),
      isMoneySentToUser: form.getFieldValue("isMoneySentToUser"),
      updatedAt: form.getFieldValue("updatedAt"),
      cashbackAmount: form.getFieldValue("cashbackAmount"),
      result: form.getFieldValue("result"),
      title: form.getFieldValue("title"),
      inquiry: {
        _id: mode == "edit" ? assessment.inquiry._id : form.getFieldValue("iId"),
        status: form.getFieldValue("iStatus"),
        isMoneyReturned: form.getFieldValue("iIsMoneyReturned"),
      },
      product: {
        sku: form.getFieldValue("pSku"),
        name: form.getFieldValue("pName"),
        model: form.getFieldValue("pModel"),
        likeNewPercent: form.getFieldValue("pLikeNewPercent"),
        status: form.getFieldValue("pStatus"),
        cost: form.getFieldValue("pCost"),
        price: form.getFieldValue("pPrice"),
        images: form.getFieldValue("pImages"),
        dateOfPurchase: dayjs(purchaseDate).toDate(),
        // updatedAt: ,
        _id: assessment.product._id,
      },
      _id: assessment._id,
    };
    console.log(data);

    if (mode === "new") {
      newFn({ data: data, resourceName: "assessment" });
    } else {
      updateFn({ data: data, resourceName: "assessment" });
    }
  };

  const onChange: DatePickerProps["onChange"] = (date, _) => {
    setPurchaseDate(date.toDate());
  };

  useEffect(() => {
    if (mode === "edit") {
      setAssessmentId(location.search.split("id=").at(1));
      queryClient.removeQueries({ queryKey: ["get_assessment_details"], type: "inactive" });
    }
  }, [location.search, mode]);

  useEffect(() => {
    if (myAssessment?.data) {
      setAssessment(myAssessment.data);
      setHasData(true);
      setPurchaseDate(myAssessment.data.product.dateOfPurchase);
    }
  }, [myAssessment]);

  if (mode == "edit" && (!hasData || !myAssessment)) {
    return <FullScreenLoader />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        {mode === "new" ? "Thêm mới phiếu đánh giá" : "Chỉnh sửa phiếu đánh giá"}{" "}
      </h2>
      <Breadcrumb className="text-base font-inter mt-4" items={newInquiryBreadcrumb} />
      <Form
        labelCol={{ span: 8 }}
        // wrapperCol={{ span: 14 }}
        form={form}
        layout="horizontal"
        initialValues={getInitValues()}
      >
        <Row gutter={24} className="mt-4">
          <Col span={11}>
            <Card>
              <h3 className="font-semibold mb-3">Thông tin chung</h3>
              <Form.Item name="title" label="Tên mẫu đánh giá" rules={[{ required: true, message: "Please input!" }]}>
                <Input placeholder="Tên mẫu đánh giá" width={"100%"} />
              </Form.Item>

              <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
                <Select allowClear>
                  <Option value={AssessmentStatus.NEW}>Mới</Option>
                  <Option value={AssessmentStatus.IN_PROGRESS}>Đang xử lý</Option>
                  <Option value={AssessmentStatus.RESELLING}>Bán lại</Option>
                  <Option value={AssessmentStatus.DESTROY}>Tái chế</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="cashbackAmount"
                label="Giá tiền hoàn lại"
                rules={[{message: "Please input!" }]}
              >
                <InputNumber placeholder="Số tiền hoàn lại cho khách" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Đã hoàn tiền" name="isMoneySentToUser" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item name="result" rules={[{ message: "Please input!" }]}>
                <Input.TextArea rows={4} placeholder="Kết quả thẩm định sản phẩm" />
              </Form.Item>
            </Card>

            <Card className="mt-5">
              <h3 className="font-semibold mb-3">Thông tin yêu cầu</h3>
              <Form.Item name="iId" label="Mã yêu cầu">
                <Input placeholder="Mã yêu cầu" width={"100%"} />
              </Form.Item>

              <Form.Item name="iTitle" label="Tiêu đề">
                <Input placeholder="Tiêu đề" width={"100%"} disabled />
              </Form.Item>

              <Form.Item label="Họ tên">
                <Input
                  placeholder="Họ tên người tạo"
                  width={"100%"}
                  disabled
                  value={getFullName(assessment.inquiry.maker.firstName, assessment.inquiry.maker.lastName)}
                />
              </Form.Item>

              <Form.Item name="iStatus" label="Trạng thái yêu cầu" rules={[{ required: true }]}>
                <Select placeholder="Trạng thái yêu cầu" allowClear>
                  <Option value={InquiryStatus.NEW}>Mới</Option>
                  <Option value={InquiryStatus.IN_PROGRESS}>Đang xử lý</Option>
                  <Option value={InquiryStatus.DONE}>Đã xử lý</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Đã hoàn tiền" name="iIsMoneyReturned" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Card>
          </Col>

          <Col span={13}>
            <Card>
              <h3 className="font-semibold mb-3">Thông tin sản phẩm</h3>
              <Form.Item name="pName" label="Tên sản phẩm" rules={[{ required: true, message: "Please input!" }]}>
                <Input width={"100%"} />
              </Form.Item>
              <Form.Item name="pModel" label="Model sản phẩm" rules={[{  message: "Please input!" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="pSku" label="SKU" rules={[{  message: "Please input!" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="pLikeNewPercent" label="Loại hàng">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="pStatus" label="Trạng thái sản phẩm" rules={[{}]}>
                <Select allowClear>
                  <Option value={ProductStatus.INSTOCK}>Còn hàng</Option>
                  <Option value={ProductStatus.SOLD}>Đã bán</Option>
                </Select>
              </Form.Item>
              <Form.Item name="pCost" label="Chi phí thu mua">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="pPrice" label="Giá bán dự kiến">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Ngày kích hoạt">
                <DatePicker onChange={onChange} defaultValue={dayjs(purchaseDate)} />
              </Form.Item>
              <h3 className="font-semibold mb-3">Hình ảnh</h3>
              <div className="px-5">
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                  }}
                >
                  {mode == "edit" &&
                    assessment.inquiry.product.images.map((img, idx) => {
                      return <Image width={200} src={img} key={idx} />;
                    })}
                </Image.PreviewGroup>{" "}
              </div>
            </Card>
          </Col>
        </Row>

        <Form.Item className="mt-7">
          <Button type="primary" htmlType="submit" className="create-assessment-form-button" onClick={submitForm}>
            {mode == "new" ? "Tạo mẫu đánh giá" : "Cập nhật"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUpdateAssessment;
