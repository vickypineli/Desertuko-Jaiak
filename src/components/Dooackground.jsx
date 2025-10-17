// src/components/DoodleBackground.jsx
import React from "react";
import PropTypes from "prop-types";
import "../styles/DoodleBackground.scss";

/**
 * DoodleBackground
 * Props:
 * - type: "light" | "dark" | "party" | "minimal" | "default"
 * - children: contenido que se renderiza dentro del fondo
 */
function DoodleBackground({ type = "light", children }) {
  const bgClass = `doodle--${type}`;
  return <div className={`doodle ${bgClass}`}>{children}</div>;
}

DoodleBackground.propTypes = {
  type: PropTypes.oneOf(["light", "dark", "party", "minimal", "default"]),
  children: PropTypes.node,
};

export default DoodleBackground;
