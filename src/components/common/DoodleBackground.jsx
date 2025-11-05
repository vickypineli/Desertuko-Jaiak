// src/components/common/DoodleBackground.jsx
import React from "react";
import PropTypes from "prop-types";
import "/src/styles/components/DoodleBackground.scss";

/**
 * DoodleBackground
 * Props:
 * - type: "feminist1"| "light" | "dark" | "party" | "minimal" | "default"
 * - children: contenido que se renderiza dentro del fondo
 */
function DoodleBackground({ type = "light", children }) {
  const bgClass = `doodle--${type}`;
  return <div className={`doodle ${bgClass}`}>{children}</div>;
}

DoodleBackground.propTypes = {
  type: PropTypes.oneOf(["feminist1","light", "dark", "party", "minimal", "default"]),
  children: PropTypes.node,
};

export default DoodleBackground;
