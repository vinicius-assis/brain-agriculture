import { Search } from "lucide-react";
import React from "react";

const SearchInput = () => {
  return (
    <div className="w-full max-w-sm min-w-[200px] relative">
      <div className="relative">
        <input
          className="appearance-none block w-full bg-off-white text-dark-green border-light rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-medium-green"
          placeholder="Search item..."
        />
        <button
          className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
          type="button"
        >
          <Search />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
