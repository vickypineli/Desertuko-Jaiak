//src/components/EventForm.jsx
import { useState } from "react";
import  Button  from "/src/components/ui/Button.jsx";

export default function EventForm({ event, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    name: event?.name || { es: "", eu: "" },
    description: event?.description || { es: "", eu: "" },
    startDate: event?.startDate || "",
    endDate: event?.endDate || "",
    pdfUrl: event?.pdfUrl || "",
  });

  const handleChange = (lang, field, value) => {
    if (field === "name" || field === "description") {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-violet-700 mb-4">
        {event ? "✏️ Editar Evento" : "➕ Nuevo Evento"}
      </h2>

      <div className="grid gap-4">
        {/* Nombre */}
        <div>
          <label className="block font-semibold text-gray-700">Título (ES)</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={formData.name.es}
            onChange={(e) => handleChange("es", "name", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Titulua (EU)</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={formData.name.eu}
            onChange={(e) => handleChange("eu", "name", e.target.value)}
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block font-semibold text-gray-700">
            Descripción (ES)
          </label>
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            value={formData.description.es}
            onChange={(e) => handleChange("es", "description", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Deskribapena (EU)</label>
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            value={formData.description.eu}
            onChange={(e) => handleChange("eu", "description", e.target.value)}
          />
        </div>

        {/* Fechas */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold text-gray-700">Fecha inicio</label>
            <input
              type="date"
              className="w-full border rounded p-2"
              value={formData.startDate}
              onChange={(e) => handleChange(null, "startDate", e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-gray-700">Fecha fin</label>
            <input
              type="date"
              className="w-full border rounded p-2"
              value={formData.endDate}
              onChange={(e) => handleChange(null, "endDate", e.target.value)}
              required
            />
          </div>
        </div>

        {/* PDF */}
        <div>
          <label className="block font-semibold text-gray-700">
            Enlace al PDF del programa (opcional)
          </label>
          <input
            type="url"
            placeholder="https://..."
            className="w-full border rounded p-2"
            value={formData.pdfUrl}
            onChange={(e) => handleChange(null, "pdfUrl", e.target.value)}
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500"
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
            {event ? "Guardar cambios" : "Crear evento"}
          </Button>
        </div>
      </div>
    </form>
  );
}
