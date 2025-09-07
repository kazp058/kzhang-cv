import React, { useRef } from 'react';
import GlobeContainer from './GlobeContainer';
import ExperienceList from './ExperienceList';
import ExperienceModal from './ExperienceModal';

const INITIAL_VIEW = { lat: 20, lng: 0, altitude: 2.5 }; // Zoom inicial fijo
const SELECTED_VIEW_ALTITUDE = 1.4; // Zoom al seleccionar pin/experiencia

export default function Layout({ experiences, selected, setSelected, globeInstance }) {
  const hasSelectedRef = useRef(false);

  // Selección de experiencia o pin
  const handleSelect = (exp) => {
    if (globeInstance.current && exp.lat && exp.lng) {
      globeInstance.current.controls().autoRotate = false;
      globeInstance.current.pointOfView(
        { lat: exp.lat, lng: exp.lng, altitude: SELECTED_VIEW_ALTITUDE },
        1200
      );
    }
    setSelected(exp);
    hasSelectedRef.current = true;
  };

  // Al cerrar el modal
  const handleClose = () => {
    if (globeInstance.current) {
      globeInstance.current.controls().autoRotate = true;
      // Solo regresa al zoom inicial si antes se seleccionó algo
      if (hasSelectedRef.current) {
        globeInstance.current.pointOfView(INITIAL_VIEW, 1200);
        hasSelectedRef.current = false;
      }
    }
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4">
      <header className="max-w-6xl mx-auto mb-4">
        <h1 className="text-3xl font-semibold">Kevin — Hoja de vida interactiva</h1>
        <p className="text-slate-300 mt-1">
          Mapa 3D con pines: haz clic en cualquier pin para ver lo que hice en esa ciudad/país.
        </p>
      </header>
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[70vh]">
        <section className="lg:col-span-2 bg-slate-900/40 rounded-2xl p-4 shadow-lg flex flex-col h-full min-h-[400px]">
          <div className="flex-1 h-full">
            <GlobeContainer experiences={experiences} setSelected={handleSelect} globeInstance={globeInstance} />
          </div>
        </section>
        <aside className="lg:col-span-1 bg-slate-900/30 rounded-2xl p-4 shadow-inner">
          <ExperienceList experiences={experiences} setSelected={handleSelect} globeInstance={globeInstance} />
        </aside>
      </main>
      {selected && (
        <ExperienceModal
          selected={selected}
          onClose={handleClose}
        />
      )}

      <footer className="max-w-6xl mx-auto mt-8 text-slate-400 text-sm">
        Hecho con ❤️
      </footer>
    </div>
  );
}