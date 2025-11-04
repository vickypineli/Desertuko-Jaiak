// src/pages/Admin/EventsAdmin/ActivityForm.jsx
import React, { useState, useEffect } from "react";
import { addActivity, updateActivity } from "../../../firebase/firestore";
import "../../../styles/ActivityForm.scss";

const ActivityForm = ({ activity, events, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    eventId: "",
    title: { es: "", eu: "" },
    description: { es: "", eu: "" },
    date: "",
    time: "",
    location: "",
    requiresRegistration: false,
    registrationFormUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Si se está editando, precargar datos
  useEffect(() => {
    if (activity) {
      setFormData({
        eventId: activity.eventId || "",
        title: activity.title || { es: "", eu: "" },
        description: activity.description || { es: "", eu: "" },
        date: activity.date || "",
        time: activity.time || "",
        location: activity.location || "",
        requiresRegistration: activity.requiresRegistration || false,
        registrationFormUrl: activity.registrationFormUrl || "",
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("title.") || name.includes("description.")) {
      const [field, lang] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (activity?.id) {
        await updateActivity(activity.eventId, activity.id, formData);
        onSave({ ...activity, ...formData });
        setMessage("✅ Actividad actualizada correctamente");
      } else {
        const newId = await addActivity(formData.eventId, formData);
        onSave({ id: newId, ...formData });
        setMessage("✅ Actividad añadida correctamente");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error al guardar la actividad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="activity-form-overlay">
      <div className="activity-form">
        <h2>{activity ? "Editar actividad" : "Nueva actividad"}</h2>

        <form onSubmit={handleSubmit}>
          <label>Evento</label>
          <select
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un evento</option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name?.es || e.name?.eu || e.id}
              </option>
            ))}
          </select>

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

          <div className="form-group">
            <label>Lugar</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

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

          {formData.requiresRegistration && (
            <div className="form-group">
              <label>URL del formulario</label>
              <input
                type="url"
                name="registrationFormUrl"
                placeholder="https://..."
                value={formData.registrationFormUrl}
                onChange={handleChange}
              />
            </div>
          )}

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
