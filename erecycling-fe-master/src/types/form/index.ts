export interface IOperationFilter {
  value: string;
  label: string;
}

export interface IColFilter {
  value: string;
  label: string;
  type: string;
}

export interface FilterItemData {
  column: IColFilter;
  operator: IOperationFilter;
  value?: any;
}
