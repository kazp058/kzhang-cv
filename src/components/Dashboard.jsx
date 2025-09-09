import React from 'react';

export default function Dashboard({ experiences }) {
  // Estadísticas básicas
  const totalPartidos = experiences.length;
  const totalLigas = 50;
  const totalEmpresas = new Set(experiences.map(e => e.company)).size;

  // Configuración de cada card (color y valor)
  const stats = [
    { label: 'Partidos', value: totalPartidos, color: 'from-blue-500 to-blue-700' },
    { label: 'Ligas', value: totalLigas, color: 'from-green-500 to-green-700' },
    { label: 'Empresas', value: totalEmpresas, color: 'from-purple-500 to-purple-700' },
  ];

  return (
    <div className="flex gap-6 px-6 py-6">
      {stats.map(stat => (
        <div
          key={stat.label}
          className={`flex-1 flex flex-col items-center justify-center rounded-2xl shadow-xl bg-gradient-to-r ${stat.color} text-white p-8 transition-transform duration-300 hover:scale-105`}
        >
          <div className="text-4xl font-bold">{stat.value}</div>
          <div className="text-lg mt-2">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}