//src/pages/Admin/EventsAdmin/EventsAdmin.jsx

import React, { useEffect, useState } from "react";
import {
  getAllEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "/src/firebase/firestore";
import EventForm from "/src/components/events/EventForm.jsx";
import  Button  from "/src/components/ui/Button.jsx";

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    const data = await getAllEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreate = () => {
    setEditingEvent(null);
    setIsFormVisible(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este evento?")) {
      await deleteEvent(id);
      loadEvents();
    }
  };

  const handleSave = async (data) => {
    if (editingEvent) {
      await updateEvent(editingEvent.id, data);
    } else {
      await addEvent(data);
    }
    setIsFormVisible(false);
    loadEvents();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-violet-700">
        🗓️ Gestión de Eventos
      </h1>

      {!isFormVisible && (
        <>
          <Button onClick={handleCreate} className="mb-4 bg-violet-600">
            ➕ Crear nuevo evento
          </Button>

          {loading ? (
            <p>Cargando eventos...</p>
          ) : events.length === 0 ? (
            <p>No hay eventos registrados.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="border rounded-2xl p-4 shadow bg-white flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-violet-700">
                      {ev.name?.es || "Sin título"}
                    </h2>
                    <p className="text-sm text-gray-600 italic">
                      {ev.name?.eu ? `(${ev.name.eu})` : ""}
                    </p>
                    <p className="mt-2 text-gray-700 text-sm">
                      📅 {ev.startDate} – {ev.endDate}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => handleEdit(ev)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(ev.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      🗑️ Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isFormVisible && (
        <EventForm
          event={editingEvent}
          onCancel={() => setIsFormVisible(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
