import React from 'react';

export default function ExperienceList({ experiences, selected, setSelected }) {
  return (
    <>
      <h2 className="text-xl font-medium mb-2">Experiencias</h2>
      <ul className="space-y-3">
        {experiences.map(exp => {
          const isSelected = selected?.id === exp.id;
          return (
            <li
              key={exp.id}
              className={`p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 cursor-pointer transition-all duration-300
                ${isSelected ? 'bg-slate-700/70 shadow-lg scale-105' : ''}`}
              onClick={() => setSelected(exp)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-semibold">{exp.role}</div>
                  <div className="text-sm text-slate-300">{exp.city}, {exp.country}</div>
                  {isSelected && (
                    <div className="mt-2 text-sm text-slate-300 transition-all duration-300">
                      {exp.description}
                      {exp.image && (
                        <img
                          src={exp.image}
                          alt={exp.company}
                          className="mt-2 w-full h-24 object-cover rounded-md"
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-400">{exp.start} — {exp.end}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}