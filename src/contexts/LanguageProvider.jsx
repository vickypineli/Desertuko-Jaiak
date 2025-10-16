import React, { createContext, useContext, useState } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('es');

  const toggleLanguage = () => {
    const newLang = lang === 'es' ? 'eu' : 'es';
    setLang(newLang);
    i18n.changeLanguage(newLang); // 👈 cambia el idioma en i18next
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
