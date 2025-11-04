// src/components/ui/Button.jsx

import React from "react";
import { IconContext } from "react-icons";
import "/src/styles/ui/Button.scss";

/**
 * Botón reutilizable con soporte para iconos.
 *
 * Props:
 * - variant: "primary" | "secondary" | "danger" | "outline"
 * - size: "sm" | "md" | "lg" | "icon"
 * - icon: componente de icono (opcional)
 * - iconPosition: "left" | "right"
 * - children: texto del botón
 */
const Button = ({
  children,
  icon: Icon,
  iconPosition = "left",
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) => {
  const isIconOnly = size === "icon" && !children;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn ${variant} ${size} ${isIconOnly ? "btn-icon" : ""} ${className}`}
      {...props}
    >
      <IconContext.Provider value={{ size: "1.1em" }}>
        {Icon && iconPosition === "left" && <Icon />}
        {!isIconOnly && children}
        {Icon && iconPosition === "right" && <Icon />}
      </IconContext.Provider>
    </button>
  );
};

export default Button;
