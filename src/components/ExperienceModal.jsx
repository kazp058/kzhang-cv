import React from 'react';

export default function ExperienceModal({ experience, onClose }) {
  if (!experience) return null;

  return (
    <div className="absolute top-20 right-10 z-50 max-w-md">
      <div className="bg-gradient-to-b from-slate-800 to-slate-700 text-white rounded-xl shadow-lg p-6 relative border border-white/20">
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/70 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Título y empresa */}
        <h2 className="text-lg font-bold mb-2">
          {experience.role} - {experience.company}
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          {experience.country} — {experience.start} — {experience.end}
        </p>

        {/* Descripción */}
        <p className="text-sm leading-relaxed mb-4">{experience.description}</p>

        {/* Imagen opcional */}
        <div className="w-full h-32 bg-slate-600 flex items-center justify-center rounded-md">
          {experience.image ? (
            <img
              src={experience.image}
              alt={experience.company}
              className="object-cover rounded-md w-full h-full"
            />
          ) : (
            <span className="text-slate-300">Sin imagen</span>
          )}
        </div>
      </div>
    </div>
  );
}