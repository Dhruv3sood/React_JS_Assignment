import React, { useEffect, useState } from 'react';
import EventCard from './components/EventCard';
import './App.css';
 
const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://prod.api.probo.in/api/v2/feed/public/homefeed', {
          headers: {
            'Content-Type': 'application/json',
            'x-device-os': 'DESKTOP',
            'x-version-name': '10',
            'appid': 'in.probo.pro',
          },
        });
        const data = await response.json();
        setEvents(data.data.records || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchEvents();
  }, []);
 
  return (
    <div className="app">
      <img
        src="./nav_bar.png"
        alt="Navbar"
        style={{ width: '100%', height: 'auto' }}
      />
      <h1>All Events Predict and Win!! ~ Dhruv Sood</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};
 
export default App;