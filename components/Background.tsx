import React, { useEffect, useRef } from 'react';

/**
 * @file Background.tsx
 * @description Componente visual que renderiza un fondo animado de partículas interactivas.
 * Utiliza HTML5 Canvas para dibujar una red de nodos conectados que reaccionan al movimiento del mouse.
 * @author César
 */

/**
 * @component Background
 * @description Crea un lienzo (canvas) de pantalla completa con una animación de partículas.
 * 
 * Características:
 * 1. Generación procedimental de partículas basada en el tamaño de la ventana.
 * 2. Efecto de "constelación": líneas que conectan partículas cercanas.
 * 3. Interactividad: las partículas huyen del cursor del mouse.
 * 4. Movimiento fluido y rebote suave (física de resorte) para volver a la posición original.
 */
const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    /**
     * @class Particle
     * @description Representa una partícula individual en el sistema de animación.
     * Maneja su propia posición, velocidad, renderizado y comportamiento físico.
     */
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.1 - 0.05;
        this.speedY = Math.random() * 0.1 - 0.05;
        this.density = (Math.random() * 30) + 1;
      }

      /**
       * Actualiza la posición de la partícula en cada frame.
       * Aplica fuerzas de movimiento natural, límites de pantalla, retorno elástico y repulsión del mouse.
       */
      update() {
        // 1. Movimiento Natural (Drift)
        // Movemos la base continuamente. Esto es el movimiento "orbital" natural.
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // 2. Control de Bordes (Wrap) para la BASE
        // Si la base se sale, la teletransportamos y sincronizamos la partícula
        // para evitar que cruce toda la pantalla volando hacia la nueva base.
        if (this.baseX < 0) {
          this.baseX = canvas!.width;
          this.x = this.baseX;
        }
        if (this.baseX > canvas!.width) {
          this.baseX = 0;
          this.x = this.baseX;
        }
        if (this.baseY < 0) {
          this.baseY = canvas!.height;
          this.y = this.baseY;
        }
        if (this.baseY > canvas!.height) {
          this.baseY = 0;
          this.y = this.baseY;
        }

        // 3. Física de Retorno (Elasticidad)
        // SIEMPRE calculamos la fuerza que quiere devolver la partícula a su base.
        // Esto elimina el 'else' y la vibración de frontera.
        const dxBase = this.baseX - this.x;
        const dyBase = this.baseY - this.y;

        // El divisor (20) determina qué tan rápido vuelve a su sitio (efecto resorte)
        this.x += dxBase / 20;
        this.y += dyBase / 20;

        // 4. Interacción con el Mouse (Repulsión)
        // Esta fuerza lucha contra la fuerza de retorno calculada arriba.
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = 150;

        if (distance < maxDistance) {
          if (distance === 0) distance = 0.1;

          // Calculamos la fuerza de empuje
          let force = (maxDistance - distance) / maxDistance;
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;

          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          // Aplicamos la repulsión
          this.x -= directionX;
          this.y -= directionY;
        }
      }

      /**
       * Dibuja la partícula en el canvas como un círculo sólido.
       */
      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(0, 184, 217, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    /**
     * Inicializa el arreglo de partículas.
     * Calcula el número óptimo de partículas basado en el área de la pantalla para mantener el rendimiento.
     */
    const initParticles = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 15000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    /**
     * Bucle principal de animación.
     * Limpia el canvas, actualiza y dibuja cada partícula, y dibuja las líneas de conexión.
     * Utiliza requestAnimationFrame para una animación fluida.
     */
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 184, 217, ${0.1 - distance / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
};

export default Background;