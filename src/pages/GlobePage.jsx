import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/GlobeLayout';
import experiences from '../data/experiences.json';
import matches from '../data/matches.json';
import PresentationLayout from '../components/PresentationLayout';

export default function GlobePage() {
  const [selected, setSelected] = useState(null);
  const globeInstance = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 4;
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);

  const scrollToSection = (index) => {
    setCurrentSection(index);
    window.scrollTo({
      top: window.innerHeight * index,
      behavior: 'smooth'
    });
  };

  // 🔹 Forzar inicio en la primera sección
  useEffect(() => {
    scrollToSection(0); // fuerza ir a la sección 0 al montar
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.target.closest('.scrollable')) return;
      e.preventDefault();
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      let nextSection = currentSection + direction;
      if (nextSection < 0) nextSection = 0;
      if (nextSection >= totalSections) nextSection = totalSections - 1;

      scrollToSection(nextSection);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    };

    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchCurrentY = e.touches[0].clientY;
      const diff = touchStartYRef.current - touchCurrentY;
      if (Math.abs(diff) < 30) return;
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

  useEffect(() => {
    let scrollTimeout = null;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        const sectionIndex = Math.round(scrollY / window.innerHeight);
        if (sectionIndex !== currentSection) {
          scrollToSection(sectionIndex);
        } else scrollToSection(currentSection);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [currentSection]);

  return (
    <div className="bg-gradient-to-b from-[#232526] to-[#414345] min-h-screen text-white">
      {/* 1️⃣ Sección Presentación */}
      <section style={{ height: '100vh' }}>
        <div className="relative w-screen h-screen overflow-hidden">
          <PresentationLayout currentSection={currentSection} />
        </div>
      </section>

      {/* 2️⃣ Sección "Mi mundo" */}
      <section style={{ height: '100vh', overflow: 'hidden' }}>
        <div className="global-container h-full flex items-center justify-center">
          <Layout
            experiences={experiences}
            matches={matches}
            selected={selected}
            setSelected={setSelected}
            globeInstance={globeInstance}
            currentSection={currentSection}
          />
        </div>
      </section>

      {/* 3️⃣ Sección placeholder */}
      <section style={{ height: '100vh' }}>
        <div className="global-container flex items-center justify-center h-full text-white text-3xl">
          Habilidades
        </div>
      </section>

      {/* 4️⃣ Sección placeholder */}
      <section style={{ height: '100vh', background: '#222' }}>
        <div className="global-container flex items-center justify-center h-full text-white text-3xl">
          Proyectos
        </div>
      </section>
    </div>
  );
}
