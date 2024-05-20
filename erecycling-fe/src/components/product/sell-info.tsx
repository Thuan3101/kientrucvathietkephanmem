import { Button, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { PiPlus, PiCurrencyCircleDollar } from "react-icons/pi";
import { EditableCell, EditableRow, EditableTableProps } from "../shared/eidtable-table";
import Variant from "./add-variant";

interface VariantType {
  key: string;
  attribute_1: string;
  attribute_2?: string;
  price: number;
  stock: number;
  sku?: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const buildDataSource = (oldData: VariantType[], data: any[]) => {
  const arr: VariantType[] = [];
  for (const att1 of data[0].attributes) {
    if (data.length > 1) {
      for (const att2 of data[1].attributes) {
        const price =
          oldData[arr.length]?.attribute_1 == att1 && oldData[arr.length].attribute_2 == att2
            ? oldData[arr.length].price
            : 0;
        const stock =
          oldData[arr.length]?.attribute_1 == att1 && oldData[arr.length].attribute_2 == att2
            ? oldData[arr.length].stock
            : 0;
        arr.push({
          key: arr.length.toString(),
          attribute_1: att1,
          attribute_2: att2,
          price,
          stock,
        });
      }
    } else {
      const price = oldData[arr.length]?.attribute_1 == att1 ? oldData[arr.length].price : 0;
      const stock = oldData[arr.length]?.attribute_1 == att1 ? oldData[arr.length].stock : 0;
      arr.push({
        key: arr.length.toString(),
        attribute_1: att1,
        price: price,
        stock: stock,
      });
    }
  }

  return arr;
};

const getColumns = (
  hasSecondAtt: boolean,
  isRowSpan: boolean,
  variantsName: string[],
  secondAttSize: number | undefined
) => {
  console.log(secondAttSize);
  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: variantsName[0],
      dataIndex: "attribute_1",
      // rowScope: "row",
      onCell: (_, index) => {
        if (!isRowSpan) return {};
        if (index % secondAttSize == 0) {
          return { rowSpan: secondAttSize };
        }
        if (index % secondAttSize !== 0) {
          return { rowSpan: 0 };
        }
        return {};
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "Số lượng",
      dataIndex: "stock",
      editable: true,
    },
  ];
  if (hasSecondAtt) {
    defaultColumns.splice(1, 0, {
      title: variantsName[1],
      dataIndex: "attribute_2",
    });
  }
  return defaultColumns;
};

const SellInfo = () => {
  const [hasVariant, setHasVariant] = useState(false);
  const [variants, setVariants] = useState([]);
  const [dataSource, setDataSource] = useState<VariantType[]>([]);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const deleteVariant = (key: number) => {
    setVariants(variants.filter((_, idx) => idx != key));
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        variant: "",
        attributes: [],
      },
    ]);
    setHasVariant(true);
  };

  const handleSave = (row: VariantType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = getColumns(
    dataSource.length >= 1 && dataSource[0].attribute_2 != undefined,
    dataSource.length > 1 && dataSource[0].attribute_1 == dataSource[1].attribute_1,
    variants.map((v) => v.variant),
    variants?.[1]?.attributes?.length
  ).map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: VariantType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const onChangeVariant = (key: number, data: any) => {
    const temp = variants.map((v, idx) => {
      if (idx == key) {
        return data;
      } else return v;
    });
    setVariants([...temp]);
  };

  useEffect(() => {
    if (variants.length == 0) {
      setHasVariant(false);
    } else {
      const datas = buildDataSource(dataSource, variants);
      // console.log(datas);
      setDataSource(datas);
      console.log(variants?.[0]);
    }
  }, [variants]);

  useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  return (
    <div>
      {!hasVariant ? (
        <>
          <div className="flex gap-7 items-center">
            <p className="w-[200px]">Phân loại hàng</p>
            <Button
              type="dashed"
              icon={<PiPlus />}
              onClick={() => {
                addVariant();
              }}
            >
              Thêm nhóm phân loại
            </Button>
          </div>

          <div className="flex gap-7 items-center mt-4">
            <p className="w-[200px]">
              <span className="text-red-500">*</span> Giá
            </p>
            <Input prefix={<PiCurrencyCircleDollar />} placeholder="Nhập giá sản phẩm" style={{ width: 200 }} />
          </div>

          <div className="flex gap-7 items-center mt-4">
            <p className="w-[200px]">
              <span className="text-red-500">*</span> Kho hàng
            </p>
            <Input placeholder="Nhập số lượng kho" style={{ width: 200 }} />
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-7">
            <p className="w-[200px] flex-[1]">Phân loại hàng</p>
            <div className="flex-[4]">
              {variants.map((v, idx) => {
                return (
                  <div key={idx} className="mb-5">
                    <Variant
                      
                      idx={idx}
                      variant={v.variant}
                      attributes={v.attributes}
                      onChangeVariant={onChangeVariant}
                      onDelete={deleteVariant}
                    />
                  </div>
                );
              })}

              {variants.length == 1 && (
                <Button type="default" icon={<PiPlus />} onClick={addVariant} className="mt-4">
                  Thêm nhóm phân loại 2
                </Button>
              )}
            </div>
          </div>

          <div className="flex gap-7 mt-7">
            <p className="w-[200px] flex-[1]">Danh sách phân loại hàng</p>
            <div className="flex-[4]">
              <Table
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSource}
                columns={columns as ColumnTypes}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SellInfo;
