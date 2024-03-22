import React from "react";

interface Props {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const SearchInput: React.FC<Props> = ({ onSearch, searchTerm }) => {
  return (
    <input
      className="p-2 border border-gray-300 rounded-md"
      type="text"
      placeholder="검색하세요."
      onChange={onSearch}
      value={searchTerm}
    />
  );
};

export default SearchInput;
