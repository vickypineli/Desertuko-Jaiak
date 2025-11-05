// src/pages/Home/Events/EventsPage.jsx
import React, { useEffect, useState } from "react";
import { getAllEvents } from "/src/firebase/firestore";
import EventCard from "/src/components/events/EventCard.jsx";
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
            <EventCard
              key={event.id}
              title={event.title?.es || event.title?.eu || "Sin título"}
              startDate={event.date}
              endDate={event.isMultiDay ? event.endDate : null}
              image={event.image || "/images/default-event.jpg"} // por si agregas imágenes después
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default EventsPage;
