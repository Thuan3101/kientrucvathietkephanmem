import { useForm, Controller } from "react-hook-form";
// import { useEffect } from "react";
import { Row, Col, Input, Button, Divider, Image } from "antd";
import { Link } from "react-router-dom";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignIn } from "@/lib/react-query/query";

export type LoginInput = {
  email?: string;
  password?: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Email sai định dạng"),
  password: yup.string().min(4, "Mật khẩu tối thiểu 4 chữ số"),
});

const LoginPage = () => {
  //   const location = useLocation();
  //   const activePath = location.pathname;
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutateAsync: loginUser, isPending } = useSignIn();

  const onSubmit = async (data: LoginInput) => {
    loginUser(data);
  };

  return (
    <div className="w-[100vw] overflow-hidden login-page">
      <Row gutter={16} className="h-[100vh] ">
        <Col span={10} className="flex items-center">
          <div className="max-w-[380px] mr-auto ml-auto">
            <div className="flex gap-2 items-center">
              <div className="w-[40px] h-[24px] relative">
                <Image src={"/images/logo/logo.svg"} alt="logo" sizes="100%" preview={false} />
              </div>
              <div className="typewriter">
                <h1 className="text-xl font-bold">E Recycle</h1>
              </div>
            </div>
            <h2 className="text-2xl font-bold mt-10">Đăng nhập để tiếp tục</h2>
            <p className="text-text-soft mt-2">
              Sử dụng tài khoản quản trị viên hoặc nhân viên để truy cập
            </p>
            <div className="flex gap-2 bg-[#CAFDF5] rounded-lg p-3 mt-3">
              <BsFillInfoCircleFill fontSize={20} fill="#00B8D9" color="#00B8D9" />
              <div className="">
                Acc demo email:{" "}
                <span className="text-[#003768] font-semibold">staff1@gmail.com</span> / Mật khẩu:{" "}
                <span className="text-[#003768] font-semibold">1234</span>
              </div>
            </div>
            <form
              action="#"
              className="mt-4"
              id="credentials-login"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4">
                <label className="mb-2 block text-text-soft" htmlFor="email">
                  Email:
                </label>

                <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  render={({ field }) => <Input size="large" {...field} />}
                />
                {errors.email && (
                  <span className="inline-block mt-1 text-red-700">{errors.email?.message}</span>
                )}
              </div>
              <div>
                <label className="mb-2 block  text-text-soft" htmlFor="password">
                  Mật khẩu:
                </label>
                <Controller
                  name="password"
                  defaultValue=""
                  control={control}
                  render={({ field }) => <Input size="large" {...field} />}
                />
                {errors.password && (
                  <span className="inline-block mt-1 text-red-700">{errors.password?.message}</span>
                )}
              </div>
            </form>
            <div className="text-right mt-5">
              <Link to={"/forgot-password"}>Quên mật khẩu</Link>
            </div>
            {isPending ? (
              <Button type="primary" loading className="rounded-lg h-[40px] bg-primary w-full text-white mt-4">
                Loading
              </Button>
            ) : (
              <input
                type="submit"
                form="credentials-login"
                className="inline-block rounded-lg h-[40px] w-full text-white mt-4 cursor-pointer bg-[rgba(0,_166,_111,_0.8)_!important]"
                value="Đăng nhập"
              />
            )}

            <Divider>Hoặc</Divider>
            <div className="flex justify-between gap-3">
              <Button type="default" className="relative flex gap-1 items-center">
                <Image
                  src={"/images/logo/github-logo.svg"}
                  alt="github-logo"
                  width={16}
                  preview={false}
                  height={16}
                />
                Tiếp tục với Github
              </Button>

              <Button size="middle" type="default" className="relative flex gap-1 items-center">
                <Image
                  src={"/images/logo/google-logo.svg"}
                  alt="google-logo"
                  width={16}
                  preview={false}
                  height={16}
                />
                Tiếp tục với Google
              </Button>
            </div>
          </div>
        </Col>
        <Col span={14} className="bg-gray-50">
          <div className="text-center relative h-full max-w-[600px] mr-auto ml-auto">
            <Image
              preview={false}
              src={"/images/auth/login-banner.png"}
              alt="login-banner"
              sizes="100%"
              style={{ objectFit: "contain" }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
