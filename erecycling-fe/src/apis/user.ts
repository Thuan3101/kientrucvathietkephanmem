import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/common/app-constant";
import { ILoginResponse, IUser } from "@/types";
import { GeneralApiResponse, PageResponse } from "@/types/utils";
import { GetQueryParams } from "../types/utils";

const userAPI = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

userAPI.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const apiGetUsers = async (queryParams: Partial<GetQueryParams>) => {
  try {
    const formData = new FormData();
    for (const [k, v] of Object.entries(queryParams)) {
      if (v) {
        console.log(k, v);
        formData.append(k, v?.toString());
      }
    }

    const response = await userAPI.post<PageResponse<IUser[]>>("/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const apiGetUserDeatails = async (userId: string) => {
  const response = await userAPI.get<GeneralApiResponse<IUser>>(`users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
    },
  });
  return response.data
};
