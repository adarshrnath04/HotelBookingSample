import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css'; // Include your CSS for styling

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // Perform search and navigate to search results
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="app-name">
          <h1>Hotel Finder</h1>
        </Link>
      </div>
      
      <div className="navbar-center">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for hotels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="navbar-right">
        {user && (
          <>
            <div className="profile">
              <img src={user.profilePic || 'default-profile.jpg'} alt="Profile" className="profile-pic" />
              <span className="username">{user.full_name}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
