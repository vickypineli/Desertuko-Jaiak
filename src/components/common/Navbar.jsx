import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageProvider";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "/src/styles/ui/Navbar.scss";

function Navbar() {
  const { lang, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { path: "/", label: t("home") },
    { path: "/eventos", label: t("eventos") },
    { path: "/comercios", label: t("comercios") },
    { path: "/tienda", label: t("tienda") },
    { path: "/contacto", label: t("contacto") },
  ];

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* LOGO */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <img
            src="src/assets/img/tino sin fondo.png"
            alt="Tino Gasolino"
            className="navbar__logo-img"
          />
        </Link>

        {/* LINKS DESKTOP */}
        <nav className="navbar__links">
          {menuItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ACCIONES DERECHA */}
        <div className="navbar__actions">
          {/* 🔄 SWITCH DE IDIOMA (solo visible en desktop) */}
          <div className="switch switch--desktop">
            <input
              id="language-toggle"
              className="check-toggle check-toggle-round-flat"
              type="checkbox"
              checked={lang === "eu"}
              onChange={toggleLanguage}
            />
            <label htmlFor="language-toggle"></label>
            <span className="on">ES</span>
            <span className="off">EU</span>
          </div>

          <p className="navbar__user">👋{t('hola')}</p>

          {/* BOTÓN MENÚ MÓVIL */}
          <button
            className={`navbar__menu-btn ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
      {isOpen && (
            <motion.nav
                className="navbar__mobile"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
          <ul>
            {menuItems.map(({ path, label }) => (
              <li key={path}>
                <Link to={path} onClick={closeMenu}>
                  {label}
                </Link>
              </li>
            ))}
            {/* 🌐 SWITCH DE IDIOMA - solo en menú móvil */}
            <li>
              <div className="switch switch--mobile">
                <input
                  id="language-toggle-mobile"
                  className="check-toggle check-toggle-round-flat"
                  type="checkbox"
                  checked={lang === "eu"}
                  onChange={toggleLanguage}
                />
                <label htmlFor="language-toggle-mobile"></label>
                <span className="on">ES</span>
                <span className="off">EU</span>
              </div>
            </li>
          </ul>
        </motion.nav>
      )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;

