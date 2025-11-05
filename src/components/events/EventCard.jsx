// src/components/events/EventCard.jsx
import React from "react";
import "/src/styles/components/Events/EventCard.scss";

const EventCard = ({ title, startDate, endDate, image }) => {
  // Formatea las fechas a formato legible
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formattedDate = endDate
    ? `${formatDate(startDate)} — ${formatDate(endDate)}`
    : formatDate(startDate);

  return (
    <article className="fiesta-card">
      <div className="fiesta-card__image-container">
        <img src={image} alt={title} className="fiesta-card__image" />
      </div>
      <div className="fiesta-card__content">
        <h2 className="fiesta-card__title">{title}</h2>
        <p className="fiesta-card__date">{formattedDate}</p>
      </div>
    </article>
  );
};

export default EventCard;
