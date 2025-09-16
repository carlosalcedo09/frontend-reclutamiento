"use client";

import { useState } from "react";
import SearchIcon from "@/components/icons/search.svg";

export default function SearchBar({
  placeholder = "Buscar...",
  onSearch,
  bgColor = "bg-white",
  textColor = "text-gray-900",
  iconColor = "text-gray-500",
}) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      className={`flex items-center w-full rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-black ${bgColor}`}
    >
      <SearchIcon className={`w-5 h-5 mr-2 ${iconColor}`} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        className={`w-full outline-none bg-transparent ${textColor}`}
      />
    </div>
  );
}
