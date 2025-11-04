import React from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles/ui/BackButton.scss";

const BackButton = ({ path = "/admin", label = "⬅ Volver al panel principal" }) => {
  const navigate = useNavigate();

  return (
    <button className="btn-back" onClick={() => navigate(path)}>
      {label}
    </button>
  );
};

export default BackButton;
