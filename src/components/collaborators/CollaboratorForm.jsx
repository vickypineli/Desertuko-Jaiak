// src/pages/Admin/CollaboratorForm.jsx

import { useState, useEffect } from "react";
import { addComercio, updateComercio, uploadImage } from "/src/firebase/firestore.js";
import "/src/styles/components/CollaboratorForm.scss";

const CollaboratorForm = ({ collaborator, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    social: { facebook: "", instagram: "", web: "" },
  });

  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState("/assets/img/default-logo.svg");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🧠 Si estamos editando, cargar los datos del colaborador
  useEffect(() => {
    if (collaborator) {
      setFormData({
        category: collaborator.category || "",
        name: collaborator.name || "",
        address: collaborator.address || "",
        phone: collaborator.phone || "",
        email: collaborator.email || "",
        description: collaborator.description || "",
        social: {
          facebook: collaborator.social?.facebook || "",
          instagram: collaborator.social?.instagram || "",
          web: collaborator.social?.web || "",
        },
      });
      setPreview(collaborator.logoUrl || "/assets/img/default-logo.svg");
    }
  }, [collaborator]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        social: { ...prev.social, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setLogoFile(null);
      setPreview("/assets/img/default-logo.svg");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let logoUrl = collaborator?.logoUrl || "/assets/img/default-logo.svg";

      if (logoFile) {
        const fileName = `${Date.now()}_${logoFile.name}`;
        logoUrl = await uploadImage(logoFile, fileName, "comercios");
      }

      const comercioData = { ...formData, logoUrl };

      if (collaborator && collaborator.id) {
        // ✏️ Actualizar comercio existente
        await updateComercio(collaborator.id, comercioData);
        setMessage("✅ Comercio actualizado correctamente");
      } else {
        // ➕ Agregar nuevo comercio
        await addComercio(comercioData);
        setMessage("✅ Comercio agregado correctamente");
      }

      onSave(); // 🔁 Notifica al admin para refrescar la lista
    } catch (error) {
      console.error("❌ Error al guardar el comercio:", error);
      setMessage("❌ Error al guardar el comercio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="collaborator-form-modal">
      <div className="collaborator-form-container">
        <button className="btn-close" onClick={onClose}>
          ✖
        </button>

        <form className="collaborator-form" onSubmit={handleSubmit}>
          <h2>{collaborator ? "Editar comercio" : "Añadir comercio colaborador"}</h2>

          <div className="logo-section">
            <img src={preview} alt="Vista previa del logo" />
            <label>Logo de la empresa</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <p>Si no tiene logo, se usará uno estándar.</p>
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="alimentación">Alimentación</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="servicios">Servicios</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Teléfono de contacto</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="social-section">
            <h3>Redes sociales y web</h3>
            <input
              type="url"
              name="social.facebook"
              placeholder="Facebook"
              value={formData.social.facebook}
              onChange={handleChange}
            />
            <input
              type="url"
              name="social.instagram"
              placeholder="Instagram"
              value={formData.social.instagram}
              onChange={handleChange}
            />
            <input
              type="url"
              name="social.web"
              placeholder="Página web"
              value={formData.social.web}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading
              ? "Guardando..."
              : collaborator
              ? "Actualizar comercio"
              : "Guardar comercio"}
          </button>

          {message && (
            <p
              className={`message ${message.includes("✅") ? "success" : "error"}`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CollaboratorForm;
