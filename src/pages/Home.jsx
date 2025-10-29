// src/pages/Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import '../styles/Home.scss';
import DoodleBackground from '../components/Dooackground';
import FiestasCarousel from '../components/FiestasCarousel';
import ComercioLogo from '../components/ComercioLogo';
import Footer from '../components/Footer';

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

  const comercios = [
    { id: 1, nombre: "Comercio 1", logo: "/src/assets/img/logo1.png" },
    { id: 2, nombre: "Comercio 2", logo: "/src/assets/img/logo2.png" },
    { id: 3, nombre: "Comercio 3", logo: "/src/assets/img/logo3.png" },
    { id: 4, nombre: "Comercio 4", logo: "/src/assets/img/logo1.png" },
    { id: 5, nombre: "Comercio 5", logo: "/src/assets/img/logo2.png" },
    { id: 6, nombre: "Comercio 6", logo: "/src/assets/img/logo3.png" },
    { id: 7, nombre: "Comercio 7", logo: "/src/assets/img/logo1.png" },
    { id: 8, nombre: "Comercio 8", logo: "/src/assets/img/logo2.png" },
    { id: 9, nombre: "Comercio 9", logo: "/src/assets/img/logo3.png" },
  ];

  return (
    <div className="home">
      {/* =====================================================
          HERO PRINCIPAL
      ===================================================== */}
      <DoodleBackground type="default">
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
              loading="lazy"
            />
          </motion.div>
        </section>
      </DoodleBackground>


      {/* =====================================================
          SECCIÓN FIESTAS
      ===================================================== */}
      <DoodleBackground type="dark">
        <section className="home__fiestas">
          <h2 className="home__section-title">{t("fiestas_del_ano")}</h2>
          <FiestasCarousel
            items={[
              { nombre: t("desertuko_jaiak"), fecha: "18 Jun", color: "#FF5733" },
              { nombre: t("putxera_eguna"), fecha: "18 Oct", color: "#33C1FF" },
              { nombre: t("navidades"), fecha: "24 y 31 Dic", color: "#8D33FF" },
            ]}
            autoplayMs={5000}
          />
        </section>
      </DoodleBackground>
      {/* =====================================================
          SECCIÓN COMERCIOS COLABORADORES
      ===================================================== */}

      <DoodleBackground type="party">
        <section className="home__comercios">
          <h2 className="home__section-title">{t("comercios_colaboradores")}</h2>
          <p className="home__text">{t("comercios_text")}</p>
          <a href="/comercios" className="home__comercios-btn">
            {t("ver_todos")}
          </a>
          <div className="home__comercios-slider">
          <div className="home__comercios-track">
            {[...comercios, ...comercios].map((c, index) => (
                    <ComercioLogo
                      key={index}
                      logo={c.logo}
                      nombre={c.nombre}
                      link={`/comercios/${c.id}`}
                    />
            ))}
          </div>
        </div>
        </section>
      </DoodleBackground>

      {/* TIENDA */}
      <DoodleBackground type="dark">
        <section className="home__tienda">
          <h2 className="home__section-title">{t("tienda")}</h2>
          <p className="home__tienda__description">
            Apoya las fiestas con el merchandising oficial de Desertuko Jaiak.
            ¡Llévate un recuerdo colorido del mejor verano del barrio!
          </p>

          <a href="/tienda" className="home__tienda__button">
            {t("cta_tienda")}
          </a>
        </section>
      </DoodleBackground>

      {/* =====================================================
        SECCIÓN: Fiestas libres de agresiones / Jai askeak
        ===================================================== */}
      <DoodleBackground type="feminist">
        <section className="home__politica" aria-labelledby="politica-title">
          <div className="home__politica-inner">
            <div className="home__politica-text">
              <h2 id="politica-title" className="home__politica-title">
                {t("fiestas_libres_titulo")}
              </h2>
              <p className="home__politica-desc">
                {t("fiestas_libres_texto")}
              </p>
              {/* CTA opcional — descomenta si quieres */}
              {/* <a href="/protocolo" className="btn btn--primary home__politica-cta">
                {t("fiestas_libres_cta")}
              </a> */}
            </div>

            <div className="home__politica-mascota" role="img" aria-label={t('mascota_alt')}>
              <img
                src="/src/assets/img/mascota-feminista.png"
                alt={t('mascota_alt')}
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </DoodleBackground>
      <Footer />
    </div>

    
  );
}

export default Home;
