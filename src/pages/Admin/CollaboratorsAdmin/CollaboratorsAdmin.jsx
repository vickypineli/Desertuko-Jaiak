// src/pages/Admin/CollaboratorsAdmin.jsx
import React, { useEffect, useState } from "react";
import { getAllComercios, deleteComercio } from "/src/firebase/firestore";
import CollaboratorForm from "/src/components/collaborators/CollaboratorForm.jsx";
import LoadingSpinner from "/src/components/common/LoadingSpinner.jsx";
import BackButton from "/src/components/common/BackButton";
import "/src/styles/pages/CollaboratorsAdmin.scss";

const CollaboratorsAdmin = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // almacena el comercio a editar
  const [showForm, setShowForm] = useState(false);

  //  Cargar lista de colaboradores
  const fetchCollaborators = async () => {
    try {
      setLoading(true);
      const data = await getAllComercios();
      setCollaborators(data);
    } catch (error) {
      console.error("Error al cargar colaboradores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, []);

  //  Eliminar comercio
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este colaborador?")) {
      try {
        await deleteComercio(id);
        await fetchCollaborators(); // 🔁 actualiza lista tras eliminar
      } catch (error) {
        console.error("Error al eliminar comercio:", error);
      }
    }
  };

  //  Guardar o actualizar comercio
  const handleSave = async () => {
    await fetchCollaborators(); // 🔁 actualiza lista después de añadir o editar
    setShowForm(false);
    setEditing(null);
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
          ➕ Añadir nuevo
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : collaborators.length > 0 ? (
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
                  {c.logoUrl ? (
                    <img src={c.logoUrl} alt={c.name} className="logo" />
                  ) : (
                    <span>Sin logo</span>
                  )}
                </td>
                <td>{c.name}</td>
                <td>{c.address}</td>
                <td>{c.category || "Sin categoría"}</td>
                <td className="actions">
                  <button
                    onClick={() => {
                      setEditing(c);
                      setShowForm(true);
                    }}
                    className="btn-edit"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="btn-delete"
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No hay comercios registrados aún.</p>
      )}

      {/* Formulario modal */}
      {showForm && (
        <CollaboratorForm
          collaborator={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={handleSave} // actualiza lista tras guardar
        />
      )}

      <div className="footer-buttons">
        <BackButton />
        <BackButton path="/" label="🏠 Volver al sitio principal" />
      </div>
    </div>
  );
};

export default CollaboratorsAdmin;


