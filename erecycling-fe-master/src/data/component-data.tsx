import { SelectProps } from "antd";
import { MenuItem } from "../types/utils";
import {
  MdOutlineHome,
  MdOutlinePersonOutline,
  MdOutlineSettings,
  MdHelpCenter,
  MdOutlineHomeRepairService,
  MdSecurity,
  MdDashboard,
  MdOutlineCalendarMonth,
  MdOutlineChat,
} from "react-icons/md";
import { IOperationFilter } from "@/types/form";

export const userMenus: Array<MenuItem> = [
  {
    title: "Tính năng người dùng",
    list: [
      {
        label: "Trang chủ",
        path: "/",
        icon: <MdOutlineHome size={22} />,
      },
      {
        label: "Yêu cầu tái chế",
        path: "/inquiry",
        icon: <MdOutlinePersonOutline fontSize={22} />,
      },
    ],
  },
];

export const adminMenus: Array<MenuItem> = [
  {
    title: "Quản lý tài nguyên",
    list: [
      {
        label: "Trang chủ",
        path: "/",
        icon: <MdOutlineHome size={22} />,
      },
      {
        label: "Người dùng",
        path: "/users",
        icon: <MdOutlinePersonOutline fontSize={22} />,
      },
      {
        label: "Sản phẩm",
        path: "/products",
        icon: <MdOutlineHomeRepairService fontSize={22} />,
      },
    ],
  },

  {
    title: "Hệ thống",
    list: [
      {
        label: "Phân quyền",
        path: "/authorz",
        icon: <MdSecurity fontSize={22} />,
      },
      {
        label: "Cài đặt",
        path: "/setting",
        icon: <MdOutlineSettings fontSize={22} />,
      },

      {
        label: "Trợ giúp",
        path: "/help",
        icon: <MdHelpCenter fontSize={22} />,
      },
    ],
  },

  {
    title: "Ứng dụng",
    list: [
      {
        label: "Kanban",
        path: "/kanban",
        icon: <MdDashboard />,
      },
      {
        label: "Lịch",
        path: "/calendar",
        icon: <MdOutlineCalendarMonth />,
      },

      {
        label: "Chat",
        path: "/chat",
        icon: <MdOutlineChat />,
      },

      {
        label: "Báo cáo",
        path: "/chat",
        icon: <MdOutlineChat />,
      },
    ],
  },
];

export const usersBreadcrumb = [
  {
    href: "/",
    title: <MdOutlineHome fontSize={18} />,
  },

  {
    href: "/users",
    title: "Quản lý người dùng",
  },
  {
    title: "Thêm mới",
  },
];

export const newInquiryBreadcrumb = [
  {
    href: "/",
    title: <MdOutlineHome fontSize={18} />,
  },

  {
    href: "/users",
    title: "Quản lý yêu cầu tái chế",
  },
  {
    title: "Thêm mới hoặc chỉnh sửa",
  },
];

export const createProductBreadcumbs = [
  {
    href: "/",
    title: <MdOutlineHome fontSize={18} />,
  },

  {
    href: "/products",
    title: "Quản lý sản phẩm",
  },
  {
    title: "Thêm mới",
  },
];

export const genderOptions = [
  { key: "MALE", label: "Nam" },
  { key: "FEMALE", label: "Nữ" },
  { key: "OTHERS", label: "Khác" },
];

export const roleOptions: SelectProps["options"] = [
  {
    label: "Khách hàng",
    value: "BUYER",
    color: "gold",
  },
  {
    label: "Người bán",
    value: "SELLER",
    color: "green",
  },
  {
    label: "Quản trị viên",
    value: "ADMIN",
    color: "lime",
  },

  {
    label: "Nhân viên",
    value: "Staff",
    color: "cyan",
  },
];

export const filterOperations = new Map<string, IOperationFilter[]>();
filterOperations.set("string", [
  {
    label: "Bao gồm",
    value: "%{s}%",
  },
  {
    label: "Bat dau voi",
    value: "%{s}",
  },
  {
    label: "Ket thuc voi",
    value: "{s}%",
  },
  {
    label: "Trong",
    value: "null",
  },
]);

filterOperations.set("number", [
  {
    label: "Lớn hơn",
    value: ">",
  },
  {
    label: "Nhỏ hơn",
    value: "<",
  },
  {
    label: "Bằng",
    value: "=",
  },
  {
    label: "Khác",
    value: "<>",
  },
]);
