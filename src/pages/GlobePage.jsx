import React, { useState, useRef } from 'react';
import Layout from '../components/GlobeLayout';
import experiences from '../data/experiences.json';

export default function GlobePage() {
  // Estado del pin seleccionado
  const [selected, setSelected] = useState(null);

  // Referencia a la instancia del globo
  const globeInstance = useRef(null);

  return (
    <Layout
      experiences={experiences}
      selected={selected}
      setSelected={setSelected}
      globeInstance={globeInstance}
    />
  );
}