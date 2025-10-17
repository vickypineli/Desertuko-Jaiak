// src/pages/Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import '../styles/Home.scss';
import DoodleBackground from '../components/Dooackground';



function Home() {
  const { t } = useTranslation();

  const textAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  // Placeholder de fiestas
  const fiestas = [
    { id: 1, nombre: t('putxera_eguna'), fecha: '18 Jun' },
    { id: 2, nombre: t('navidad'), fecha: '24 Dic' },
    { id: 3, nombre: t('nochevieja'), fecha: '31 Dic' },
  ];

  // Placeholder de comercios
  const comercios = [
    { id: 1, nombre: 'Comercio 1', logo: '/assets/logo1.png' },
    { id: 2, nombre: 'Comercio 2', logo: '/assets/logo2.png' },
    { id: 3, nombre: 'Comercio 3', logo: '/assets/logo3.png' },
  ];

  return (
    <div className="home">
      {/* Hero */}
      <DoodleBackground type="light">
      <section className="home__hero">
        
      <motion.div
        className="home__hero-content"
        initial="hidden"
        animate="visible"
        variants={textAnimation}
      >
          <h1 className="home__title">{t("desertuko_jaiak")}</h1>
          <p className="home__subtitle">{t("bienvenida_text")}</p>

          <div className="home__buttons">
            <a href="/eventos" className="btn btn--primary">
              {t("proxima_fiesta")}
            </a>
            <a href="/tienda" className="btn btn--secondary">
              {t("cta_tienda")}
            </a>
          </div>
        </motion.div>

      <motion.div
        className="home__hero-image"
        initial="hidden"
        animate="visible"
        variants={imageAnimation}
      >
          <img
            src="/src/assets/img/tino sin fondo.png"
            alt="Tino Gasolino"
          />
        </motion.div>
        
      </section>
      </DoodleBackground>
      {/* Próximas fiestas */}
      <DoodleBackground type="minimal">
        <section className="home__fiestas">
          <h2 className="home__section-title">{t("fiestas_del_ano")}</h2>
          <ul className="home__fiestas-list">
            {fiestas.map((f) => (
              <li key={f.id} className="home__fiesta-card">
                <h3>{f.nombre}</h3>
                <p>{f.fecha}</p>
              </li>
            ))}
          </ul>
        </section>
      </DoodleBackground>

      {/* Carrusel de comercios */}
      <section className="home__comercios">
        <h2 className="home__section-title">{t('comercios_colaboradores')}</h2>
        <div className="home__comercios-slider">
          {comercios.map(c => (
            <div key={c.id} className="home__comercio-card">
              <img src={c.logo} alt={c.nombre} className="home__comercio-logo" />
              <p>{c.nombre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección tienda */}
       <DoodleBackground type="party">
        <section className="home__comercios">
          <h2 className="home__section-title">
            {t("comercios_colaboradores")}
          </h2>
          <p className="home__text">{t("comercios_text")}</p>
          <a href="/comercios" className="home__comercios-btn">
            {t("ver_todos")}
          </a>

          <div className="home__comercios-slider">
            <img src="/assets/logo1.png" alt="Comercio 1" />
            <img src="/assets/logo2.png" alt="Comercio 2" />
            <img src="/assets/logo3.png" alt="Comercio 3" />
          </div>
        </section>
      </DoodleBackground>
            {/* TIENDA */}
      <DoodleBackground type="dark">
        <section className="home__tienda">
          <h2 className="home__section-title">{t("tienda")}</h2>
          <a href="/tienda" className="home__tienda-cta">
            {t("cta_tienda")}
          </a>
        </section>
      </DoodleBackground>

      {/* POLÍTICA */}
      <DoodleBackground type="default">
        <section className="home__politica">
          <p>{t("fiestas_libres_agresiones")}</p>
        </section>
      </DoodleBackground>
    </div>
  );
}

export default Home;
