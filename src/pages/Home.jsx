// src/pages/Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Home.scss';



function Home() {
  const { t } = useTranslation();

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
      <section className="home__hero">
        <h1 className="home__hero-title">{t('desertuko_jaiak')}</h1>
        <p className="home__hero-text">{t('bienvenida_text')}</p>
        <a href="/eventos" className="home__hero-cta">{t('proxima_fiesta')}</a>
        <a href="/tienda" className="home__hero-btn">{t('cta_tienda')}</a>
      </section>

      {/* Próximas fiestas */}
      <section className="home__fiestas">
        <h2 className="home__section-title">{t('fiestas_del_ano')}</h2>
        <ul className="home__fiestas-list">
          {fiestas.map(f => (
            <li key={f.id} className="home__fiesta-card">
              <h3>{f.nombre}</h3>
              <p>{f.fecha}</p>
            </li>
          ))}
        </ul>
      </section>

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
      <section className="home__tienda">
        <h2 className="home__section-title">{t('tienda')}</h2>
        <a href="/tienda" className="home__tienda-cta">{t('cta_tienda')}</a>
      </section>

      {/* Fiestas libres de agresiones */}
      <section className="home__politica">
        <p>{t('fiestas_libres_agresiones')}</p>
      </section>

      {/* Contacto */}
      <section className="home__contacto">
        <h2 className="home__section-title">{t('contacto')}</h2>
        <a href="/contacto" className="home__contacto-btn">{t('contacto_btn')}</a>
      </section>
    </div>
  );
}

export default Home;
