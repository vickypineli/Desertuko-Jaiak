// src/components/FiestasCarousel.jsx
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import EventCard from "/src/components/events/EventCard.jsx";
import "/src/styles/components/FiestasCarousel.scss";

const DEFAULT_AUTOPLAY_MS = 5000; // 5s

export default function FiestasCarousel({ autoplayMs = DEFAULT_AUTOPLAY_MS }) {
  const { t } = useTranslation();

  // ✅ Los textos traducibles deben definirse *dentro* del componente
const items = [
  {
    nombre: t("desertuko_jaiak"),
    fecha: "18 Jun",
    imagen: "/src/assets/img/logo1.png"
  },
  {
    nombre: t("putxera_eguna"),
    fecha: "18 Oct",
    imagen: "/src/assets/img/logo2.png"
  },
  {
    nombre: t("navidad"),
    fecha: "24 y 31 Dic",
    imagen: "/src/assets/img/logo3.png"
  }
];

  const count = items.length;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const touchHoldRef = useRef(false);

  const goTo = (i) => setIndex((i + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay
  useEffect(() => {
    if (!autoplayMs || isPaused) return;
    autoplayRef.current = setInterval(next, autoplayMs);
    return () => clearInterval(autoplayRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isPaused, autoplayMs]);

  // Pausar con hover o touch
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => {
    touchHoldRef.current = true;
    setIsPaused(true);
    setTimeout(() => (touchHoldRef.current = false), 600);
  };
  const handleTouchEnd = () => setIsPaused(false);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 50;
    if (offset < -threshold || velocity < -500) next();
    else if (offset > threshold || velocity > 500) prev();
  };

  return (
    <div
      className="fiestas-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
    >
      {/* Botón izquierda */}
      <button
        className="carousel-btn carousel-btn--left"
        onClick={prev}
        aria-label={t("anterior")}
      >
        <span className="doodle-arrow">‹</span>
      </button>

      <div className="carousel-window" role="region" aria-live="polite">
        <motion.div
          className="carousel-track"
          ref={trackRef}
          drag="x"
          dragElastic={0.12}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {items.map((item, i) => (
            <div className="carousel-slide" key={i}>
              <EventCard {...item} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Botón derecha */}
      <button
        className="carousel-btn carousel-btn--right"
        onClick={next}
        aria-label={t("siguiente")}
      >
        <span className="doodle-arrow">›</span>
      </button>

      {/* Dots */}
      <div className="carousel-dots" role="tablist">
        {items.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`${t("ir_a_diapositiva")} ${i + 1}`}
            aria-pressed={i === index}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
}
