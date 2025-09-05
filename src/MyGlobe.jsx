import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl'; // ✅ aquí


export default function MyGlobe() {
    const globeEl = useRef(null);
    const globeInstance = useRef(null);
    const [selected, setSelected] = useState(null);

    const samplePoints = [
        {
            id: 1,
            lat: 24.4539,
            lng: 54.3773,
            country: 'United Arab Emirates',
            city: 'Abu Dhabi',
            title: 'Technical Lead - Hawkeye Innovations',
            period: '2023 — presente',
            description:
                'Lideré el equipo técnico, definí documentación y configuraciones para box sells. Trabajé con sistemas embebidos y despliegues en la nube.',
            image: null,
        },
        {
            id: 2,
            lat: -2.9006,
            lng: -79.0047,
            country: 'Ecuador',
            city: 'Cuenca',
            title: 'Operador VAR / Soporte técnico',
            period: '2018 — 2022',
            description:
                'Operé como VAR en eventos deportivos, colaboré en integración de video y desarrollos de software para revisión arbitral.',
            image: null,
        },
        {
            id: 3,
            lat: 41.9028,
            lng: 12.4964,
            country: 'Italia',
            city: 'Roma (meta)',
            title: 'Objetivo profesional — Europa',
            period: '2025 — futuro',
            description:
                'Busco expandir experiencia en arquitectura de centros de datos y realizar una maestría en Europa (Italia).',
            image: null,
        },
    ];

    useEffect(() => {
        if (!globeEl.current || globeInstance.current) return;

        const g = Globe()
            (globeEl.current)
            .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
            .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
            .showAtmosphere(true)
            .atmosphereColor('#3fa9f5')
            .atmosphereAltitude(0.25)
            .pointOfView({ lat: 20, lng: 0, altitude: 2.5 })
            .pointsData(samplePoints)
            .pointLat('lat')
            .pointLng('lng')
            .pointLabel((d) => `${d.city}, ${d.country}`) 
            .pointColor(() => '#ff7043')
            .pointAltitude(0.02)
            .pointRadius(0.3)
            .onPointClick((d) => setSelected(d));

        g.controls().autoRotate = true;
        g.controls().autoRotateSpeed = 0.4;

        globeInstance.current = g;

        return () => {
            try {
                if (globeInstance.current) globeInstance.current = null;
            } catch (e) {
                // ignore
            }
        };
    }, []); // run once

    // keyboard escape closes modal
    useEffect(() => {
        function onKey(e) {
            if (e.key === 'Escape') setSelected(null);
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4">
            <header className="max-w-6xl mx-auto mb-4">
                <h1 className="text-3xl font-semibold">Kevin — Hoja de vida interactiva</h1>
                <p className="text-slate-300 mt-1">
                    Mapa 3D con pines: haz clic en cualquier pin para ver lo que hice en esa ciudad/país.
                </p>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
                <section className="lg:col-span-2 bg-slate-900/40 rounded-2xl p-4 shadow-lg">
                    <div
                        ref={globeEl}
                        style={{ width: '100%', height: '70vh', borderRadius: '12px' }}
                        className="globe-container"
                    />
                </section>

                <aside className="lg:col-span-1 bg-slate-900/30 rounded-2xl p-4 shadow-inner">
                    <h2 className="text-xl font-medium mb-2">Experiencias (resumen)</h2>
                    <ul className="space-y-3">
                        {samplePoints.map((p) => (
                            <li
                                key={p.id}
                                className="p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 cursor-pointer"
                                onClick={() => {
                                    // move camera to this point
                                    if (globeInstance.current) {
                                        globeInstance.current.pointOfView({ lat: p.lat, lng: p.lng, altitude: 1.4 }, 1200);
                                    }
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

                    <div className="mt-6 text-sm text-slate-400">
                        Consejos: usa imágenes para cada punto (image), mantén descripciones cortas para tooltips y
                        ofrece enlaces a proyectos relevantes.
                    </div>
                </aside>
            </main>

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setSelected(null)}
                    />

                    <div className="relative bg-white text-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full p-6 z-10">
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-3 right-3 text-slate-500 hover:text-slate-800"
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-semibold mb-1">{selected.title}</h3>
                        <div className="text-sm text-slate-600 mb-3">{selected.city}, {selected.country} — {selected.period}</div>
                        <p className="text-sm leading-relaxed mb-4">{selected.description}</p>

                        {selected.image ? (
                            // If you provide an image URL in the data, it will show here
                            <img src={selected.image} alt="imagen experiencia" className="w-full rounded-md" />
                        ) : (
                            <div className="w-full h-40 bg-slate-100 rounded-md flex items-center justify-center text-slate-500">Sin imagen</div>
                        )}

                        <div className="mt-4 flex justify-end">
                            <a
                                className="text-sm mr-3 underline"
                                href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ver en Maps
                            </a>
                            <button className="px-4 py-2 rounded-lg bg-slate-800 text-white" onClick={() => setSelected(null)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="max-w-6xl mx-auto mt-8 text-slate-400 text-sm">Hecho con ❤️ — ajusta estilos y datos a tu gusto.</footer>
        </div>
    );
}
