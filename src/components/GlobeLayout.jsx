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
    console.log('handleSelect llamado con:', exp);

    console.log(selected?.id === exp.id);
    console.log(exp.id);
    console.log(selected?.id);

    if (lastSelectedRef.current?.id === exp.id) {
      console.log('El item ya está seleccionado, reseteando vista.');
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

  // Reset zoom
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

  // Estadísticas para el dashboard
  const totalPartidos = experiences.length;
  const totalLigas = new Set(experiences.map(e => e.league)).size;
  const totalEmpresas = new Set(experiences.map(e => e.company)).size;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <NavHeader />

      <Dashboard experiences={experiences} />
      {/* Contenido principal: Globe + Lista */}
      <main className="flex flex-1 w-full px-6 py-4 gap-4">
        {/* Globe: 3/4 ancho */}
        <section className="flex-6/10 bg-slate-900/40 rounded-2xl p-4 shadow-lg">
          <GlobeContainer
            experiences={experiences}
            setSelected={handleSelect}
            globeInstance={globeInstance}
          />
        </section>

        {/* Lista: 1/4 ancho */}
        <section className="flex-4/10 bg-slate-900/30 rounded-2xl p-4 shadow-inner overflow-y-auto max-h-[80vh]">
          <ExperienceList
            experiences={experiences}
            selected={selected}
            setSelected={handleSelect}
          />
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-8 text-slate-400 text-sm">
        Hecho con ❤️
      </footer>
    </div>
  );
}
