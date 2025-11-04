// src/pages/Admin/EventsAdmin/ActivitiesAdmin.jsx
import React, { useEffect, useState } from "react";
import { getAllActivities, deleteActivity, getAllEvents } from "../../../firebase/firestore";
import ActivityForm from "./ActivityForm";
import LoadingSpinner from "../../../components/LoadingSpinner";
import BackButton from "../../../components/BackButton";
import "../../../styles/ActivitiesAdmin.scss";

const ActivitiesAdmin = () => {
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar eventos y actividades
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

  const handleDelete = async (activity) => {
    if (window.confirm("¿Seguro que quieres eliminar esta actividad?")) {
      await deleteActivity(activity.eventId, activity.id);
      setActivities((prev) => prev.filter((a) => a.id !== activity.id));
    }
  };

  const handleSave = (updated) => {
    setActivities((prev) => {
      const existing = prev.find((a) => a.id === updated.id);
      if (existing) {
        return prev.map((a) => (a.id === updated.id ? updated : a));
      } else {
        return [...prev, updated];
      }
    });
    setShowForm(false);
  };

  return (
    <div className="activities-admin">
      <div className="header">
        <h2>Gestión de Actividades</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-add"
        >
          Añadir nueva actividad
        </button>
      </div>

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
            {activities.map((a) => {
              const event = events.find((e) => e.id === a.eventId);
              return (
                <tr key={a.id}>
                  <td>{a.title?.es || "-"}</td>
                  <td>{a.title?.eu || "-"}</td>
                  <td>{event?.name?.es || event?.name?.eu || "Sin evento"}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>{a.requiresRegistration ? "Sí" : "No"}</td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => {
                        setEditing(a);
                        setShowForm(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(a)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {showForm && (
        <ActivityForm
          activity={editing}
          events={events}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      <BackButton />
      <BackButton path="/admin" label="🏠 Volver al panel de administración" />
    </div>
  );
};

export default ActivitiesAdmin;
