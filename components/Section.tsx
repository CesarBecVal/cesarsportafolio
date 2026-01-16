import React, { useRef, useEffect, useState } from 'react';

/**
 * @file Section.tsx
 * @description Componente contenedor para las secciones principales del portafolio.
 * Implementa animaciones de entrada "fade-in" cuando el usuario hace scroll (Intersection Observer).
 * Estandariza el diseño de títulos y espaciado.
 * @author César
 */

/**
 * @interface SectionProps
 * @property {string} id - Identificador único para navegación (anclas).
 * @property {string} [title] - Título visible de la sección (opcional).
 * @property {string} [className] - Clases CSS adicionales.
 * @property {React.ReactNode} children - Contenido interno de la sección.
 */
interface SectionProps {
  id: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * @component Section
 * @description Wrapper estructural que envuelve el contenido de cada sección.
 * 
 * Funcionalidades:
 * - Detección de visibilidad: Usa `IntersectionObserver` para animar la entrada.
 * - Renderizado condicional del título con numeración automática.
 * - Optimización para la sección 'hero' (carga inmediata).
 * 
 * @param {SectionProps} props - Propiedades del componente.
 */
const Section: React.FC<SectionProps> = ({ id, title, className = '', children }) => {
  const sectionRef = useRef<HTMLElement>(null);
  // FIX: Si es la sección 'hero', la hacemos visible inmediatamente.
  // Esto evita que el usuario vea la pantalla en blanco esperando al IntersectionObserver.
  const [isVisible, setIsVisible] = useState(id === 'hero');

  useEffect(() => {
    // Si ya es visible (caso hero), no necesitamos observar
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Bajamos un poco el threshold para asegurar detección
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [isVisible]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
    >
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-100 flex items-center gap-3">
          <span className="text-accent font-mono text-xl">0{['about', 'experience', 'skills', 'projects', 'education', 'contact'].indexOf(id) + 1}.</span>
          {title}
          <div className="h-px bg-slate-700 flex-grow ml-6 max-w-xs" />
        </h2>
      )}
      {children}
    </section>
  );
};

export default Section;