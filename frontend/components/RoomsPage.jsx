import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RoomsPage.css'; // Add your custom CSS for the Rooms page

function RoomsPage() {
  const { id } = useParams(); // Get hotel ID from URL
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch room details for the hotel
    axios.get(`http://localhost:5000/api/hotel/${id}/rooms`)
      .then(res => {
        setRooms(res.data); // Set rooms data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(err => {
        console.error('Error fetching rooms:', err);
        setLoading(false);
      });
  }, [id]); // Re-run effect when hotel ID changes

  if (loading) {
    return <p>Loading rooms...</p>;
  }

  if (!rooms || rooms.length === 0) {
    return <p>No rooms available for this hotel.</p>;
  }

  return (
    <div className="rooms-page-container">
      <h2>Available Rooms</h2>
      <div className="rooms-list">
        {rooms.map(room => (
          <div key={room.id} className="room-card">
            <h3>{room.type}</h3>
            <p>{room.description}</p>
            <p><strong>Price:</strong> ${room.price}</p>
            <p><strong>Availability:</strong> {room.availability ? 'Available' : 'Not Available'}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsPage;
