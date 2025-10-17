import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "../styles/FiestaCard.scss";

function FiestaCard({ nombre, fecha, color }) {
  return (
    <motion.div
      className="fiesta-card"
      style={{ borderColor: color }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="fiesta-card__icon" style={{ backgroundColor: color }}></div>
      <h3 className="fiesta-card__title">{nombre}</h3>
      <p className="fiesta-card__date">{fecha}</p>
    </motion.div>
  );
}

FiestaCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default FiestaCard;
