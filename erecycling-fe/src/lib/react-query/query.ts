import { LoginInput } from "@/_auth/pages/login";
import { getMeAPI, login } from "@/apis/auth";
import {
  apiDeleteResouce,
  apiEditResource,
  apiGetListResource,
  apiGetResourceDetail,
  apiPostCreateResource,
} from "@/apis/generic-api";
import { GeneralModel } from "@/types/common";
import { AppError, GetQueryParams } from "@/types/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useSignIn = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (user: LoginInput) => {
      return login(user);
    },
    onSuccess: (data) => {
      console.log("Authentication successful", data);
      localStorage.setItem("access_token", JSON.stringify(data.data.token));
      if (data.data.user.role == 'customer')
        navigate("/inquiry")
      else navigate("/")
    },
    onError: (error) => {
      console.log(error);
      toast.error("Đăng nhập thất bại");
    },
  });
};

export const useGetAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        return await getMeAPI();
      } catch (err) {
        if (err instanceof AxiosError) {
          const errDetails = err.response.data;
          throw new AppError(errDetails.status, errDetails.statusCode, errDetails.result);
        }
        throw err;
      }
    },
  });
};

export function useGetReourceList(queries: Partial<GetQueryParams>, resourceName: string) {
  return useQuery({
    queryKey: [`get_list_${resourceName}`],
    queryFn: async () => {
      try {
        return await apiGetListResource(queries, resourceName);
      } catch (err) {
        if (err instanceof AxiosError) {
          const errDetails = err.response.data;
          throw new AppError(errDetails.status, errDetails.statusCode, errDetails.result);
        }
        throw err;
      }
    },
  });
}

export function useGetResourceDetails<T>(id: React.Key, resourceName: string) {
  return useQuery({
    queryKey: [`get_${resourceName}_details`],
    queryFn: async () => {
      try {
        return await apiGetResourceDetail<T>(id, resourceName);
      } catch (err) {
        if (err instanceof AxiosError) {
          const errDetails = err.response.data;
          throw new AppError(errDetails.status, errDetails.statusCode, errDetails.result);
        }
        throw err;
      }
    },
    enabled: !!id,
  });
}

export function useAddNewResource<T>(resourceName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, resourceName }: { data: Partial<T>; resourceName: string }) => {
      return apiPostCreateResource(data, resourceName);
    },
    onSuccess: () => {
      toast.success(`Đã tạo mới ${resourceName}`);
      localStorage.removeItem(`new_${resourceName}_uid`);
      return queryClient.refetchQueries({ queryKey: [`get_list_${resourceName}`] });
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(`Đã có lỗi xảy ra: ${error.response.data.message}`);
      } else toast.error(`Đã có lỗi xảy ra: ${error.message}`);
    },
  });
}

export function useEditResource<T>(resourceName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, resourceName }: { data: Partial<T>; resourceName: string }) => {
      return apiEditResource(data, resourceName);
    },
    onSuccess: () => {
      toast.success("Đã Chỉnh sửa thông tin");
      return Promise.all([
        queryClient.refetchQueries({ queryKey: [`get_${resourceName}_details`] }),
        queryClient.refetchQueries({ queryKey: [`get_list_${resourceName}`] }),
      ]);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Đã có lỗi xảy ra");
    },
  });
}

export function useDeleteResource(resourceName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, resourceName }: { id: number | string | bigint; resourceName: string }) => {
      return apiDeleteResouce(id, resourceName);
    },
    onSuccess: (_) => {
      toast.success("Đã Xoá thành công");
      return queryClient.refetchQueries({ queryKey: [`get_list_${resourceName}`] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Đã có lỗi xảy ra");
    },
  });
}
