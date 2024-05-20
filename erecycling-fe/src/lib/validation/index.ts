import * as yup from "yup";

export const createUpdateUserSchema = yup.object().shape({
  email: yup.string().email("Email phải đúng định dạng").required("Email không được để trống"),
  firstName: yup.string().required("Họ không được để trống"),
  lastName: yup.string().required("Tên không được để trống"),
  phoneNumber: yup.string().length(10, "Số điện thoại có 10 chữ số"),
  birthday: yup.object(),
  gender: yup.string().required("Vui lòng chọn giới tính"),
  roles: yup.array().required("Vui lòng chọn vai trò"),
});
