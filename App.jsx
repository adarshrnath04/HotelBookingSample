import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import HotelPage from './components/HotelPage';
import RoomsPage from './components/RoomsPage';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  // Hide Navbar on login and signup pages
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {user && !hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path='/hotel/:hotel_id/rooms' element={<RoomsPage/>}/>
        <Route path="/hotel/:hotel_id" element={<HotelPage />} />
      </Routes>
    </>
  );
}

export default App;
