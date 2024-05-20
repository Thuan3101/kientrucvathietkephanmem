import { ReactNode } from "react";

export interface GeneralModel<T> {
  get _id(): T;
}

export class GeneralColumnType {
  key: React.Key;
  action: ReactNode;
}
