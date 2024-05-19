import { Button, Input, InputRef, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { PiPlus, PiX } from "react-icons/pi";

type VariantProps = {
  idx: number;
  variant: string;
  attributes: Array<string>;
  onChangeVariant: (key: React.Key, data: any) => void;
  onDelete: (key: React.Key) => void;
};

const Variant = ({ variant, attributes, onChangeVariant, idx, onDelete }: VariantProps) => {
  const [tags, setTags] = useState([...attributes]);
  const [variantKey, setVariantKey] = useState(variant);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const changeVariantKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariantKey(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag: string) => (
    <span key={tag} style={{ display: "inline-block" }}>
      <Tag
        className="p-2"
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    </span>
  );

  const tagChild = tags.map(forMap);

  useEffect(() => {
    onChangeVariant(idx, {
      variant: variantKey,
      attributes: tags,
    });
  }, [tags, variantKey]);

  return (
    <div className="border-dashed border-gray-300 rounded border p-3 relative bg-gray-50">
      <div className="flex gap-2 ">
        <p className="w-[200px] text-text-soft">Tên nhóm phân loại</p>
        <Input placeholder="Ví dụ: màu sắc" style={{ width: 250 }} onChange={changeVariantKey} />
      </div>
      <div className="flex gap-2 mt-4">
        <p className="w-[200px] text-text-soft">Tên phân loại</p>
        <>
          {tagChild}
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag onClick={showInput} className="border-dashed border-gray-300 flex items-center gap-1 p-2">
              <PiPlus /> <span className="text-text-soft">Ví dụ: Xanh, đỏ</span>
            </Tag>
          )}
        </>
      </div>
      <Button
        onClick={() => {
          onDelete(idx);
        }}
        shape="circle"
        type="text"
        className="flex justify-center items-center absolute top-1 right-1"
      >
        <PiX fontSize={18} />
      </Button>
    </div>
  );
};

export default Variant;
