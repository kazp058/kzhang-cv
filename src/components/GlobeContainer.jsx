import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

export default function GlobeContainer({ experiences, selected, setSelected, globeInstance }) {
  const globeEl = useRef(null);

  const travels = [
    { startLat: -2.17, startLng: -79.92, endLat: -0.18, endLng: -78.47 }, // GYE → UIO
    { startLat: -0.18, startLng: -78.47, endLat: 40.42, endLng: -3.70 }  // UIO → MAD
  ];

  useEffect(() => {
    if (!globeEl.current) return;

    console.log('Experiences para Globe:', experiences);

    // Solo inicializa si no existe
    if (!globeInstance.current) {
      const g = Globe()(globeEl.current)
        .globeImageUrl('/4_no_ice_clouds_mts_8k.jpg')
        .bumpImageUrl('/elev_bump_8k.jpg')
        .showAtmosphere(false)
        .atmosphereColor('#3fa9f5')
        .pointOfView({ lat: 20, lng: 0, altitude: 2.5 })
        .pointsData(experiences)
        .onPointClick(d => {
          console.log('Pin clickeado:', d);
          const originalExp = experiences.find(e => e.id === d.id) || d;
          setSelected(originalExp);
        })
        .pointColor(d => selected?.id === d.id ? '#3b82f6' : '#ff7043')
        .pointLat('lat')
        .pointLng('lng')
        .pointLabel(d => `${d.city}, ${d.country}`)
        .pointAltitude(0.02)
        .pointRadius(0.7)
        .arcsData(travels)
        .arcStartLat(d => d.startLat)
        .arcStartLng(d => d.startLng)
        .arcEndLat(d => d.endLat)
        .arcEndLng(d => d.endLng)
        .arcColor(() => ['#d4d4d4ff', '#d4d4d4ff'])
        .arcAltitude(0.25)
        .arcStroke(0.25)
        .arcDashLength(0.3)
        .arcDashGap(0.25)
        .arcDashAnimateTime(7000);

      g.controls().autoRotate = true;
      g.controls().autoRotateSpeed = 0.4;

      globeInstance.current = g;
      console.log('Globe creado:', globeInstance.current);
    } else {
      // Si ya existe, solo actualiza los datos
      globeInstance.current.pointsData(experiences);
    }

    // Función para ajustar tamaño del canvas según el contenedor padre
    const resizeGlobe = () => {
      if (!globeEl.current || !globeInstance.current) return;
      const parent = globeEl.current.parentElement;
      if (!parent) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;

      globeInstance.current.width(width);
      globeInstance.current.height(height);
    };
    resizeGlobe();

    const ro = new ResizeObserver(resizeGlobe);
    ro.observe(globeEl.current.parentElement);
    window.addEventListener('resize', resizeGlobe);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resizeGlobe);
    };
  }, [experiences, setSelected, globeInstance]);

  // Animación de glow del pin seleccionado
  useEffect(() => {
    if (!globeInstance.current) return;

    let t = 0;
    let animating = true;

    const animateGlow = () => {
      if (!animating) return;

      t += 0.05; // velocidad del parpadeo
      globeInstance.current.pointColor(d => {
        if (selected?.id === d.id) {
          // Oscila entre azul normal y azul más brillante
          const intensity = 0.5 + 0.5 * Math.sin(t);
          const r = Math.round(59 + 196 * intensity);  // '#3b82f6' base
          const g = Math.round(130 + 125 * intensity);
          const b = Math.round(246 + 9 * intensity);
          return `rgb(${r},${g},${b})`;
        }
        return '#ff7043'; // color normal para los demás puntos
      });

      globeInstance.current.pointsData(experiences);
      requestAnimationFrame(animateGlow);
    };

    animateGlow();

    return () => {
      animating = false; // detiene animación al desmontar
    };
  }, [selected, experiences]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <div ref={globeEl} className="w-full h-full" />
    </div>
  );
}
