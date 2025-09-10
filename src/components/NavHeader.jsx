import React from "react";

export default function NavHeader() {
  return (
    <header className="w-full py-4 px-6 bg-slate-900/60 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Kevin Zhang</h1>
        <nav className="space-x-6 text-slate-300">
          <a href="#globe" className="hover:text-white">Mapa</a>
          <a href="#timeline" className="hover:text-white">Experiencia</a>
          <a href="#contact" className="hover:text-white">Contacto</a>
        </nav>
      </div>
    </header>
  );
}