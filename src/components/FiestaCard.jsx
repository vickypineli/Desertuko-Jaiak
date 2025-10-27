// src/components/FiestaCard.jsx
import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "../styles/FiestaCard.scss";

function FiestaCard({ nombre, fecha, color }) {
  return (
    <motion.article
      className="fiesta-card"
      style={{ borderColor: color }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      aria-label={`${nombre} - ${fecha}`}
    >
      <div className="fiesta-card__icon" style={{ backgroundColor: color }} />
      <h3 className="fiesta-card__title">{nombre}</h3>
      <p className="fiesta-card__date">{fecha}</p>
    </motion.article>
  );
}

FiestaCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default FiestaCard;

