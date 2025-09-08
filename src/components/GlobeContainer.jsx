import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

export default function GlobeContainer({ experiences, setSelected, globeInstance }) {
  const globeEl = useRef(null);

  useEffect(() => {
    if (!globeEl.current) return;

    console.log('Experiences para Globe:', experiences);

    // Solo inicializa si no existe
    if (!globeInstance.current) {
      const g = Globe()(globeEl.current)
        .globeImageUrl('/4_no_ice_clouds_mts_8k.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
        .showAtmosphere(true)
        .atmosphereColor('#3fa9f5')
        .pointOfView({ lat: 20, lng: 0, altitude: 2.5 })
        .pointsData(experiences)
        .pointLat('lat')
        .pointLng('lng')
        .pointLabel(d => `${d.city}, ${d.country}`)
        .pointColor(() => '#ff7043')
        .pointAltitude(0.02)
        .pointRadius(0.3)
        .onPointClick(d => {
          console.log('Pin clickeado:', d);
          setSelected(d);
        });

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
      if (!globeEl.current) return;
      const parent = globeEl.current.parentElement;
      if (!parent) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      // Ajusta el tamaño visual del canvas
      globeInstance.current.renderer().setSize(width, height, false);
      // Ajusta la calidad del renderizado
      globeInstance.current.renderer().setPixelRatio(dpr);

      globeInstance.current.camera().aspect = width / height;
      globeInstance.current.camera().updateProjectionMatrix();
    };
    // Inicial resize
    resizeGlobe();

    // Observador de tamaño y listener de ventana
    const ro = new ResizeObserver(resizeGlobe);
    ro.observe(globeEl.current.parentElement);
    window.addEventListener('resize', resizeGlobe);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resizeGlobe);
    };
  }, [experiences, setSelected, globeInstance]);

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <div ref={globeEl} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}