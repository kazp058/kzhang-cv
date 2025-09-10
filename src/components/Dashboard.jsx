import React from 'react';
import useCountUp from '../hooks/useCountUp';

export default function Dashboard({ experiences = [], matches = [], selected = null }) {
  const getMatchExperienceId = (m) =>
    m?.['Experience ID'] ?? m?.experienceId ?? m?.experience_id ?? m?.ExperienceID ?? m?.ExperienceId ?? null;

  const allMatches = Array.isArray(matches) ? matches : [];

  // Filtrado según experience seleccionada
  const filteredMatches = selected
    ? allMatches.filter(m => String(getMatchExperienceId(m)) === String(selected.id))
    : allMatches;

  const normalizedCountries = filteredMatches
    .map(m => (m?.Country ?? m?.country ?? '').toString().trim())
    .filter(Boolean);

  const normalizedCompetitions = filteredMatches
    .map(m => (m?.Competition ?? m?.competition ?? '').toString().trim())
    .filter(Boolean);

  const totalPartidos = filteredMatches.length;
  const totalPaises = new Set(normalizedCountries).size;
  const totalCompetencias = new Set(normalizedCompetitions).size;

  const subtitle = selected
    ? `Resumen de ${selected.role ?? selected.company ?? selected.city ?? 'la experiencia'}`
    : 'Resumen global';

  const stats = [
    { label: 'Partidos', value: totalPartidos },
    { label: 'Paises', value: totalPaises },
    { label: 'Torneos', value: totalCompetencias },
  ];

  return (
    <div className="px-6 py-4">
      <div className="mb-2 text-slate-300">{subtitle}</div>

      <div className="flex gap-6">
        {stats.map(stat => {
          const animatedValue = useCountUp(stat.value, 1000);

          // nombre de variable CSS dinámico
          const fromVar = `--dashboard-${stat.label.toLowerCase()}-from`;
          const toVar = `--dashboard-${stat.label.toLowerCase()}-to`;

          return (
            <div
              key={stat.label}
              className="flex-1 flex flex-col items-center justify-center dashboard-card"
              style={{
                background: `linear-gradient(to right, var(${fromVar}), var(${toVar}))`
              }}
            >
              <div className="text-3xl font-bold tabular-nums">{animatedValue}</div>
              <div className="text-sm mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}