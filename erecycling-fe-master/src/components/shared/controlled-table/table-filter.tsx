import SearchInput from "@/components/ui/search-input";
import { SearchProps } from "antd/es/input/Search";
import { PiFunnel } from "react-icons/pi";
import { Badge, Button, Modal } from "antd";
import { ChangeEvent, createRef, useCallback, useEffect, useRef, useState } from "react";
import TableFilterItem from "./table-filter-item";
import { FilterItemData, IColFilter, IOperationFilter } from "@/types/form";
import { filterOperations } from "@/data/component-data";

type TableFilterProps = {
  enable: boolean;
};

const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);

const colOptions: IColFilter[] = [
  { value: "name", label: "Tên sản phẩm", type: "string" },
  { value: "price", label: "Gía sản phẩm", type: "number" },
  { value: "merchantName", label: "Người bán", type: "string" },
  { value: "status", label: "Trạng thái", type: "string" },
];

const TableFilter = ({ enable }: TableFilterProps) => {
  const useGetRef = () => {
    const refs = useRef({});
    return useCallback((idx) => (refs.current[idx] ??= createRef()), [refs]);
  };
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterItemData[]>([{ operator: null, column: null, value: "" }]);
  const onOpenFilter = () => {
    setOpen(true);
  };

  console.log("render");

  const onChangeColumn = (colVal: string, key: React.Key) => {
    console.log(`selected ${colVal}, key = ${key}`);
    const filter = filters[key as number];
    filter.column = colOptions.filter((col) => col.value == colVal)[0];
    const dummy = [...filters];
    dummy[key as number] = filter;
    setFilters(dummy);
  };

  const onChangeOperator = (operationVal: string, key: React.Key) => {
    console.log(`selected ${operationVal} , key = ${key}`);
    const filter = filters[key as number];
    filter.operator = filterOperations.get(filter.column.type).filter((op) => op.value == operationVal)[0];
    const dummy = [...filters];
    dummy[key as number] = filter;
    setFilters(dummy);
  };

  const onChangeValue = (value: string, key: React.Key) => {
    console.log(`change value to ${value}, key = ${key}`);
    const filter = filters[key as number];
    filter.value = value;
    const dummy = [...filters];
    dummy[key as number] = filter;
    setFilters(dummy);
  };

  const addFilter = () => {
    setFilters([...filters, { operator: null, column: null, value: "" }]);
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter((_, idx) => idx != id));
  };

  const removeAllFilters = () => {
    setFilters([]);
    setOpen(false);
  };

  if (!enable) return <></>;
  return (
    <div className="flex justify-between align-center mx-3 my-5">
      <div className="w-[400px]">
        <SearchInput onSearch={onSearch} placeHolder="Tìm sản phẩm ..." />
      </div>

      <Button
        className="flex gap-1 items-center text-sm min-h-[40px] rounded-md px-3"
        type="default"
        onClick={onOpenFilter}
      >
        <Badge count={filters.filter(f => f.column && f.operator && f.value).length}>
          <PiFunnel fontSize={18} />
        </Badge>
        <span className="inline-block ml-2">Lọc</span>
      </Button>
      <Modal
        title="Lọc dữ liệu"
        centered
        open={open}
        okText="Thêm filter"
        cancelText="Xoá tất cả"
        onOk={addFilter}
        onCancel={() => setOpen(false)}
        width={700}
        footer={(_, { OkBtn }) => (
          <>
            <Button onClick={removeAllFilters}>Xoá tất cả filter</Button>
            <OkBtn />
          </>
        )}
      >
        <div className="mb-8">
          {filters.map((filter, idx) => {
            return (
              <div key={idx} className="my-3">
                <TableFilterItem
                  id={idx}
                  columnOptions={colOptions}
                  operatorOptions={filter.column != null ? filterOperations.get(filter.column.type) : []}
                  onChangeColumn={onChangeColumn}
                  onChangeOperator={onChangeOperator}
                  onChangeValue={onChangeValue}
                  selectedCloumn={filter != null ? filter.column : null}
                  selectedOperator={filter != null ? filter.operator : null}
                  value={filter.value}
                  removeFilter={removeFilter}
                  // inputRef = {useGetRef(idx)}
                />
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default TableFilter;
