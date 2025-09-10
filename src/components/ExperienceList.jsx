import React from 'react';

export default function ExperienceList({ experiences, selected, setSelected }) {
  return (
    <>
      <h2 className="text-xl font-medium mb-2">Experiencias</h2>

      {/* Contenedor externo: no scroll */}
      <div className="h-full overflow-y-auto experience-list">
        {/* Lista interna: scroll solo aquí */}
        <ul className="space-y-3 h-full">
          {experiences.map(exp => {
            const isSelected = selected?.id === exp.id;
            return (
              <li
                key={exp.id}
                className={`
                  p-3 rounded-lg cursor-pointer transition-all duration-300
                  ${isSelected
                    ? 'bg-blue-600/80 shadow-xl'
                    : 'bg-slate-800/30 hover:bg-slate-800/50'
                  }`}
                onClick={() => setSelected(exp)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold">{exp.role}</div>
                    <div className="text-sm text-slate-300">{exp.city}, {exp.country}</div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isSelected ? 'max-h-96 mt-2' : 'max-h-0'} text-sm text-slate-300`}
                    >
                      {exp.description}
                      {exp.image && (
                        <img
                          src={exp.image}
                          alt={exp.company}
                          className="mt-2 w-full h-24 object-cover rounded-md"
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">{exp.start} — {exp.end}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
