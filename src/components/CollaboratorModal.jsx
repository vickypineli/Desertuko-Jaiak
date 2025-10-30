import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "../styles/CollaboratorModal.scss";

function CollaboratorModal({ comercio, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button className="modal-close" onClick={onClose}>✕</button>
          <img src={comercio.logoUrl} alt={comercio.name} className="modal-logo" />
          <h2 className="modal-title">{comercio.name}</h2>
          <p className="modal-category">🏷️ {comercio.category}</p>
          <p className="modal-description">{comercio.description}</p>
          {comercio.address && <p className="modal-address">📍 {comercio.address}</p>}

          <div className="modal-socials">
            {comercio.social?.instagram && (
              <a href={comercio.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {comercio.social?.facebook && (
              <a href={comercio.social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            )}
            {comercio.social?.web && (
              <a href={comercio.social.web} target="_blank" rel="noopener noreferrer">
                Web
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CollaboratorModal;
