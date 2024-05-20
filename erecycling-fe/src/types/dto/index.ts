import { IUser } from "../model";

export interface ILoginResponse {
    token: string;
    refreshToken: string;
    user: IUser;
  }