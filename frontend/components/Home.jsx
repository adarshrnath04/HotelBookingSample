import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelCard from './HotelCard';
import './Home.css';

function Home() {
  const [hotels, setHotels] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    axios.get('http://localhost:5000/api/hotels')
      .then(res => {
        setHotels(res.data);

        // Extract unique locations
        const uniqueLocations = [...new Set(res.data.map(hotel => hotel.location))];
        setLocations(['All', ...uniqueLocations]);
      });
  }, []);

  const filteredHotels = hotels.filter(hotel => {
    return (
      (selectedLocation === 'All' || hotel.location === selectedLocation) &&
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sorting logic
  const sortedHotels = filteredHotels.sort((a, b) => {
    if (sortOrder === 'price') {
      return a.price - b.price;
    } else if (sortOrder === 'rating') {
      return b.rating - a.rating;
    } else {
      return 0; // default (no sorting)
    }
  });

  return (
    <div className="home-container">
      <h2>Available Hotels</h2>

      <div className="filter-container">
        <label htmlFor="location">Filter by Location:</label>
        <select id="location" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by hotel name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Default</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="hotel-list">
        {sortedHotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Home;
