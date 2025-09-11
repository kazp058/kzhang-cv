import React, { useState, useRef } from "react";
import projectsData from "../data/projects.json";
import { FaGithub } from "react-icons/fa";

export default function ProjectLayout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const carouselRef = useRef(null);
  const total = projectsData.length;

  const scrollToIndex = (index) => {

    setCurrentIndex(index);
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelector(".dashboard-card");
    if (!card) return;
    const style = getComputedStyle(card);
    const gap = parseInt(style.marginRight || "0");
    const width = card.offsetWidth + gap;

    carouselRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    if (newIndex <= 0) { scrollToIndex(total - 1) }
    else scrollToIndex(newIndex);

    setExpandedIndex(null);
  };

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, total - 1);
    if (newIndex >= total - 1) { scrollToIndex(0) }
    else scrollToIndex(newIndex);

    setExpandedIndex(null);
  };

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    scrollToIndex(index);
  };

  const getProjectImage = (project) => {
    // intenta cargar imagen específica, sino usa default
    const imagePath = `../assets/${project.id}.jpg`;
    return imagePath;
  };

  return (
    <div className="w-full py-6">
      <h1 className="title-main text-4xl mb-6 text-center">Proyectos</h1>

      <div className="flex items-center gap-2 h-[75vh]">
        <button
          onClick={handlePrev}
          className="self-stretch btn-warning flex items-center justify-center"
          style={{ width: "3rem" }}
        >
          ‹
        </button>

        <div className="flex-1 h-full overflow-hidden">
          <div
            ref={carouselRef}
            className="flex overflow-hidden scroll-smooth gap-6 h-full px-4 py-18"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projectsData.map((project, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={project.id}
                  className="dashboard-card flex-shrink-0 w-full md:w-1/2 lg:w-1/3 flex flex-col cursor-pointer transition-transform duration-300 h-full"
                  style={{
                    transform: isExpanded ? "scale(1.05)" : "scale(1)",
                    boxShadow: isExpanded
                      ? "0 12px 40px rgba(0,0,0,0.5)"
                      : "0 8px 20px rgba(0,0,0,0.3)",
                  }}
                  onClick={() => handleExpand(index)}
                >
                  <div className="flex flex-col flex-grow">
                    {/* Solo mostrar imagen y shortDescription si NO está expandido */}
                    {!isExpanded && (
                      <>
                        <img
                          src={getProjectImage(project)}
                          onError={(e) => { e.target.onerror = null; e.target.src = `${import.meta.env.BASE_URL}default.png`; }}
                          alt={project.name}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <p className="text-gray-300 mb-4 line-clamp-3">{project.shortDescription}</p>
                      </>
                    )}

                    <h2 className="title-section text-xl mb-2">{project.name}</h2>

                    {/* Tecnologías */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Descripción detallada solo si expandido */}
                    {isExpanded && project.description && (
                      <ul className="list-disc list-inside text-gray-200 mb-4">
                        {project.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 btn-secondary text-sm px-3 py-1 mt-auto"
                    >
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="self-stretch btn-warning flex items-center justify-center"
        >
          ›
        </button>
      </div>
    </div>
  );
}
