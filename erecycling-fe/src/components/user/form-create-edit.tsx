import { Col, Row } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { genderOptions, roleOptions } from "@/data/component-data";
import { createUpdateUserSchema } from "@/lib/validation";
import FormInput from "../shared/form/form-input";
import FormSelect from "../shared/form/form-select";
import FormDatePicker from "../shared/form/form-datepicker";
import FormRadio from "../shared/form/form-radio";
import { IUser } from "@/types/model";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";

type Props = {
  mode: string;
  onReceiveData: (data: any) => void;
  user?: IUser;
};
const FromCreateEdit = ({ mode, onReceiveData, user }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUpdateUserSchema),
    defaultValues: useMemo(() => {
      return {
        ...user,
        birthday: user ? dayjs(user.birthday) : dayjs(),
        roles: user && user.roles.map((r) => r.id.toUpperCase()),
      };
    }, [user]),
  });

  useEffect(() => {}, []);
  const onSubmit = (data) => {
    onReceiveData({
      ...data,
    });
  };

  useEffect(() => {
    reset({
      ...user,
      birthday: user ? dayjs(user.birthday) : dayjs(),
      roles: user && user.roles.map((r) => r.id.toUpperCase()),
    });
  }, [user]);

  return (
    <form action="#" id="from-create-user" onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[18, 24]}>
        <Col span={12}>
          <FormInput
            name="email"
            control={control}
            fieldError={errors["email"]}
            label="Email"
            placeholder="Nhập email"
          />
        </Col>
        <Col span={12}>
          <FormInput
            name="firstName"
            control={control}
            fieldError={errors["firstName"]}
            label="Họ"
            placeholder="Nhập họ"
          />
        </Col>

        <Col span={12}>
          <FormInput
            name="lastName"
            control={control}
            fieldError={errors["lastName"]}
            label="Tên"
            placeholder="Nhập tên"
          />
        </Col>

        <Col span={12}>
          <FormInput
            name="phoneNumber"
            control={control}
            fieldError={errors["phoneNumber"]}
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
          />
        </Col>

        <Col span={12}>
          <FormDatePicker
            name="birthday"
            control={control}
            // fieldError={errors["birthday"]}
            label="Ngày sinh"
            placeholder="Chọn ngày sinh"
          />
        </Col>
        <Col span={12}>
          <FormSelect
            name="roles"
            control={control}
            options={roleOptions}
            label="Vai trò"
            fieldError={errors[""]}
            placeholder="Vai trò"
          />
        </Col>

        <Col span={12}>
          <FormRadio
            name="gender"
            control={control}
            fieldError={errors["gender"]}
            options={genderOptions}
            placeholder="Chọn giới tính"
            label="Giới tính"
          />
        </Col>
      </Row>
    </form>
  );
};

export default FromCreateEdit;
