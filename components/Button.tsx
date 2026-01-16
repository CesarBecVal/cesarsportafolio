import React from 'react';

/**
 * @file Button.tsx
 * @description Componente de botón reutilizable y polimórfico.
 * Puede renderizarse como un elemento <button> estándar o como un enlace <a> si se proporciona la prop 'href'.
 * Soporta múltiples variantes visuales y estilos predefinidos.
 * @author César
 */

/**
 * @interface ButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 * @description Propiedades extendidas del botón.
 * 
 * @property {'primary' | 'secondary' | 'outline'} [variant='primary'] - Estilo visual del botón.
 * @property {string} [href] - Si se define, el componente se renderiza como un enlace <a>.
 * @property {boolean} [external] - Si es true y hay href, añade target="_blank" y rel="noopener noreferrer".
 * @property {boolean | string} [download] - Habilita la descarga del recurso enlazado.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  external?: boolean;
  download?: boolean | string;
}

/**
 * @component Button
 * @description Componente UI fundamental para acciones del usuario.
 * 
 * Características:
 * - Polimorfismo: Renderiza <a> o <button> según las props.
 * - Estilos consistentes: Gestiona estados hover, focus y disabled.
 * - Accesibilidad: Mantiene atributos ARIA y de foco nativos.
 * 
 * @param {ButtonProps} props - Propiedades de configuración y atributos HTML nativos.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  external,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-accent backdrop-blur-sm disabled:opacity-50";

  const variants = {
    primary: "bg-accent/10 text-accent border border-accent/50 hover:bg-accent hover:text-white hover:shadow-[0_0_20px_rgba(0,184,217,0.4)]",
    secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white",
    outline: "border border-slate-600 text-slate-400 hover:border-slate-300 hover:text-slate-200"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    // Cast props to any to avoid TypeScript errors when spreading button props on anchor
    const { type, ...anchorProps } = props as any;
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={combinedClasses}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;