import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/GlobeLayout';
import experiences from '../data/experiences.json';
import matches from '../data/matches.json';

export default function GlobePage() {
  const [selected, setSelected] = useState(null);
  const globeInstance = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 3; // ajusta según tus secciones
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);

  // Función para ir a una sección específica
  const scrollToSection = (index) => {
    setCurrentSection(index);
    window.scrollTo({
      top: window.innerHeight * index,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // ----- WHEEL (escritorio) -----
    const handleWheel = (e) => {
      // Evitar interferir con scrolls internos
      if (e.target.closest('.scrollable')) return;

      e.preventDefault(); // bloquea scroll nativo
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      let nextSection = currentSection + direction;

      if (nextSection < 0) nextSection = 0;
      if (nextSection >= totalSections) nextSection = totalSections - 1;

      scrollToSection(nextSection);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800); // tiempo de animación
    };

    // ----- TOUCH (móviles) -----
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchCurrentY = e.touches[0].clientY;
      const diff = touchStartYRef.current - touchCurrentY;

      if (Math.abs(diff) < 30) return; // evita movimientos pequeños

      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      const direction = diff > 0 ? 1 : -1;
      let nextSection = currentSection + direction;

      if (nextSection < 0) nextSection = 0;
      if (nextSection >= totalSections) nextSection = totalSections - 1;

      scrollToSection(nextSection);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);

      touchStartYRef.current = touchCurrentY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentSection]);

  return (
    <div>
      <section style={{ height: '100vh', overflow: 'hidden' }}>
        <Layout
          experiences={experiences}
          matches={matches}
          selected={selected}
          setSelected={setSelected}
          globeInstance={globeInstance}
        />
      </section>

      <section style={{ height: '100vh', background: '#111' }}>
        <div className="flex items-center justify-center h-full text-white text-3xl">
          Segunda sección
        </div>
      </section>

      <section style={{ height: '100vh', background: '#222' }}>
        <div className="flex items-center justify-center h-full text-white text-3xl">
          Tercera sección
        </div>
      </section>
    </div>
  );
}
