import React, { useState } from "react";
import FormInput from "../shared/form/form-input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TreeSelect } from "antd";
type Props = {};

const treeData = [
  {
    value: "clothes",
    title: "Quần áo",
    children: [
      {
        value: "paint",
        title: "Quần",
        children: [
          {
            value: "jeans",
            title: "Quần Jeans",
          },
          {
            value: "dress_paint",
            title: "Quần Âu",
          },
        ],
      },
      {
        value: "top",
        title: "Áo",
        children: [
          {
            value: "t-shirt",
            title: "Áo T-Shirt",
          },
          {
            value: "sweater",
            title: "Áo Sweater",
          },
        ],
      },
    ],
  },

  {
    value: "shoe",
    title: "Giày",
    children: [
      { value: "sandals", title: "Dép Sandals" },
      { value: "sneaker", title: "Giày Sneaker" },
      { value: "boot", title: "Giày Boots" },
    ],
  },
];

const BasicInfo = (props: Props) => {
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState<string>();

  const onChange = (newValue: string) => {
    setCategories(newValue);
  };
  return (
    <div>
      <FormInput
        control={null}
        fieldError={null}
        name="prod-title"
        placeholder="Nhập vào tên sản phẩm"
        label="Tên sản phẩm"
      />
      <div className="mt-5 [&_.ql-editor]:min-h-[200px]">
        <label className="inline-block mb-2" htmlFor="prod-desc">
          Mô tả sản phẩm
        </label>
        <ReactQuill id="prod-desc" theme="snow" value={value} onChange={setValue} className="text-editor" />
      </div>
      <div className="mt-5">
        <label className="inline-block mb-2" htmlFor="prod-desc">
          Tải ảnh sản phẩm
        </label>
        <div className="p-10 outline-none rounded cursor-pointer border-dashed border-gray-100 bg-[#919eab14] flex justify-center flex-col items-center gap-3">
          <img src="/images/illustration/select-img.svg" width={200} height={200} />
          <span>Kéo thả hoặc chọn chọn file</span>
        </div>
      </div>

      <div className="mt-5">
        <label className="inline-block mb-2" htmlFor="prod-desc">
          Phân loại ngành hàng
        </label>
        <TreeSelect
          showSearch
          style={{ width: "100%" }}
          value={categories}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Chọn ngành hàng"
          allowClear
          treeDefaultExpandAll
          onChange={onChange}
          treeData={treeData}
        />
      </div>
    </div>
  );
};

export default BasicInfo;
