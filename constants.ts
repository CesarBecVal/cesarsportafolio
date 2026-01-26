import { PortfolioData } from './types';

/**
 * @file constants.ts
 * @description Este archivo contiene todas las constantes y datos estáticos utilizados en el portafolio.
 * Centraliza la información para facilitar su mantenimiento y la gestión del soporte multi-idioma (Español/Inglés).
 * @author César
 */

/**
 * @constant SHARED_DATA
 * @description Datos compartidos que son agnósticos del idioma, como habilidades técnicas,
 * enlaces a redes sociales, correo electrónico y certificados.
 * Se reutilizan tanto en la versión en español como en inglés.
 */
const SHARED_DATA = {
  skills: [
    { name: "Java" },
    { name: "Python" },
    { name: "Haskell" },
    { name: "C" },
    { name: "Lean 4" },
    { name: "Linux (RedHat/CentOS)" },
    { name: "SQL (MySQL/PostgreSQL)" },
    { name: "Docker" },
    { name: "Git" },
    { name: "Global Hits" },
    { name: "Zendesk" },
    { name: "Bash Scripting" },
    { name: "REST APIs" }
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/cesar-becerra-valencia-2bb5751b8/",
    github: "https://github.com/CesarBecVal",
    twitter: "https://x.com/cbecval?s=21"
  },
  email: "cesarbecerravalencia@gmail.com",
  certificates: [
    {
      id: "c1",
      title: "Introduction to SQL",
      issuer: "DataCamp",
      date: "2025",
      link: "https://www.datacamp.com/completed/statement-of-accomplishment/course/eb264aae756ffa157ae893b107e3fa92268438ca"
    },
    {
      id: "c2",
      title: "Understanding Prompt Engineering",
      issuer: "DataCamp",
      date: "2025",
      link: "https://www.datacamp.com/completed/statement-of-accomplishment/course/80d4e85b550fdc31b2f51bece85771656731b544"
    },
    {
      id: "c3",
      title: "Writing Functions using Java",
      issuer: "CodeSignal",
      date: "2025",
      link: "https://codesignal.com/learn/certificates/cm8uobwga000bnredjott1c6b/courses/36"
    },
    {
      id: "c4",
      title: "Introduction to Git",
      issuer: "DataCamp",
      date: "2025",
      link: "https://www.datacamp.com/completed/statement-of-accomplishment/course/a11fe529853c2fde897fa7896f85e6abe91c6728"
    }
  ]
};

/**
 * @constant PORTFOLIO_CONTENT
 * @type {Record<'es' | 'en', PortfolioData>}
 * @description Objeto principal que contiene todo el contenido textual del portafolio,
 * dividido por idioma ('es' para español, 'en' para inglés).
 * Incluye información personal, experiencia laboral, proyectos, educación y etiquetas de la UI.
 */
export const PORTFOLIO_CONTENT: Record<'es' | 'en', PortfolioData> = {
  es: {
    personal: {
      name: "César Becerra Valencia",
      title: "Desarrollador Web Backend & Java • Estudiante CS UNAM",
      shortBio: "Desarrollador de Software Java Junior y Estudiante de Ciencias de la Computación UNAM. Especializado en Backend, Linux y Seguridad. CTO en VLC Agencia.",
      longBio: "Soy César Becerra Valencia, Desarrollador Web y Programador Java con base en Nezahualcóyotl, México. Actualmente curso el 4to semestre de Ciencias de la Computación en la UNAM. Cuento con experiencia real como CTO en VLC Agencia y gestionando incidentes críticos de TI. Me apasiona el desarrollo backend, Linux y la seguridad informática.",
      location: "Nezahualcóyotl, Estado de México",
      availability: "Becario / Medio Tiempo",
      email: SHARED_DATA.email,
      socials: SHARED_DATA.socials
    },
    experience: [
      {
        id: "1",
        period: "05/2024 — 11/2024",
        company: "Aruss Technologies",
        role: "Analista de Soporte TI / Backend Support",
        //Redactado  para que suene a LOGROS, no solo tareas.
        description: "Gestión crítica de motores de pago (T1) y soporte a banca móvil. Realicé análisis de logs para detectar patrones de fraude y autenticaciones sospechosas. Colaboración con seguridad para manejo de incidentes en tarjetas y resolución de bugs operativos."
      },
      {
        id: "2",
        period: "12/2025 — Presente",
        company: "VLC Marketing",
        role: "Chief Technology Officer (CTO)",
        description: "Responsable del área tecnológica, lidero la ejecución de proyectos digitales y actúo como asesor estratégico para la toma de decisiones técnicas de la empresa con desarrollo web de alto rendimiento."
      }
    ],
    skills: SHARED_DATA.skills,
    projects: [
      {
        id: "p1",
        title: "Portfolio App",
        description: "Sitio personal que muestra proyectos y CV. Animaciones reactivas y diseño minimalista.",
        techStack: ["React", "Tailwind", "Vite"],
        demoLink: "#",
        codeLink: "https://github.com/cesarbecval"
      },
      {
        id: "p2",
        title: "Configuración de Servidor Linux",
        description: "Despliegue de servicios básicos y configuración de seguridad en entorno RedHat/CentOS.",
        techStack: ["Linux", "Bash", "Docker"],
        demoLink: "#",
        codeLink: "https://github.com/cesarbecval"
      }
    ],
    education: [
      {
        id: "edu1",
        period: "2024 — Presente",
        degree: "Licenciatura en Ciencias de la Computación",
        institution: "Facultad de Ciencias, UNAM"
      },
      {
        id: "edu2",
        period: "2021 — 2024",
        degree: "Técnico Especializado en Computación",
        institution: "Escuela Nacional Preparatoria N. 6, UNAM"
      }

    ],
    certificates: SHARED_DATA.certificates,
    labels: {
      nav: {
        about: "Sobre mí",
        experience: "Experiencia",
        skills: "Habilidades",
        projects: "Proyectos",
        certificates: "Certificados",
        contact: "Contacto"
      },
      hero: {
        greeting: "Hola, soy",
        role: "Backend & Seguridad",
        description: "Transformo lógica compleja en sistemas estables.",
        ctaProject: "Ver Código",
        ctaContact: "Contáctame",
        ctaCV: "Descargar CV"
      },
      sections: {
        about: "Sobre mí",
        experience: "Experiencia",
        skills: "Habilidades",
        projects: "Proyectos",
        education: "Educación",
        certificates: "Certificaciones",
        contact: "Contacto"
      },
      contact: {
        title: "¿Hablamos de Código?",
        subtitle: "Busco oportunidades como Becario o Jr. donde pueda ensuciarme las manos con servidores, backend o seguridad.",
        formName: "Nombre",
        formEmail: "Correo",
        formMessage: "Mensaje",
        formSubmit: "Enviar",
        formSending: "Enviando...",
        successTitle: "¡Recibido!",
        successMessage: "Gracias por contactarme. Te responderé pronto.",
        sendAnother: "Enviar otro"
      },
      footer: {
        rights: "Todos los derechos reservados.",
        designed: "Construido con lógica y café por "
      }
    }
  },
  en: {
    personal: {
      name: "César Becerra Valencia",
      title: "Junior Backend Java Developer • CS Student UNAM",
      shortBio: "Computer Science Student at UNAM focused on Backend, Linux, and Security. CTO at VLC Agency with experience in critical incident resolution.",
      // Traducción profesional que eleva tu perfil
      longBio: "I'm César Becerra Valencia, a Web Developer and Java Programmer based in Nezahualcóyotl, Mexico. I am a 4th-semester Computer Science student at UNAM. Unlike the average student, I have professional experience as CTO at VLC Agency and managing IT incidents. I am passionate about server-side logic, Linux, and Cloud architecture.",
      location: "Nezahualcóyotl, Mexico State",
      availability: "Internship / Part-time",
      email: SHARED_DATA.email,
      socials: SHARED_DATA.socials
    },
    experience: [
      {
        id: "1",
        period: "05/2024 — 11/2024",
        company: "Aruss Technologies",
        role: "IT Support Analyst / Backend Support",
        description: "Managed critical incidents for payment engines (T1) and mobile banking. Conducted log analysis to detect fraud patterns and suspicious authentications. Collaborated with security teams for card incident management and operational bug resolution."
      },
      {
        id: "2",
        period: "12/2025 — Present",
        company: "VLC Marketing",
        role: "Chief Technology Officer (CTO)",
        description: "Responsible for the technology department, I lead the execution of digital projects and serve as a strategic advisor in the company’s technical decision-making, focusing on high-performance web development."
      }
    ],
    skills: SHARED_DATA.skills,
    projects: [
      {
        id: "p1",
        title: "Portfolio App",
        description: "Personal site showcasing projects and CV. Reactive animations and minimalist design.",
        techStack: ["React", "Tailwind", "Vite"],
        demoLink: "#",
        codeLink: "#"
      },
      {
        id: "p2",
        title: "Financial Dashboard",
        description: "Real-time data visualization for cryptocurrencies using D3.js and WebSockets.",
        techStack: ["Next.js", "D3.js", "Firebase"],
        demoLink: "#",
        codeLink: "#"
      },
      {
        id: "p3",
        title: "Linux Server Configuration",
        description: "Deployment of basic services and security configuration in RedHat/CentOS environment.",
        techStack: ["Linux", "Bash", "Docker"],
        demoLink: "#",
        codeLink: "https://github.com/cesarbecval"
      }
    ],
    education: [
      {
        id: "edu1",
        period: "2023 — Present",
        degree: "B.S. in Computer Science",
        institution: "Faculty of Science, UNAM"
      },
      {
        id: "edu2",
        period: "2020 — 2023",
        degree: "Technical Degree in Computing",
        institution: "Escuela Nacional Preparatoria N. 6, UNAM"
      }
    ],
    certificates: SHARED_DATA.certificates,
    labels: {
      nav: {
        about: "About",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        certificates: "Certificates",
        contact: "Contact"
      },
      hero: {
        greeting: "Hi, I'm",
        role: "Backend & Security",
        description: "I turn complex logic into stable systems.",
        ctaProject: "View Projects",
        ctaContact: "Contact Me",
        ctaCV: "Download CV"
      },
      sections: {
        about: "About Me",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        education: "Education",
        certificates: "Certifications",
        contact: "Contact"
      },
      contact: {
        title: "Let's Talk Code",
        subtitle: "I'm looking for Internship or Junior opportunities where I can get my hands dirty with servers, backend, or security.",
        formName: "Name",
        formEmail: "Email",
        formMessage: "Message",
        formSubmit: "Send",
        formSending: "Sending...",
        successTitle: "Received!",
        successMessage: "I'll get back to you ASAP.",
        sendAnother: "Send another"
      },
      footer: {
        rights: "All rights reserved.",
        designed: "Built with logic and coffee by "
      }
    }
  }
};

/**
 * @constant TERMINAL_COMMANDS
 * @description Define los comandos disponibles para el widget de terminal interactiva.
 * Mapea las acciones del usuario a identificadores de comandos específicos.
 */
export const TERMINAL_COMMANDS = {
  HELP: 'help',
  EXPERIENCE: 'experiencia',
  PROJECTS: 'proyectos',
  CONTACT: 'contacto',
  CLEAR: 'clear',
  DEMO: 'demo'
};