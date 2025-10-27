// src/components/ComercioLogo.jsx
import React from "react";
import PropTypes from "prop-types";
import '../styles/ComercioLogo.scss';


function ComercioLogo({ logo, nombre, link }) {
  const content = (
    <div className="home__comercio-card">
      <img
        src={logo}
        alt={nombre}
        className="home__comercio-logo"
        loading="lazy"
      />
    </div>
  );

  // Si tiene link → Envolvemos con <a>, sino devolvemos el logo pelado
  return link ? (
    <a href={link} className="home__comercio-link">
      {content}
    </a>
  ) : (
    content
  );
}

ComercioLogo.propTypes = {
  logo: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  link: PropTypes.string, // opcional
};

export default ComercioLogo;
