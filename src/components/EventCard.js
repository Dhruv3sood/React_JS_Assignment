import React, { useEffect, useState } from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    if (event.expiry_date_time_stamp) {
      const interval = setInterval(() => {
        const expiryDate = new Date(event.expiry_date_time_stamp);
        setRemainingTime(calculateRemainingTime(expiryDate));
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [event.expiry_date_time_stamp]);
  
  const calculateRemainingTime = (expiryDate) => {
    const now = new Date();
    const diff = expiryDate - now;

    if (diff<=0) return 'Time up! (This Trade is Over)';
    const hours = Math.floor(diff/(1000*60*60));
    const minutes = Math.floor((diff%(1000*60*60))/(1000*60));
    const seconds = Math.floor((diff%(1000*60))/1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleButtonClick = (color) => {
    setAnimation(color);
    setTimeout(() => {
      setAnimation(null);
    }, 1000);
  };

  const getButtonStyle = (button) => ({
    backgroundColor: button.bg_color,
    color: button.text_color,
  });

  return (
    <div className="event-card-container">
      <div className={`event-card ${animation ? `${animation}-fill` : ''}`}>
        <img src={event.image_url} alt={event.name} className="event-image" />
        <h3>{event.name}</h3>
        <p>{event.oneliner?.text}</p>
        <div className="traders">
          <span>{event.traders_count_numeric} traders</span>
        </div>
        <div className="actions">
          <button
            className="yes animated-button"
            style={getButtonStyle(event.buy_button)}
            onClick={() => handleButtonClick('blue')}
          >
            {event.buy_button.text}
          </button>
          <button
            className="no animated-button"
            style={getButtonStyle(event.sell_button)}
            onClick={() => handleButtonClick('red')}
          >
            {event.sell_button.text}
          </button>
        </div>
        {remainingTime && (
          <div className="expiry">
            <p className="timer">Time left: {remainingTime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
