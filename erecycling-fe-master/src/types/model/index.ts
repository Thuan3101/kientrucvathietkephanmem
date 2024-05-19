import { GeneralModel } from "../common";
import { PiArticle } from "react-icons/pi";

export interface IRole extends GeneralModel<string> {
  name: string;
  description: string;
}

export interface IAddress {
  street: string;
  ward: string;
  district: string;
  country: string;
  zipcode: number;
  representName: string;
  phoneNumber: string;
  default: boolean;
}

export interface IUser extends GeneralModel<string> {
  _id: string;
  active: boolean;
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  birthDay: Date;
  phoneNumber: string;
  uuid: string;
  // gender: string;
  role: string;
  // addressList: Array<IAddress>;
}

export interface IProduct extends GeneralModel<string> {
  name: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number;
  category: string;
  stock: number;
  soldCount: number;
  merchantName: string;
}

export interface IInquiry extends GeneralModel<string> {
  _id: string;
  uuid: string;
  title: string;
  status: InquiryStatus;
  isMoneyReturned: boolean;
  product: {
    name: string;
    model: string;
    attributes?: Array<{
      key: string;
      value: string;
    }>;
    images?: string[];
  };
  createdAt: Date;
}

export enum InquiryStatus {
  NEW = "new",
  IN_PROGRESS = "inprogress",
  DONE = "done",
}
