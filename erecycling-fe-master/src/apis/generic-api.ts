import axios from "axios";
import { BASE_URL } from "@/common/app-constant";
import { GeneralApiResponse, PageResponse } from "@/types/utils";
import { GetQueryParams } from "../types/utils";
import { GeneralModel } from "@/types/common";

const genericAxiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export async function apiGetListResource<T>(queryParams: Partial<GetQueryParams>, resourceName: string) {
  try {
    const formData = new FormData();
    for (const [k, v] of Object.entries(queryParams)) {
      if (v) {
        formData.append(k, v?.toString());
      }
    }
    const response = await genericAxiosInstance.get<PageResponse<T[]>>(`/${resourceName}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function apiGetResourceDetail<T>(id: React.Key, resourceName: string) {
  const response = await genericAxiosInstance.get<GeneralApiResponse<T>>(`/${resourceName}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
    },
  });
  return response.data;
}

export async function apiPostCreateResource<T>(data: Partial<T>, resourceName: string) {
  const response = await genericAxiosInstance.post<GeneralApiResponse<Partial<T>>>(`/${resourceName}/create`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
    },
  });
  return response.data;
}

export async function apiEditResource<T extends GeneralModel<T>>(data: Partial<T>, resourceName: string) {
  const response = await genericAxiosInstance.patch<GeneralApiResponse<Partial<T>>>(
    `/${resourceName}s/${data._id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
      },
    }
  );
  return response.data;
}

export async function apiDeleteResouce(id: React.Key, resourceName: string) {
  const response = await genericAxiosInstance.delete<GeneralApiResponse<boolean>>(`/${resourceName}s/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
    },
  });
  return response.data;
}
