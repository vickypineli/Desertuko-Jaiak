// src/pages/Admin/CollaboratorsAdmin.jsx
import React, { useEffect, useState } from "react";
import { getAllComercios, deleteCollaborator } from "../../firebase/firestore";
import CollaboratorForm from "./CollaboratorForm";
import LoadingSpinner from "../../components/LoadingSpinner";

const CollaboratorsAdmin = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllComercios();
      setCollaborators(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este colaborador?")) {
      await deleteCollaborator(id);
      setCollaborators(collaborators.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-violet-600">Colaboradores</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-violet-500 text-white px-4 py-2 rounded-xl hover:bg-violet-600"
        >
          Añadir nuevo
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-violet-100">
            <tr>
              <th className="p-3 text-left">Logo</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Categoría</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {collaborators.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">
                  {c.logoUrl && (
                    <img src={c.logoUrl} alt={c.name} className="h-10 w-10 object-contain" />
                  )}
                </td>
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.category}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(c);
                      setShowForm(true);
                    }}
                    className="text-violet-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <CollaboratorForm
          collaborator={editing}
          onClose={() => setShowForm(false)}
          onSave={(updated) => {
            if (editing) {
              setCollaborators(
                collaborators.map((c) => (c.id === updated.id ? updated : c))
              );
            } else {
              setCollaborators([...collaborators, updated]);
            }
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default CollaboratorsAdmin;
