// src/pages/Admin/EventsAdmin/EventsAdmin.jsx
import React, { useEffect, useState } from "react";
import {
  getAllActivities,
  getAllEvents,
  deleteActivity,
  deleteEvent,
} from "../../../firebase/firestore";
import ActivityForm from "../../../components/events/ActivityForm";
import EventForm from "../../../components/events/EventForm";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import BackButton from "../../../components/common/BackButton";
import "../../../styles/pages/EventsAdmin.scss";

const EventsAdmin = () => {
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingActivity, setEditingActivity] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const [selectedEventId, setSelectedEventId] = useState(null); // filtro

  // 🔹 Cargar eventos y actividades
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [allActivities, allEvents] = await Promise.all([
        getAllActivities(),
        getAllEvents(),
      ]);
      setActivities(allActivities);
      setEvents(allEvents);
      setLoading(false);
    };
    fetchData();
  }, []);

  // 🔹 Filtrar actividades por evento seleccionado
  const filteredActivities = selectedEventId
    ? activities.filter((a) => a.eventId === selectedEventId)
    : activities;

  // 🔹 Guardar cambios o crear
  const handleSaveActivity = (updated) => {
    setActivities((prev) => {
      const existing = prev.find((a) => a.id === updated.id);
      if (existing) {
        return prev.map((a) => (a.id === updated.id ? updated : a));
      } else {
        return [...prev, updated];
      }
    });
    // ❌ No cerramos aquí, lo hace el formulario tras mostrar el mensaje
  };

  const handleSaveEvent = (updated) => {
    setEvents((prev) => {
      const existing = prev.find((e) => e.id === updated.id);
      if (existing) {
        return prev.map((e) => (e.id === updated.id ? updated : e));
      } else {
        return [...prev, updated];
      }
    });
    setShowEventForm(false);
  };

  // 🔹 Eliminar actividad
  const handleDeleteActivity = async (activity) => {
    if (window.confirm("¿Seguro que quieres eliminar esta actividad?")) {
      await deleteActivity(activity.eventId, activity.id);
      setActivities((prev) => prev.filter((a) => a.id !== activity.id));
    }
  };

  // 🔹 Eliminar evento
  // Al eliminar un evento, también se eliminan sus actividades asociadas
  // eslint-disable-next-line no-unused-vars
  const handleDeleteEvent = async (event) => {
    if (
      window.confirm(
        "¿Seguro que quieres eliminar este evento y todas sus actividades?"
      )
    ) {
      await deleteEvent(event.id);
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
      setActivities((prev) => prev.filter((a) => a.eventId !== event.id));
      if (selectedEventId === event.id) setSelectedEventId(null);
    }
  };

  return (
    <div className="events-admin">
      <div className="header">
        <h2>Gestión de eventos y actividades</h2>

        {/* 🔹 Botones de filtro por evento */}
        <div className="event-filters">
          <button
            className={`filter-btn ${!selectedEventId ? "active" : ""}`}
            onClick={() => setSelectedEventId(null)}
          >
            Todas las actividades
          </button>
          {events.map((e) => (
            <button
              key={e.id}
              className={`filter-btn ${
                selectedEventId === e.id ? "active" : ""
              }`}
              onClick={() => setSelectedEventId(e.id)}
            >
              {e.title?.es || "Sin título"}
            </button>
          ))}
        </div>

        {/* 🔹 Botones de añadir */}
        <div className="actions-header">
          <button
            onClick={() => {
              setEditingActivity(null);
              setShowActivityForm(true);
            }}
            className="btn-add"
          >
            ➕ Añadir actividad
          </button>

          <button
            onClick={() => {
              setEditingEvent(null);
              setShowEventForm(true);
            }}
            className="btn-add"
          >
            🎉 Añadir evento
          </button>
        </div>
      </div>

      {/* 🔹 Tabla de actividades */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="activities-table">
          <thead>
            <tr>
              <th>Título (ES)</th>
              <th>Título (EU)</th>
              <th>Evento</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((a) => {
                const event = events.find((e) => e.id === a.eventId);
                return (
                  <tr key={a.id}>
                    <td>{a.title?.es || "-"}</td>
                    <td>{a.title?.eu || "-"}</td>
                    <td>{event?.title?.es || "Sin evento"}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td>{a.requiresRegistration ? "Sí" : "No"}</td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setEditingActivity(a);
                          setShowActivityForm(true);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteActivity(a)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No hay actividades para este evento.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* 🔹 Formularios */}
      {showActivityForm && (
        <ActivityForm
          activity={editingActivity}
          events={events}
          onClose={() => setShowActivityForm(false)}
          onSave={handleSaveActivity}
        />
      )}

      {showEventForm && (
        <EventForm
          event={editingEvent}
          onClose={() => setShowEventForm(false)}
          onSave={handleSaveEvent}
        />
      )}

      <BackButton path="/admin" label="🏠 Volver al panel de administración" />
    </div>
  );
};

export default EventsAdmin;
