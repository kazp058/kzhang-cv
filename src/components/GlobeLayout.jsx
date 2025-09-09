import React, { useRef } from 'react';
import GlobeContainer from './GlobeContainer';
import ExperienceList from './ExperienceList';
import NavHeader from './NavHeader';
import Dashboard from './Dashboard';

const INITIAL_VIEW = { lat: 20, lng: 0, altitude: 2.5 };
const SELECTED_VIEW_ALTITUDE = 0.75;

export default function Layout({ experiences, selected, setSelected, globeInstance }) {
  const lastSelectedRef = useRef(null);

  const handleSelect = (exp) => {
    // Si el item ya está seleccionado → reset/close
    if (lastSelectedRef.current?.id === exp.id) {
      handleReset();
      return;
    }

    // Si es un nuevo item → hacer zoom
    if (globeInstance.current && exp.lat && exp.lng) {
      globeInstance.current.controls().autoRotate = false;
      globeInstance.current.pointOfView(
        { lat: exp.lat, lng: exp.lng, altitude: SELECTED_VIEW_ALTITUDE },
        1200
      );
    }

    setSelected(exp);
    lastSelectedRef.current = exp;
  };

  const handleReset = () => {
    if (globeInstance.current && lastSelectedRef.current) {
      globeInstance.current.controls().autoRotate = true;
      globeInstance.current.pointOfView(
        {
          lat: INITIAL_VIEW.lat,
          lng: lastSelectedRef.current.lng,
          altitude: INITIAL_VIEW.altitude
        },
        1200
      );
    }
    setSelected(null);
    lastSelectedRef.current = null;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <NavHeader className="flex-none" />

      {/* Dashboard */}
      <Dashboard experiences={experiences} className="flex-none" />

      <main className="flex flex-1 w-full px-6 py-4 gap-4 overflow-hidden">
        <section className="flex-none basis-[60%] bg-slate-900/40 rounded-2xl p-4 shadow-lg overflow-hidden">
          <GlobeContainer
            experiences={experiences}
            selected={selected}
            setSelected={handleSelect}
            globeInstance={globeInstance}
          />
        </section>

        <section className="flex-none basis-[40%] bg-slate-900/30 rounded-2xl p-4 shadow-inner overflow-y-auto">
          <ExperienceList
            experiences={experiences}
            selected={selected}
            setSelected={handleSelect}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="flex-none max-w-6xl mx-auto mt-2 text-slate-400 text-sm">
        Hecho con ❤️
      </footer>
    </div>
  );
}

