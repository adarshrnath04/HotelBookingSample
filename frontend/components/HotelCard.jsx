import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelCard.css';

function HotelCard({ hotel }) {
  const navigate = useNavigate();
  const cardRef = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShow(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`hotel-card ${show ? 'show' : ''}`}
      onClick={() => navigate(`/hotel/${hotel.hotel_id}`)}
    >
      <img src={hotel.photo_url} alt={hotel.name} />
      <div className="hotel-card-content">
      <h3>{hotel.name}</h3>
      <p>{hotel.description}</p>
      <p><strong>Location:</strong> {hotel.location}</p>
      <p><strong>Price:</strong> ₹{hotel.price}</p>
      <p><strong>Rating:</strong> {hotel.rating} ★</p>
      </div>
    </div>
  );
}

export default HotelCard;
