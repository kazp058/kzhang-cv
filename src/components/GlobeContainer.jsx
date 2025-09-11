import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import { useClusteredPoints } from '../hooks/useClusteredPoints';

export default function GlobeContainer({ experiences, matches, selected, setSelected, globeInstance }) {
  const globeEl = useRef(null);

  // Normalizar matches (sin tocar)
  const normalizeMatches = matches.map(m => ({
    ...m,
    id: parseInt(m.id),
    type: 'match',
    lat: parseFloat(m.lat.replace(',', '.')),
    lng: parseFloat(m.lng.replace(',', '.'))
  }));

  // Clustering de experiencias
  const clusteredExperiences = useClusteredPoints(experiences, 0.5);

  // Combinar puntos
  const combinedPoints = [
    ...clusteredExperiences,
    ...normalizeMatches
  ];

  // Altura de arcos
  const computeArcAltitude = (arc) => {
    const latDiff = arc.endLat - arc.startLat;
    const lngDiff = arc.endLng - arc.startLng;
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    return 0.1 + distance * 0.0028;
  };

  // Dataset de arcos
  const allArcs = normalizeMatches.map(m => {
    const exp = experiences.find(e => e.id === m['Experience ID']);
    if (!exp) return null;
    return {
      startLat: exp.lat,
      startLng: exp.lng,
      endLat: m.lat,
      endLng: m.lng,
      experienceId: m['Experience ID']
    };
  }).filter(Boolean);

  useEffect(() => {
    if (!globeEl.current) return;

    if (!globeInstance.current) {
      const g = Globe()(globeEl.current)
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .showAtmosphere(false)
        .atmosphereColor('#3fa9f5')
        .pointOfView({ lat: 20, lng: 0, altitude: 1.8 })
        .pointsData(combinedPoints)
        .onPointClick(d => {
          if (d.type === 'experience') {
            if (d.count > 1) {
              console.log('Cluster con experiencias:', d.experiences);
            } else {
              setSelected(d.experiences[0]);
            }
          } else {
            console.log('Match seleccionado:', d);
          }
        })
        .pointColor(d => {
          if (d.type === 'experience') {
            if (selected && d.count === 1 && selected.id === d.experiences[0].id) return '#3b82f6';
            return d.count > 1 ? '#f59e0b' : '#ff7043';
          }
          return '#c20111ff';
        })
        .pointLat(d => d.lat)
        .pointLng(d => d.lng)
        .pointAltitude(d => (d.type === 'experience' ? 0.02  : 0.01))
        .pointRadius(d => (d.type === 'experience' ? 0.15 : 0.1))
        .pointLabel(d => {
          if (d.type === 'experience') {
            if (d.count > 1) return `Cluster: ${d.count} experiencias`;
            const e = d.experiences[0];
            return `${e.city}, ${e.country}`;
          }
          return `Partido: ${d.Home || ''}`;
        })
        .arcsData(allArcs)
        .arcStartLat(d => d.startLat)
        .arcStartLng(d => d.startLng)
        .arcEndLat(d => d.endLat)
        .arcEndLng(d => d.endLng)
        .arcColor(d =>
          String(d.experienceId) === String(selected?.id)
            ? ['#3b82f6', '#3b82f6']
            : ['#d4d4d4ff', '#d4d4d4ff']
        )
        .arcAltitude(computeArcAltitude)
        .arcStroke(0.12)
        .arcDashLength(0.3)
        .arcDashGap(0.25)
        .arcDashAnimateTime(7000);

      g.controls().autoRotate = true;
      g.controls().autoRotateSpeed = 0.4;

      globeInstance.current = g;
    } else {
      globeInstance.current.pointsData(combinedPoints);
      globeInstance.current.arcsData(allArcs);
    }

    const resizeGlobe = () => {
      if (!globeEl.current || !globeInstance.current) return;
      const parent = globeEl.current.parentElement;
      if (!parent) return;
      globeInstance.current.width(parent.clientWidth);
      globeInstance.current.height(parent.clientHeight);
    };
    resizeGlobe();
    const ro = new ResizeObserver(resizeGlobe);
    ro.observe(globeEl.current.parentElement);
    window.addEventListener('resize', resizeGlobe);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resizeGlobe);
    };
  }, [combinedPoints, allArcs, selected, setSelected, globeInstance]);

  useEffect(() => {
    if (!globeInstance.current) return;

    let t = 0;
    let animating = true;

    const animateGlow = () => {
      if (!animating) return;
      t += 0.05;

      globeInstance.current.pointColor(d => {
        if (d.type === 'experience') {
          if (selected?.id === d.experiences[0]?.id) {
            const intensity = 0.5 + 0.5 * Math.sin(t);
            const r = Math.round(59 + 196 * intensity);
            const g = Math.round(130 + 125 * intensity);
            const b = Math.round(246 + 9 * intensity);
            return `rgb(${r},${g},${b})`;
          }
          return d.count > 1 ? '#f59e0b' : '#ff7043';
        }
        return '#c20111ff';
      });

      globeInstance.current.pointsData(combinedPoints);
      requestAnimationFrame(animateGlow);
    };

    animateGlow();

    return () => {
      animating = false;
    };
  }, [selected, combinedPoints]);

  return (
    <div className="global-container-globe global-card-layout w-full h-full rounded-2xl overflow-hidden">
      <div ref={globeEl} className="w-full h-full globe-bg" />
    </div>
  );
}
