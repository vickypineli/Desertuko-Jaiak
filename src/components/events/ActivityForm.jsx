// src/components/events/ActivityForm.jsx
import React, { useState, useEffect } from "react";
import { addActivity, updateActivity } from "../../firebase/firestore";
import "/src/styles/components/Events/ActivityForm.scss";



const ActivityForm = ({ activity, onSave, onClose, events }) => {
  const [formData, setFormData] = useState({
    eventId: "",
    title: { es: "", eu: "" },
    description: { es: "", eu: "" },
    date: "",
    time: "",
    location: "",
    requiresRegistration: false,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activity) setFormData(activity);
  }, [activity]);

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
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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

      setTimeout(() => onClose(), 1200);
    } catch (err) {
      console.error("❌ Error al guardar actividad:", err);
      setMessage("❌ Error al guardar la actividad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="activity-form-container">
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
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.title?.es || ev.title?.eu || "Evento sin título"}
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

          <div className="form-row">
            <label>
              Fecha
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Hora
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Lugar
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              name="requiresRegistration"
              checked={formData.requiresRegistration}
              onChange={handleChange}
            />
            Requiere inscripción previa
          </label>

          {message && (
            <p
              className={`message ${
                message.startsWith("✅") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}

          <div className="button-group">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;



