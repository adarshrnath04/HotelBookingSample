import React, { useState } from 'react';

export default function SearchBar({ onSearch, onSort }) {
  const [location, setLocation] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    onSearch(location);
  };

  const handleSort = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Search by location"
      />
      <button onClick={handleSearch}>Search</button>

      <select onChange={handleSort}>
        <option value="">Sort by</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
}