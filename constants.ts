import { PortfolioData } from './types';

const SHARED_DATA = {
  skills: [
    { name: "Java" },
    { name: "Python" },
    { name: "Linux (RedHat/CentOS)" },
    { name: "SQL (MySQL/PostgreSQL)" },
    { name: "Docker" },
    { name: "Git" },
    { name: "Splunk / Zabbix" },
    { name: "Bash Scripting" },
    { name: "REST APIs" },
    { name: "Ciberseguridad Básica" }
  ],
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com"
  },
  email: "alex.dev@example.com",
  certificates: [
    {
        id: "c1",
        title: "Google Data Analytics Professional Certificate",
        issuer: "Coursera / Google",
        date: "2023",
        link: "#"
    },
    {
        id: "c2",
        title: "React - The Complete Guide",
        issuer: "Udemy",
        date: "2023",
        link: "#"
    },
    {
        id: "c3",
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2022",
        link: "#"
    }
  ]
};

export const PORTFOLIO_CONTENT: Record<'es' | 'en', PortfolioData> = {
  es: {
    personal: {
      name: "César",
      title: "Desarrollador Backend Jr. • Estudiante de Ciencias de la Computación",
      shortBio: "Estudiante de la UNAM enfocado en Backend, Infraestructura y Seguridad. Experiencia real resolviendo incidentes críticos en banca y monitoreo de sistemas.",
      longBio: "Soy César, estudiante de 3er semestre de Ciencias de la Computación en la UNAM. A diferencia del promedio, ya cuento con experiencia laboral real gestionando incidentes de TI y analizando logs para prevención de fraudes. Me apasiona la lógica del servidor, Linux y la arquitectura de nube. Busco retos técnicos, no solo visuales.",
      location: "Ciudad de México, México",
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
        period: "2022 — 2024",
        company: "Creative Agency",
        role: "Frontend Developer",
        description: "Colaboración estrecha con equipos de diseño para traducir mockups de Figma a código pixel-perfect. Integración de APIs RESTful y GraphQL."
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
      name: "César",
      title: "Junior Backend Developer • CS Student",
      shortBio: "CS Student at UNAM focused on Backend, Infrastructure, and Security. Real-world experience solving critical incidents in banking and system monitoring.",
      // Traducción profesional que eleva tu perfil
      longBio: "I'm César, a 3rd-semester Computer Science student at UNAM. Unlike the average student, I already have professional experience managing IT incidents and analyzing logs for fraud prevention. I am passionate about server-side logic, Linux, and Cloud architecture. I look for technical challenges, not just visual ones.",
      location: "Mexico City, Mexico",
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
        period: "2022 — 2024",
        company: "Creative Agency",
        role: "Frontend Developer",
        description: "Close collaboration with design teams to translate Figma mockups into pixel-perfect code. Integration of RESTful APIs and GraphQL."
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

export const TERMINAL_COMMANDS = {
  HELP: 'help',
  EXPERIENCE: 'experiencia',
  PROJECTS: 'proyectos',
  CONTACT: 'contacto',
  CLEAR: 'clear',
  DEMO: 'demo'
};