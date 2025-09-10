import React from 'react';

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function ExperienceList({ experiences, selected, setSelected }) {

  const handleCompanyClick = (url) => {
    if (!url) return;
    window.open(url, '_blank');
  };

  const handleCityClick = (city, country) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city + ', ' + country)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="flex flex-col h-full p-4 experience-list">
      <h2 className="title-section text-xl font-medium mb-4">Experiencias</h2>

      <ul className="flex-1 overflow-y-auto space-y-3">
        {experiences.map(exp => {
          const isSelected = selected?.id === exp.id;
          const descItems = Array.isArray(exp.experience) ? exp.experience : [exp.experience];

          return (
            <li
              key={exp.id}
              className={`rounded-xl cursor-pointer transition-all duration-300
                ${isSelected ? 'bg-blue-600/80 shadow-2xl' : 'bg-slate-800/30 hover:bg-slate-800/50'}
              `}
              onClick={() => setSelected(exp)}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-start lg:items-center p-3 gap-4">
                <div className="font-semibold text-white">{exp.role}</div>

                {/* Fechas como pills */}
                <div className="
                  flex 
                  flex-row md:flex-col lg:flex-row
                  gap-3 md:gap-1 lg:gap-3
                  justify-start md:justify-end lg:justify-end
                ">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white">{exp.start}</span>
                  {exp.end ? (
                    <span className="px-2 py-0.5 rounded-full bg-green-500 text-white">{exp.end}</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white">En curso</span>
                  )}
                </div>
              </div>

              {/* Contenido expandible */}
              <div className={`overflow-hidden transition-all duration-500 ${isSelected ? 'max-h-[2000px] px-3 pb-3' : 'max-h-0 px-3'}`}>
                <div className="mt-1 flex flex-col gap-2">
                  {/* Empresa clickeable */}
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-slate-300 hover:text-blue-400 cursor-pointer transition-colors"
                  >
                    <WorkOutlineIcon className="w-4 h-4" /> {exp.company}
                  </a>

                  {/* Ciudad clickeable */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(exp.city + ', ' + exp.country)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-slate-300 hover:text-blue-400 cursor-pointer transition-colors"
                  >
                    <LocationOnOutlinedIcon className="w-4 h-4" /> {exp.city}, {exp.country}
                  </a>
                </div>
                {/* Lista de descripción */}
                <ul className="mt-2 space-y-1 text-sm text-slate-200">
                  {descItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Imagen */}
                {exp.image && (
                  <img
                    src={exp.image}
                    alt={exp.company}
                    className="mt-3 w-full h-28 object-cover rounded-lg shadow-inner"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}