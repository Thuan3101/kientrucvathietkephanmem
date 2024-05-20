import axios, { } from "axios";
import { BASE_URL } from "@/common/app-constant";
import { LoginInput } from "../_auth/pages/login";
import { ILoginResponse } from "@/types/dto";
import { IUser } from "@/types/model";
import { GeneralApiResponse } from "@/types/utils";

const authAPI = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

authAPI.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const login = async (user: LoginInput) => {
  const response = await authAPI.post<GeneralApiResponse<ILoginResponse>>(
    "/user/login",
    JSON.stringify(user)
  );
  return response.data;
};

export const getMeAPI = async () => {
  const accessToken = JSON.parse(localStorage.getItem("access_token"));
  console.log(accessToken);
  const response = await authAPI.get<GeneralApiResponse<IUser>>("/user/getMe", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
};
