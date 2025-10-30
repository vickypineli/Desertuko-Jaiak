import React from "react";
import "../styles/Collaborators.scss";

function ComercioCard({ comercio, onViewMore }) {
  return (
    <div className="comercio-card">
      <img src={comercio.logoUrl} alt={comercio.name} className="comercio-card__logo" />
      <h3 className="comercio-card__name">{comercio.name}</h3>
      <p className="comercio-card__category">{comercio.category}</p>
      <button className="comercio-card__btn" onClick={onViewMore}>
        Ver más
      </button>
    </div>
  );
}

export default ComercioCard;
