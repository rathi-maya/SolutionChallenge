import React, { useState } from "react";

const SearchFilter = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Logic to filter/search can go here
    alert(`Searching for "${search}"...`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search opportunities..."
        className="border rounded p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchFilter;
