// src/pages/Admin/AdminPanel.jsx
import React, { useState } from "react";
import CollaboratorsAdmin from "./CollaboratorsAdmin";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("collaborators");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-violet-600 mb-6">Panel de Administración</h1>

      <nav className="mb-8">
        <button
          className={`mr-4 px-4 py-2 rounded-xl ${
            activeTab === "collaborators"
              ? "bg-violet-500 text-white"
              : "bg-white border border-violet-300 text-violet-600"
          }`}
          onClick={() => setActiveTab("collaborators")}
        >
          Colaboradores
        </button>
      </nav>

      {activeTab === "collaborators" && <CollaboratorsAdmin />}
    </div>
  );
};

export default AdminPanel;
