import { Select, Input } from "antd";
import { PiTrash } from "react-icons/pi";

type Props = {
  columnOptions: any[];
  operatorOptions: any[];
  value: any;
  onChangeColumn: any;
  onChangeOperator: any;
  onChangeValue: any;
  selectedCloumn: any;
  selectedOperator: any;
  removeFilter: any;
  id: React.Key;
};

const TableFilterItem = ({
  columnOptions,
  operatorOptions,
  value,
  onChangeColumn,
  onChangeValue,
  onChangeOperator,
  selectedCloumn,
  selectedOperator,
  removeFilter,
  // inputRef,
  id,
}: Props) => {
  return (
    <div className="flex gap-3">
      <Select
        placeholder="Select columns"
        size="large"
        style={{ width: 200 }}
        onChange={(e) => onChangeColumn(e, id)}
        options={columnOptions}
        value={selectedCloumn}
      />

      <Select
        placeholder="Select operator"
        size="large"
        style={{ width: 200 }}
        onChange={(e) => onChangeOperator(e, id)}
        options={operatorOptions}
        value={selectedOperator}
      />
      <Input
        size="large"
        placeholder="Enter value here..."
        value={value}
        onChange={(e) => onChangeValue(e.target.value, id)}
        // ref={inputRef}
      />

      <button
        className={`font-medium rounded-md min-h-[40px] min-w-[40px] flex items-center justify-center bg-red-200 text-red-500 cursor-pointer hover:bg-red-100`}
      >
        <PiTrash fontSize={18} onClick={() => removeFilter(id)} />
      </button>
    </div>
  );
};

export default TableFilterItem;
