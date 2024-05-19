import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
const { Search } = Input;

type SearchInputProps = {
  onSearch: SearchProps["onSearch"];
  placeHolder?: string
};

const SearchInput = ({ onSearch, placeHolder = "Search any thing..." }: SearchInputProps) => {
  return (
    <Search
      size="large"
      className="rounded-md"
      placeholder={placeHolder}
      allowClear
      onSearch={onSearch}
      style={{ width: "100%" }}
    />
  );
};

export default SearchInput;
