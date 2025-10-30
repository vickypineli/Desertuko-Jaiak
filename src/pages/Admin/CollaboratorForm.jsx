// src/pages/Admin/CollaboratorForm.jsx
import React, { useState } from "react";
import { addCollaborator, updateCollaborator } from "../../firebase/firestore";


const CollaboratorForm = ({ collaborator, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    collaborator || { name: "", category: "", description: "", logoUrl: "", link: "" }
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (collaborator) {
        await updateCollaborator(collaborator.id, formData);
        onSave({ ...formData, id: collaborator.id });
      } else {
        const id = await addCollaborator(formData);
        onSave({ ...formData, id });
      }
    } catch (err) {
      console.error("Error guardando colaborador:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-semibold text-violet-600 mb-4">
          {collaborator ? "Editar colaborador" : "Añadir colaborador"}
        </h3>

        {["name", "category", "description", "logoUrl", "link"].map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-sm font-medium capitalize mb-1 text-gray-700">
              {field}
            </label>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-400"
              required={field !== "description"}
            />
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollaboratorForm;
