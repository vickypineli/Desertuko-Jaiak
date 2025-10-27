// src/components/FiestasCarousel.jsx
import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import FiestaCard from "./FiestaCard";
import "../styles/FiestasCarousel.scss";

const DEFAULT_AUTOPLAY_MS = 5000; // 5s

export default function FiestasCarousel({
  items = [
    { nombre: "Desertuko Jaiak", fecha: "18 Jun", color: "#FF5733" },
    { nombre: "Putxera Eguna", fecha: "18 Oct", color: "#33C1FF" },
    { nombre: "Navidades", fecha: "24 y 31 Dic", color: "#8D33FF" },
  ],
  autoplayMs = DEFAULT_AUTOPLAY_MS,
}) {
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const touchHoldRef = useRef(false); // to detect long press on mobile

  // advance with wrap
  const goTo = (i) => {
    const newIndex = (i + count) % count;
    setIndex(newIndex);
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay effect
  useEffect(() => {
    if (!autoplayMs || isPaused) return;
    autoplayRef.current = setInterval(() => {
      next();
    }, autoplayMs);
    return () => {
      clearInterval(autoplayRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isPaused, autoplayMs]);

  // Pause on hover (desktop)
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Touch handlers: pause when touch starts (user may hold), resume on end
  const handleTouchStart = () => {
    touchHoldRef.current = true;
    setIsPaused(true);
    // small timeout to allow short swipe without keeping paused
    setTimeout(() => {
      touchHoldRef.current = false;
    }, 600);
  };
  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  // Drag end: determine swipe direction by offset
  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // threshold in px
    const threshold = 50;
    if (offset < -threshold || velocity < -500) {
      next();
    } else if (offset > threshold || velocity > 500) {
      prev();
    } else {
      // snap back to current index (no change)
      setIndex((i) => i); // force re-render motion (optional)
    }
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
      {/* left doodle button */}
      <button
        className="carousel-btn carousel-btn--left"
        onClick={prev}
        aria-label="Anterior"
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
              <FiestaCard {...item} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* right doodle button */}
      <button
        className="carousel-btn carousel-btn--right"
        onClick={next}
        aria-label="Siguiente"
      >
        <span className="doodle-arrow">›</span>
      </button>

      {/* dots */}
      <div className="carousel-dots" role="tablist">
        {items.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              className={`carousel-dot ${active ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              aria-pressed={active}
              role="tab"
            />
          );
        })}
      </div>
    </div>
  );
}
