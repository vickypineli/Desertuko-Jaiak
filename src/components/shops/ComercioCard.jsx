import React from "react";
import "/src/styles/components/ComercioCard.scss";

function ComercioCard({ comercio, onViewMore }) {
  return (
    <div className="comercio-card">
      <img src={comercio.logoUrl} alt={comercio.name} className="comercio-card__logo" />
      <h3 className="comercio-card__name">{comercio.name}</h3>
      <p className="comercio-card__category">{comercio.address}</p>
      <p className="comercio-card__category">{comercio.phone}</p>
      <button className="comercio-card__view-more-btn" onClick={onViewMore}>
        Ver más
      </button>
    </div>
  );
}

export default ComercioCard;
