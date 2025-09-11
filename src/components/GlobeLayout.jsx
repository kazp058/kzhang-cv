import React, { useRef } from 'react';
import GlobeContainer from './GlobeContainer';
import ExperienceList from './ExperienceList';
import Dashboard from './Dashboard';

const INITIAL_VIEW = { lat: 20, lng: 0, altitude: 1.8 };
const SELECTED_VIEW_ALTITUDE = 0.45;

export default function Layout({ experiences, matches, selected, setSelected, globeInstance, currentSection }) {
  const lastSelectedRef = useRef(null);


  const handleSelect = (exp) => {
    if (lastSelectedRef.current?.id === exp.id) {
      handleReset();
      return;
    }
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
    <div className="relative flex flex-col h-full text-white">
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden
        ${(!selected || matches.some(m => String(m['Experience ID']) === String(selected.id)))
            ? 'opacity-100 max-h-[500px] translate-y-0'
            : 'opacity-0 max-h-0 -translate-y-4'}
      `}
      >
        <Dashboard
          experiences={experiences}
          matches={matches}
          selected={selected}
          className="flex-none"
        />
      </div>

      <main className="flex flex-1 w-full h-full px-6 py-4 gap-4 overflow-hidden global-container-layout">
        <section className="flex-1 min-w-0 bg-black/30 rounded-2xl shadow-xl overflow-hidden global-card-layout"
          onWheel={(e) => e.stopPropagation()}
        >
          <GlobeContainer
            experiences={experiences}
            matches={matches}
            selected={selected}
            setSelected={handleSelect}
            globeInstance={globeInstance}
          />
        </section>

        <section className="flex-1 min-w-0 bg-black/20 rounded-2xl shadow-inner global-card-layout p-0"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-hidden">
            <ExperienceList
              experiences={experiences}
              selected={selected}
              setSelected={handleSelect}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

