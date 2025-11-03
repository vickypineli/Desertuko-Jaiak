// src/pages/Admin/CollaboratorForm.jsx
import { useState } from "react";
import { addComercio, uploadLogo } from "../../firebase/firestore";
import "../../styles/CollaboratorForm.scss"; // 👈 Importa los estilos SASS

const CollaboratorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    social: {
      facebook: "",
      instagram: "",
      web: "",
    },
  });

  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState("/assets/default-logo.svg");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
    } else {
      setLogoFile(null);
      setPreview("/assets/default-logo.png");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let logoUrl = "/assets/default-logo.png";

      if (logoFile) {
        const fileName = `${Date.now()}_${logoFile.name}`;
        logoUrl = await uploadLogo(logoFile, fileName);
      }

      await addComercio({
        ...formData,
        logoUrl,
      });

      setMessage("✅ Comercio agregado correctamente");

      // Reset
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        description: "",
        social: { facebook: "", instagram: "", web: "" },
      });
      setLogoFile(null);
      setPreview("/assets/default-logo.png");
    } catch (error) {
      console.error("❌ Error al guardar el comercio:", error);
      setMessage("❌ Error al guardar el comercio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="collaborator-form" onSubmit={handleSubmit}>
      <h2>Añadir comercio colaborador</h2>

      <div className="logo-section">
        <img src={preview} alt="Vista previa del logo" />
        <label>Logo de la empresa</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <p>Si no tiene logo, se usará uno estándar.</p>
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
        {loading ? "Subiendo..." : "Guardar comercio"}
      </button>

      {message && (
        <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default CollaboratorForm;
