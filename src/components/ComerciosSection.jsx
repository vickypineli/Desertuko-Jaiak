// src/components/ComerciosSection.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "../styles/ComerciosSection.scss";

function ComerciosSection() {
  const { t } = useTranslation();

  const comercios = [
    { id: 1, logo: "/assets/logo1.png", nombre: "Bar Eguzki" },
    { id: 2, logo: "/assets/logo2.png", nombre: "Panadería Itxaso" },
    { id: 3, logo: "/assets/logo3.png", nombre: "Frutería Ainhoa" },
    { id: 4, logo: "/assets/logo4.png", nombre: "Cafetería Zuri" },
    { id: 5, logo: "/assets/logo5.png", nombre: "Super Uxue" },
  ];

  return (
    <section className="comercios-section">
      {/* 🏷️ Texto superior */}
      <motion.div
        className="comercios-section__info"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="comercios-section__title">
          {t("comercios_colaboradores")}
        </h2>
        <p className="comercios-section__text">
          {t("desc_comercios_colaboradores") ||
            "Gracias a nuestros comercios locales por hacer posible las fiestas del barrio. ¡Apóyalos visitando sus negocios!"}
        </p>
        <a href="/comercios" className="comercios-section__btn">
          {t("ver_todos")}
        </a>
      </motion.div>

      {/* 🌀 Carrusel de logos */}
      <div className="comercios-section__carousel">
        <motion.div
          className="comercios-section__track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {[...comercios, ...comercios].map((c, i) => (
            <div key={i} className="comercios-section__logo">
              <img src={c.logo} alt={c.nombre} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ComerciosSection;
