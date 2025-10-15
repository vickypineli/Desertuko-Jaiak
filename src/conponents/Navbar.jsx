import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

function Navbar() {
  const { t, toggleLanguage } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar__logo">Desertuko Jaiak</div>
      <ul className="navbar__links">
        <li>{t('home')}</li>
        <li>{t('eventos')}</li>
        <li>{t('comercios')}</li>
        <li>{t('tienda')}</li>
        <li>{t('contacto')}</li>
      </ul>
      <button onClick={toggleLanguage} className="navbar__lang-btn">
        {t('lang')}
      </button>
    </nav>
  );
}

export default Navbar;


