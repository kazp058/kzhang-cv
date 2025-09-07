import React from 'react';

export default function ExperienceList({ experiences, setSelected, globeInstance }) {
  return (
    <>
      <h2 className="text-xl font-medium mb-2">Experiencias</h2>
      <ul className="space-y-3">
        {experiences.map(p => (
          <li
            key={p.id}
            className="p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 cursor-pointer"
            onClick={() => {
              setSelected(p);
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-slate-300">{p.city}, {p.country}</div>
              </div>
              <div className="text-xs text-slate-400">{p.period}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}