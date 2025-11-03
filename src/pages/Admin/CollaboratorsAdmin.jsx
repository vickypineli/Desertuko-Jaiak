// src/pages/Admin/CollaboratorsAdmin.jsx
import React, { useEffect, useState } from "react";
import { getAllComercios, deleteCollaborator } from "../../firebase/firestore";
import CollaboratorForm from "./CollaboratorForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../../styles/CollaboratorsAdmin.scss";


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
    <div className="collaborators-admin">
      <div className="header">
        <h2>Comercios Colaboradores</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-add"
        >
          Añadir nuevo
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="collaborators-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {collaborators.map((c) => (
              <tr key={c.id}>
                <td>
                  {c.logoUrl && (
                    <img src={c.logoUrl} alt={c.name} className="logo" />
                  )}
                </td>
                <td>{c.name}</td>
                <td>{c.address}</td>
                <td>{c.category}</td>
                <td className="actions">
                  <button
                    onClick={() => {
                      setEditing(c);
                      setShowForm(true);
                    }}
                    className="btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="btn-delete"
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
                collaborators.map((c) =>
                  c.id === updated.id ? updated : c
                )
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

