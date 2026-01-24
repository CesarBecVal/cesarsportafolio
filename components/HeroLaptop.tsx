import React from 'react';

/**
 * @file HeroLaptop.tsx
 * @description Componente puramente visual que renderiza una ilustración SVG animada de una laptop.
 * Se utiliza en la sección "Hero" para dar un impacto visual moderno y tecnológico.
 * Incluye animaciones CSS (hover, transiciones) y elementos interactivos simulados (código, notificaciones).
 * @author César
 */

/**
 * @component HeroLaptop
 * @description Ilustración vectorial compleja construida con SVG.
 * 
 * Características visuales:
 * - Diseño isométrico/frontal de una laptop moderna.
 * - Pantalla con simulación de editor de código (IDE).
 * - Animaciones de entrada y efectos hover (elevación, brillo).
 * - "Toast" de éxito que aparece flotando al interactuar.
 */
interface HeroLaptopProps {
  lang: 'es' | 'en';
}

const HeroLaptop: React.FC<HeroLaptopProps> = ({ lang }) => {
  return (
    <div className="relative group cursor-default perspective-1000 w-full max-w-lg mx-auto transform transition-transform duration-500 hover:scale-105">

      {/* Halo de Luz (Background Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/0 group-hover:bg-blue-500/20 blur-[80px] rounded-full transition-all duration-700 ease-in-out z-0 pointer-events-none" />

      {/* Laptop Container */}
      <div className="relative z-10 transition-transform duration-700 ease-in-out group-hover:-translate-y-6">

        {/* SVG Laptop Illustration */}
        <svg viewBox="0 0 600 380" className="w-full h-auto drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">

          {/* --- CHASSIS & HARDWARE --- */}

          {/* Base / Bottom Case */}
          <path d="M60 330 L540 330 C551 330 560 333 560 336 L560 341 C560 345 551 346 540 346 L60 346 C49 346 40 345 40 341 L40 336 C40 333 49 330 60 330 Z" fill="#1e293b" className="stroke-slate-700 stroke-1" />

          {/* Seam */}
          <path d="M40 340 L560 340" stroke="#0f172a" strokeWidth="1" opacity="0.5" />

          {/* Opening Notch */}
          <path d="M250 330 L350 330 L346 340 L254 340 Z" fill="#334155" className="group-hover:fill-slate-600 transition-colors duration-500" />

          {/* Screen Bezel */}
          <rect x="50" y="20" width="500" height="310" rx="12" fill="#0f172a" className="stroke-slate-600 stroke-2" />

          {/* --- SCREEN CONTENT --- */}
          <g className="transition-all duration-700">
            {/* Screen Background */}
            <rect x="65" y="35" width="470" height="280" rx="4" fill="#1e1e2e" />

            {/* Header Bar (Traffic Lights) */}
            <rect x="65" y="35" width="470" height="24" rx="4" fill="#2d2d3f" />
            <circle cx="85" cy="47" r="4" fill="#ff5f56" />
            <circle cx="100" cy="47" r="4" fill="#ffbd2e" />
            <circle cx="115" cy="47" r="4" fill="#27c93f" />

            {/* --- CODE EDITOR AREA (Left Column) --- */}
            {/* Limit X max to approx 370 to avoid overlap with right sidebar */}
            <g className="opacity-60 group-hover:opacity-100 transition-opacity duration-500">

              {/* Line 1: Import statement vibe */}
              <rect x="90" y="80" width="60" height="8" rx="2" fill="#c77dff" className="group-hover:fill-purple-400 transition-colors duration-300" />
              <rect x="160" y="80" width="100" height="8" rx="2" fill="#3b82f6" />

              {/* Line 2: Function definition */}
              <rect x="90" y="105" width="80" height="8" rx="2" fill="#ff79c6" />
              <rect x="180" y="105" width="140" height="8" rx="2" fill="#f1fa8c" /> {/* Ends at x=320, safe */}

              {/* Line 3: Indented logic (The longest line) */}
              <rect x="115" y="130" width="50" height="8" rx="2" fill="#50fa7b" />
              <rect x="175" y="130" width="180" height="8" rx="2" fill="#fff" opacity="0.3" /> {/* Ends at x=355, safe */}

              {/* Line 4: Closing logic / Return */}
              <rect x="115" y="155" width="70" height="8" rx="2" fill="#c77dff" />
              <rect x="195" y="155" width="90" height="8" rx="2" fill="#3b82f6" className="group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300" />

              {/* Cursor - Blinking at end of Line 4 */}
              <rect x="295" y="153" width="2" height="12" fill="#00B8D9" className="animate-cursor-blink" />

              {/* --- SIDEBAR UI (Right Column) --- */}
              {/* Moved start X to 390 to ensure 35px gap from code */}
              <rect x="390" y="80" width="120" height="85" rx="4" fill="#334155" opacity="0.4" className="group-hover:opacity-60 transition-all duration-500" />
              <rect x="390" y="175" width="120" height="30" rx="4" fill="#334155" opacity="0.2" />
              <rect x="390" y="215" width="80" height="6" rx="2" fill="#334155" opacity="0.2" />

              {/* --- SUCCESS TOAST (Floating Overlay) --- */}
              <g className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-150 transform-gpu">
                {/* Centered relative to screen width or bottom aligned */}
                <rect x="160" y="240" width="280" height="50" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1" className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />

                {/* Icon inside toast */}
                <circle cx="185" cy="265" r="8" fill="#10b981" />
                <path d="M181 265 L184 268 L189 262" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Text lines inside toast */}
                <text
                  x="205"
                  y="270"
                  fill="#e2e8f0"
                  fontSize="15"
                  fontFamily="system-ui"
                  fontWeight="bold"
                  style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
                >
                  {lang === 'es' ? '¡Contáctame!' : 'Contact Me!'}
                </text>
              </g>

            </g>
          </g>

          {/* Reflection overlay */}
          <path d="M65 35 L535 35 L420 315 L65 315 Z" fill="white" fillOpacity="0.02" className="pointer-events-none" />

        </svg>
      </div>

      {/* Shadow underneath */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/40 blur-md rounded-[100%] transition-all duration-700 ease-in-out group-hover:w-3/5 group-hover:blur-lg group-hover:opacity-30 group-hover:translate-y-4" />

    </div>
  );
};

export default HeroLaptop;