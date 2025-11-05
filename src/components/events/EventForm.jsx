// src/components/events/EventForm.jsx
import React, { useEffect, useState } from "react";
import { addEvent, updateEvent } from "../../firebase/firestore";
import "../../styles/components/Events/EventForm.scss"; // Reutiliza el mismo estilo

const EventForm = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: { es: "", eu: "" },
    date: "",
    isMultiDay: false,
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Si estamos editando, precarga los datos
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || { es: "", eu: "" },
        date: event.date || "",
        isMultiDay: event.isMultiDay || false,
        endDate: event.endDate || "",
      });
    }
  }, [event]);

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
      // Si no es multiday, limpiamos la fecha final
      const dataToSave = {
        ...formData,
        endDate: formData.isMultiDay ? formData.endDate : "",
      };

      if (event?.id) {
        await updateEvent(event.id, dataToSave);
        onSave({ ...event, ...dataToSave });
        setMessage("✅ Evento actualizado correctamente");
      } else {
        const newId = await addEvent(dataToSave);
        onSave({ id: newId, ...dataToSave });
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
    <div className="event-form-overlay">
      <div className="event-form-container">
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
            <label>Fecha de inicio</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="isMultiDay"
                checked={formData.isMultiDay}
                onChange={handleChange}
              />
              El evento dura varios días
            </label>
          </div>

          {formData.isMultiDay && (
            <div className="form-group">
              <label>Fecha final</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
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