import React, { useRef } from 'react';
import GlobeContainer from './GlobeContainer';
import ExperienceList from './ExperienceList';
import ExperienceModal from './ExperienceModal';
import NavHeader from './NavHeader';

const INITIAL_VIEW = { lat: 20, lng: 0, altitude: 2.5 }; // Zoom inicial fijo
const SELECTED_VIEW_ALTITUDE = 0.75; // Zoom al seleccionar pin/experiencia

export default function Layout({ experiences, selected, setSelected, globeInstance }) {
  const hasSelectedRef = useRef(false);
  const lastSelectedRef = useRef(null);

  // Selección de experiencia o pin
  const handleSelect = (exp) => {
    console.log('handleSelect llamado con:', exp);
    console.log('Globe instance en handleSelect:', globeInstance.current);
    if (globeInstance.current && exp.lat && exp.lng) {
      globeInstance.current.controls().autoRotate = false;
      globeInstance.current.pointOfView(
        { lat: exp.lat, lng: exp.lng, altitude: SELECTED_VIEW_ALTITUDE },
        1200
      );
      console.log('pointOfView llamado con:', { lat: exp.lat, lng: exp.lng, altitude: SELECTED_VIEW_ALTITUDE });
    }
    setSelected(exp);
    hasSelectedRef.current = true;
    lastSelectedRef.current = exp;
  };

  // Al cerrar el modal
  const handleClose = () => {
    if (globeInstance.current && lastSelectedRef.current) {
      globeInstance.current.controls().autoRotate = true;
      globeInstance.current.pointOfView(
        {
          lat: INITIAL_VIEW.lat,
          lng: lastSelectedRef.current.lng,
          altitude: INITIAL_VIEW.altitude // zoom out pero sobre el mismo punto
        },
        1200
      );
    }
    setSelected(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <NavHeader />


      <main className="flex flex-col flex-1 w-full">
        <section className="flex-1 w-full bg-slate-900/40 rounded-2xl p-4 shadow-lg">
          <GlobeContainer
            experiences={experiences}
            setSelected={handleSelect}
            globeInstance={globeInstance}
          />
        </section>

        <section className="h-32 w-full mt-4 bg-slate-900/30 rounded-2xl p-4 shadow-inner">
          <p className="text-center text-slate-400">[Aquí irá la timeline]</p>
        </section>
      </main>

      {selected && (
        <ExperienceModal
          experience={selected}
          onClose={() => handleClose()}
        />
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-8 text-slate-400 text-sm">
        Hecho con ❤️
      </footer>
    </div>
  );
}