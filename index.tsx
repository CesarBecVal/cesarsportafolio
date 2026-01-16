import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * @file index.tsx
 * @description Punto de entrada de la aplicación React (Client-Side Rendering).
 * Se encarga de buscar el elemento raíz en el DOM y montar el componente principal <App />.
 * @author César
 */

// Fix for missing JSX.IntrinsicElements definitions in the environment
/**
 * @global
 * @description Extensión de tipos globales para asegurar compatibilidad con JSX
 * en entornos donde las definiciones de tipos podrían faltar o ser incompletas.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Selección del contenedor raíz en el HTML
const rootElement = document.getElementById('root');

// Validación de seguridad para asegurar que el contenedor existe antes de montar
if (!rootElement) {
  throw new Error("No se pudo encontrar el elemento raíz 'root' para montar la aplicación.");
}

// Inicialización del Virtual DOM de React 18+
const root = ReactDOM.createRoot(rootElement);

/**
 * Renderizado de la aplicación.
 * <React.StrictMode> activa comprobaciones adicionales y advertencias durante el desarrollo.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);