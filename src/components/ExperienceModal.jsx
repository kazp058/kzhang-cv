import React from 'react';

export default function ExperienceModal({ selected, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-6 z-10">
        <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-red-400" aria-label="Cerrar">
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-1">{selected.title}</h3>
        <div className="text-sm text-slate-300 mb-2">{selected.city}, {selected.country} — {selected.period}</div>
        <p className="text-sm leading-relaxed text-slate-200">{selected.description}</p>

        {selected.image ? (
          <img src={selected.image} alt="imagen experiencia" className="w-full rounded-md mt-4" />
        ) : (
          <div className="w-full h-40 bg-slate-100 rounded-md flex items-center justify-center text-slate-500 mt-4">
            Sin imagen
          </div>
        )}
      </div>
    </div>
  );
}