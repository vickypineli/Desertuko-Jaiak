// src/pages/Admin/AdminPanel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStore, FaTshirt, FaCalendarAlt } from "react-icons/fa";
import DoodleBackground from "../../components/common/DoodleBackground.jsx";
import BackButton from "../../components/common/BackButton";
import "../../styles/pages/AdminPanel.scss";

const AdminPanel = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "collaborators",
      title: "Colaboradores",
      description: "Gestiona los comercios y empresas colaboradoras.",
      icon: <FaStore />,
      path: "/admin/collaborators",
    },
    {
      id: "shop",
      title: "Tienda / Merchandising",
      description: "Añade, edita o elimina productos del merchandising.",
      icon: <FaTshirt />,
      path: "/admin/shop",
    },
    {
      id: "events",
      title: "Eventos y Actividades",
      description: "Administra las actividades y el programa de las fiestas.",
      icon: <FaCalendarAlt />,
      path: "/admin/events",
    },
  ];

  return (
    <DoodleBackground type="admin">
      <section className="admin-panel">
        <div className="admin-panel__header">
          <h1 className="admin-panel__title">Panel de Administración</h1>
        </div>

        <div className="admin-panel__grid">
          {sections.map((section) => (
            <div
              key={section.id}
              className="admin-panel__card"
              onClick={() => navigate(section.path)}
            >
              <div className="admin-panel__icon">{section.icon}</div>
              <h2 className="admin-panel__card-title">{section.title}</h2>
              <p className="admin-panel__card-text">{section.description}</p>
              <button className="admin-panel__button">Entrar</button>
            </div>
          ))}
        </div>
         <BackButton path="/" label="🏠 Volver al sitio principal" />
      </section>
    </DoodleBackground>
  );
};

export default AdminPanel;

