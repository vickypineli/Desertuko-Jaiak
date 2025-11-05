//src/pages/Home/Events/EventsPage.jsx
import React, { useEffect, useState } from "react";
import { getAllEvents } from "/src/firebase/firestore";
import FiestaCard from "/src/components/events/FiestaCard.jsx";
import '/src/styles/pages/EventsPage.scss';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <main className="events-page">
      <h1 className="events-page__title">Próximos Eventos</h1>
      {loading ? (
        <p>Cargando eventos...</p>
      ) : events.length === 0 ? (
        <p>No hay eventos programados.</p>
      ) : (
        <div className="events-page__grid">
          {events.map((event) => (
            <FiestaCard
              key={event.id}
              nombre={event.nombre}
              fecha={event.fecha}
              imagen={event.imagen}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default EventsPage;