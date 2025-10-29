import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/Footer.scss";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Columna 1: Logo / Nombre */}
        <div className="footer__brand">
          <h2 className="footer__title">{t("desertuko_jaiak")}</h2>
          <p className="footer__text">{t("organized_by")}</p>
        </div>

        {/* Columna 2: Enlaces */}
        <div className="footer__links">
          <h3 className="footer__subtitle">{t("desertuko_jaiak")}</h3>
          <ul>
            <li><a href="#inicio">{t("home")}</a></li>
            <li><a href="#programa">{t("eventos")}</a></li>
            <li><a href="#galeria">{t("tienda")}</a></li>
            <li><a href="#contacto">{t("contacto")}</a></li>
          </ul>
        </div>

        {/* Columna 3: Redes sociales */}
        <div className="footer__social">
          <h3 className="footer__subtitle">{t("follow_us")}</h3>
          <div className="footer__icons">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Desertuko Jaiak · Barakaldo</p>
        <p>{t("designed_by")}</p>
      </div>
    </footer>
  );
};

export default Footer;



