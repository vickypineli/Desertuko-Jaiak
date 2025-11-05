// src/components/events/ActivityForm.jsx
import React, { useState, useEffect } from "react";
import { getAllEvents, addActivity, updateActivity } from "../../firebase/firestore";
import "/src/styles/components/Events/ActivityForm.scss";

const ActivityForm = ({ activity, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    eventId: "",
    eventName: "",
    title: { es: "", eu: "" },
    description: { es: "", eu: "" },
    date: "",
    time: "",
    location: "",
    requiresRegistration: false,
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* =====================================================
     🔄 Cargar lista de eventos desde Firestore
  ===================================================== */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents();
        setEvents(eventsData);
      } catch (err) {
        console.error("❌ Error al cargar eventos:", err);
        setMessage("Error al cargar los eventos");
      }
    };

    fetchEvents();
  }, []);

  /* =====================================================
     🌀 Precargar datos si se edita una actividad
  ===================================================== */
  useEffect(() => {
    if (activity) {
      setFormData({
        eventId: activity.eventId || "",
        eventName: activity.eventName || "",
        title: activity.title || { es: "", eu: "" },
        description: activity.description || { es: "", eu: "" },
        date: activity.date || "",
        time: activity.time || "",
        location: activity.location || "",
        requiresRegistration: activity.requiresRegistration || false,
      });
    }
  }, [activity]);

  /* =====================================================
     🖊️ Manejo de cambios
  ===================================================== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [field, lang] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "eventId") {
      const selected = events.find((ev) => ev.id === value);
      setFormData((prev) => ({
        ...prev,
        eventId: value,
        eventName: selected ? selected.title?.es || selected.title?.eu || "" : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

/* =====================================================
     💾 Guardar (nuevo o edición)
  ===================================================== */
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    if (!formData.eventId) {
      setMessage("❌ Debes seleccionar un evento.");
      setLoading(false);
      return;
    }

    if (activity?.id) {
      await updateActivity(activity.id, formData);
      onSave({ ...activity, ...formData });
      setMessage("✅ Actividad actualizada correctamente");
    } else {
      const newId = await addActivity(formData);
      onSave({ id: newId, ...formData });
      setMessage("✅ Actividad añadida correctamente");
    }

    // 🔹 Esperar un poco para mostrar el mensaje antes de cerrar
    setTimeout(() => {
      onClose();
    }, 1200);
  } catch (err) {
    console.error("❌ Error al guardar actividad:", err);
    setMessage("❌ Error al guardar la actividad");
  } finally {
    setLoading(false);
  }
};


  /* =====================================================
     🧱 Render
  ===================================================== */
  return (
    <div className="activity-form-container">
      <div className="activity-form">
        <h2>{activity ? "Editar actividad" : "Nueva actividad"}</h2>

        <form onSubmit={handleSubmit}>
          {/* Evento */}
          <label>Evento</label>
          <select
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un evento</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.title?.es || ev.title?.eu || "Evento sin título"}
              </option>
            ))}
          </select>

          {/* Título y descripción (Castellano) */}
          <h3>Castellano</h3>
          <input
            type="text"
            name="title.es"
            placeholder="Título (ES)"
            value={formData.title.es}
            onChange={handleChange}
            required
          />
          <textarea
            name="description.es"
            placeholder="Descripción (ES)"
            value={formData.description.es}
            onChange={handleChange}
          />

          {/* Título y descripción (Euskera) */}
          <h3>Euskera</h3>
          <input
            type="text"
            name="title.eu"
            placeholder="Titulua (EU)"
            value={formData.title.eu}
            onChange={handleChange}
            required
          />
          <textarea
            name="description.eu"
            placeholder="Deskribapena (EU)"
            value={formData.description.eu}
            onChange={handleChange}
          />

          {/* Fecha y hora */}
          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Hora</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          {/* Lugar */}
          <div className="form-group">
            <label>Lugar</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Checkbox inscripción */}
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="requiresRegistration"
                checked={formData.requiresRegistration}
                onChange={handleChange}
              />
              Requiere inscripción previa
            </label>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>

        {message && (
          <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityForm;



