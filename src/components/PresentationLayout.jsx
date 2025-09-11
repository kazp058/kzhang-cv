import useScrollIndicator from "../hooks/useScrollIndicator";
import ScrollArrow from "./ScrollArrow";

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DownloadIcon from '@mui/icons-material/Download';
///officiating-16mb.mp4
export default function PresentationLayout({ currentSection }) {
  const showScroll = useScrollIndicator(currentSection, 2000);
  return (
    <section className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="../assets/officiating-16mb.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Overlay semi-transparente */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-800/60 z-10"></div>

      {/* Contenido principal */}
      <div className="relative z-20 global-container bg-black/60 text-center space-y-8 rounded-xl p-8">
        <h1 className="title-main text-5xl">Kevin Zhang</h1>
        <p className="text-xl text-gray-300 font-light">
          Soy Technical Lead especializado en operaciones de alta disponibilidad y gestión de infraestructura remota. Mi trayectoria abarca sistemas en tiempo real, despliegues internacionales y resolución de incidentes críticos, siempre asegurando la continuidad del servicio bajo presión.
        </p>
        <p className="text-gray-400">
          Hoy, mi objetivo es trasladar esta experiencia al ámbito de los centros de datos, donde la resiliencia, la escalabilidad y la confiabilidad son clave para sostener servicios globales.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <a href="mailto:kevinzhangplaza@gmail.com" className="btn-secondary">
            <MailOutlineIcon className="w-5 h-5" /> Contacto
          </a>

          <a href="../assets/Kevin_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <DownloadIcon className="w-5 h-5" /> Descargar CV
          </a>
        </div>
      </div>

      {/* Flecha flotante sobre todo el contenido */}
      {currentSection === 0 && showScroll && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <ScrollArrow />
        </div>
      )}
    </section>
  );
}