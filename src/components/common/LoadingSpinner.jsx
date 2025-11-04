// src/components/LoadingSpinner.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "/src/styles/components/LoadingSpinner.scss";

export default function LoadingSpinner() {
  const { t } = useTranslation();

  return (
    <div className="loading">
      <div className="loading__circle"></div>
      <div className="loading__text">{t("cargando")}</div>
    </div>
  );
}
