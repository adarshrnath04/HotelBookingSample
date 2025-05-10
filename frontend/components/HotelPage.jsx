import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HotelPage.css';

function HotelPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableRooms, setAvailableRooms] = useState([]); // Filtered available rooms

  useEffect(() => {
    // Fetch hotel details
    axios.get(`http://localhost:5000/api/hotel/${id}`)
      .then(res => setHotel(res.data))
      .catch(err => console.error('Error fetching hotel details:', err));

    // Fetch available rooms for this hotel
    axios.get(`http://localhost:5000/api/hotel/${id}/rooms`)
      .then(res => {
        setRooms(res.data);
        setAvailableRooms(res.data.filter(room => room.availability === 1)); // Filter available rooms
      })
      .catch(err => console.error('Error fetching room details:', err));
  }, [id]);

  const handleRoomSelection = (price) => {
    // Calculate price based on number of days
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const daysDifference = Math.floor((checkOut - checkIn) / (1000 * 3600 * 24));

    if (daysDifference < 1) {
      alert('Check-out date must be later than check-in date.');
      return;
    }

    setTotalPrice(price * daysDifference);  // Update total price based on number of days
  };

  const handleBooking = () => {
    alert(`Booking successful! Total price: $${totalPrice}`);
  };

  if (!hotel) return <p>Loading hotel details...</p>;
  if (!availableRooms.length) return <p>No available rooms for this hotel.</p>;

  return (
    <div className="hotel-page-container">
      <div className="hotel-image">
        <img src={hotel.photo_url} alt={hotel.name} />
      </div>
      <div className="hotel-details">
        <h2>{hotel.name}</h2>
        <p>{hotel.description}</p>

        {/* Availability Section */}
        <div className="availability-section">
          <h3>Check Availability</h3>
          <label htmlFor="check-in-date">Check-In Date</label>
          <input
            type="date"
            id="check-in-date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <label htmlFor="check-out-date">Check-Out Date</label>
          <input
            type="date"
            id="check-out-date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>

        {/* Pricing Section */}
        <div className="pricing-section">
          <h3>Room Types and Pricing</h3>
          {availableRooms.map((room) => (
            <div key={room.id} className="room-card">
              <h4>{room.type}</h4>
              <div className="price">${room.price} per night</div>
              <button onClick={() => handleRoomSelection(room.price)}>Select Room</button>
            </div>
          ))}
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <p>Total Price: ${totalPrice}</p>
          <button onClick={handleBooking}>Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default HotelPage;
