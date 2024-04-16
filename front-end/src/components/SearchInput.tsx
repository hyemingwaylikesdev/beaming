import { Dispatch, SetStateAction } from "react";

interface Props {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  performSearch: () => void;
}

const SearchInput = ({ inputValue, setInputValue, performSearch }: Props) => {
  return (
    <>
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:border-gray-300 focus:ring-0"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded-r-lg hover:bg-purple-600 "
        onClick={() => performSearch()}
      >
        검색
      </button>
    </>
  );
};

export default SearchInput;
