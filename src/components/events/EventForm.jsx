// src/components/events/EventForm.jsx
import React, { useEffect, useState } from "react";
import { addEvent, updateEvent } from "../../firebase/firestore";
import "../../styles/components/Events/ActivityForm.scss"; // Reutiliza el mismo estilo

const EventForm = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: { es: "", eu: "" },
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Si estamos editando, precarga los datos
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || { es: "", eu: "" },
        date: event.date || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [field, lang] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (event?.id) {
        await updateEvent(event.id, formData);
        onSave({ ...event, ...formData });
        setMessage("✅ Evento actualizado correctamente");
      } else {
        const newId = await addEvent(formData);
        onSave({ id: newId, ...formData });
        setMessage("✅ Evento añadido correctamente");
      }
    } catch (err) {
      console.error("❌ Error al guardar el evento:", err);
      setMessage("❌ Error al guardar el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="activity-form-overlay">
      <div className="activity-form-container">
        <h2>{event ? "Editar evento" : "Nuevo evento"}</h2>

        <form onSubmit={handleSubmit}>
          <h3>Castellano</h3>
          <input
            type="text"
            name="title.es"
            placeholder="Título (ES)"
            value={formData.title.es}
            onChange={handleChange}
            required
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
          <p
            className={`message ${message.includes("✅") ? "success" : "error"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default EventForm;
