// src/components/FiestaCard.jsx
import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "/src/styles/components/FiestaCard.scss";

function FiestaCard({ nombre, fecha, imagen }) {
  return (
    <motion.article
      className="fiesta-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      aria-label={`${nombre} - ${fecha}`}
    >
      <div className="fiesta-card__image-wrapper">
        <img
          src={imagen}
          alt={nombre}
          className="fiesta-card__image"
          loading="lazy"
        />
      </div>
      <h3 className="fiesta-card__title">{nombre}</h3>
      <p className="fiesta-card__date">{fecha}</p>
    </motion.article>
  );
}

FiestaCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
};

export default FiestaCard;

