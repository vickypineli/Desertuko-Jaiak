import React from "react";
// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from "framer-motion";
import "../styles/CollaboratorModal.scss";

import {
  FaTimes,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaGlobe,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

const CollaboratorModal = ({ comercio, onClose }) => {
  if (!comercio) return null;

  const { logoUrl, name, address, phone, email, description, social = {} } =
    comercio;

  const socialLinks = [
    { icon: <FaGlobe />, url: social.web, label: "Web" },
    { icon: <FaInstagram />, url: social.instagram, label: "Instagram" },
    { icon: <FaFacebook />, url: social.facebook, label: "Facebook" },
    { icon: <FaTwitter />, url: social.twitter, label: "Twitter" },
  ].filter((s) => s.url);

  return (
    <div className="collaborator-modal__overlay" onClick={onClose}>
      <div
        className="collaborator-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="collaborator-modal__close" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Botón flotante de cierre para móvil */}
        <button className="collaborator-modal__close-floating" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="collaborator-modal__header">
          <img
            src={logoUrl || "/assets/default-logo.png"}
            alt={name}
            className="collaborator-modal__logo"
          />
          <h2>{name}</h2>
        </div>

        <div className="collaborator-modal__info">
          {address && (
            <p className="info-item">
              <FaMapMarkerAlt /> {address}
            </p>
          )}
          {phone && (
            <p className="info-item">
              <FaPhone /> {phone}
            </p>
          )}
          
          {email && (
            <p className="info-item">
              <FaEnvelope /> {email}
            </p>
          )}
        </div>

        {description && (
          <p className="collaborator-modal__description">{description}</p>
        )}

        {socialLinks.length > 0 && (
          <div className="collaborator-modal__social">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaboratorModal;

