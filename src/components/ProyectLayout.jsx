import React, { useState, useRef } from "react";
import projectsData from "../data/projects.json";
import { FaGithub } from "react-icons/fa";

export default function ProjectLayout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const carouselRef = useRef(null);
  const total = projectsData.length;

  const scrollToIndex = (index) => {
    setExpandedIndex(null);
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
  };

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, total - 1);
    if (newIndex >= total - 1) { scrollToIndex(0) }
    else scrollToIndex(newIndex);
  };

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full py-6">
      <h1 className="title-main text-4xl mb-6 text-center">Proyectos</h1>

      {/* Contenedor flex: botones y carrusel */}
      <div className="flex items-center gap-2 h-[75vh]">
        {/* Botón izquierda */}
        <button
          onClick={handlePrev}
          className="self-stretch btn-warning  flex items-center justify-center"
          style={{ width: "3rem" }}

        >
          ‹
        </button>

        {/* Carrusel */}
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
                    <h2 className="title-section text-xl mb-2">{project.name}</h2>
                    <p className="text-gray-300 mb-4 line-clamp-3">{project.shortDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

        {/* Botón derecha */}
        <button
          onClick={handleNext}
          className="self-stretch btn-warning  flex items-center justify-center"
          style={{ width: "3rem" }}        >
          ›
        </button>
      </div>
    </div>
  );
}
