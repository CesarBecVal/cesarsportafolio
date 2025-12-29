import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONTENT } from './constants';
import Background from './components/Background';
import TerminalComponent from './components/Terminal';
import Section from './components/Section';
import Button from './components/Button';
import HeroLaptop from './components/HeroLaptop';
import { Analytics } from '@vercel/analytics/react';
import { Github, Linkedin, Twitter, ExternalLink, Mail, MapPin, Calendar, Download, Globe, Award } from 'lucide-react';

// --- CONFIGURACIÓN DE IMÁGENES LOCALES ---
// 1. Coloca tus imágenes en la carpeta "src/assets" (o similar).
// 2. Importa tus imágenes descomentando las líneas de abajo y ajustando el nombre del archivo:
import profileImg from './assets/mi-foto-perfil.jpg';
// import projectImg1 from './assets/proyecto-1.jpg';

// 3. Mapea los IDs de tus proyectos (ver constants.ts) con las imágenes importadas:
const PROJECT_IMAGES: Record<string, string> = {
  // 'id-del-proyecto': projectImg1,
  // 'otro-id': projectImg1,
};
// -----------------------------------------

const App: React.FC = () => {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const content = PORTFOLIO_CONTENT[lang];
  const { personal, experience, skills, projects, education, certificates, labels } = content;
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission
    setTimeout(() => setFormStatus('success'), 1500);
  };

  // Scroll Spy & Navbar Appearance Logic
  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar pill style
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'sobre-mí', 'experience', 'skills', 'projects', 'certificates', 'education', 'contact'];
      
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen font-sans text-slate-300 selection:bg-accent/30 selection:text-white">
      <Background />
      
      {/* --- NEW LAYOUT NAVIGATION --- */}
      
      {/* 3. Floating Central Navbar (Dynamic Pill Design) */}
      <nav 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center rounded-full px-4 py-3 transition-all duration-500 animate-in fade-in slide-in-from-top-8 duration-700 ${
          isScrolled 
            ? "bg-slate-900/45 backdrop-blur-xl border border-white/10 shadow-2xl" 
            : "bg-transparent border border-transparent"
        }`}
      >
        <ul className="flex items-center gap-1">
          {Object.entries(labels.nav).map(([key, label]) => {
             const sectionId = key === 'about' ? 'sobre-mí' : key;
             const isActive = activeSection === sectionId || (activeSection === 'hero' && key === 'about'); // Default to about if hero

             return (
              <li key={key}>
                <a 
                  href={`#${sectionId}`}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 block
                    ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
                  `}
                >
                  {/* Sliding Background Effect for Active Item */}
                  {isActive && (
                    <span className="absolute inset-0 bg-white/10 rounded-full -z-10 animate-in zoom-in-95 duration-200" />
                  )}
                  {label}
                </a>
              </li>
             );
          })}
        </ul>

        {/* Separator */}
        <div className="h-4 w-px bg-white/10 mx-2" />

        {/* Integrated Language Switcher */}
        <button 
            onClick={toggleLang} 
            className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            aria-label="Switch Language"
        >
            <Globe size={14} />
            <span>{lang.toUpperCase()}</span>
        </button>
      </nav>

      {/* Mobile Nav Warning (Simplified) */}
      <div className="md:hidden fixed top-6 right-6 z-50">
         <button 
            onClick={toggleLang} 
            className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-mono text-slate-400"
         >
            <Globe size={14} />
            <span>{lang.toUpperCase()}</span>
         </button>
      </div>


      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <Section id="hero" className="min-h-[95vh] flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Left Column: Text */}
            <div className="flex flex-col justify-center items-start order-2 lg:order-1">
              <p className="text-accent font-mono mb-4 animate-in slide-in-from-bottom-4 duration-700 delay-100">
                {labels.hero.greeting}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-4 animate-in slide-in-from-bottom-4 duration-700 delay-200">
                {personal.name}.
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-400 mb-8 animate-in slide-in-from-bottom-4 duration-700 delay-300">
                {labels.hero.role}
              </h2>
              <p className="max-w-xl text-lg text-slate-400 mb-10 leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-400">
                {personal.shortBio}
              </p>
              <div className="flex flex-wrap gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-500">
                <Button href="#projects">
                    {labels.hero.ctaProject}
                </Button>
                <Button variant="outline" href="#contact">
                    {labels.hero.ctaContact}
                </Button>
                <Button variant="outline" href="/cv.pdf" download className="group">
                    <Download size={18} className="mr-2 group-hover:text-accent transition-colors" />
                    {labels.hero.ctaCV}
                </Button>
              </div>
            </div>

            {/* Right Column: Interactive Laptop */}
            <div className="order-1 lg:order-2 flex justify-center items-center perspective-container animate-in fade-in zoom-in duration-1000 delay-300">
               <HeroLaptop />
            </div>

          </div>
        </Section>

        {/* About Section */}
        <Section id="sobre-mí" title={labels.sections.about}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>{personal.longBio}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-white/5 rounded border border-white/10 flex items-center gap-3">
                  <MapPin className="text-accent" size={20} />
                  <span className="text-sm">{personal.location}</span>
                </div>
                <div className="p-4 bg-white/5 rounded border border-white/10 flex items-center gap-3">
                  <Calendar className="text-secondary" size={20} />
                  <span className="text-sm">{personal.availability}</span>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-secondary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-800 border border-white/10 flex items-center justify-center">
                {/* Placeholder for Profile Image */}
                 <img 
                   // PASO 4: Cambia la URL fija por tu variable importada, ej: src={profileImg}
                   src={profileImg}
                   alt="Profile" 
                   className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0" 
                 />
              </div>
            </div>
          </div>
        </Section>

        {/* Experience Section */}
        <Section id="experience" title={labels.sections.experience}>
          <div className="space-y-12 border-l border-slate-800 ml-3 md:ml-6">
            {experience.map((job) => (
              <div key={job.id} className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-900 group-hover:bg-accent transition-colors" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-accent transition-colors">
                    {job.role} <span className="text-accent">@ {job.company}</span>
                  </h3>
                  <span className="text-sm font-mono text-slate-500">{job.period}</span>
                </div>
                <p className="text-slate-400 max-w-2xl">{job.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title={labels.sections.skills}>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div 
                key={skill.name}
                className="px-4 py-2 bg-white/5 text-accent rounded-full text-sm font-mono border border-white/5 hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(0,184,217,0.2)] transition-all cursor-default"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title={labels.sections.projects}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="group bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-accent/30"
              >
                <div className="h-48 bg-slate-700 overflow-hidden relative">
                    {/* Placeholder Project Image */}
                    <div className="absolute inset-0 bg-slate-900/50 z-10 group-hover:bg-transparent transition-colors" />
                    <img 
                        src={PROJECT_IMAGES[project.id] || `https://picsum.photos/seed/${project.id}/800/600`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-accent transition-colors">{project.title}</h3>
                    <div className="flex gap-3 text-slate-400">
                      {project.codeLink && <a href={project.codeLink} className="hover:text-accent transition-colors"><Github size={20} /></a>}
                      {project.demoLink && <a href={project.demoLink} className="hover:text-accent transition-colors"><ExternalLink size={20} /></a>}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 min-h-[3em]">{project.description}</p>
                  <ul className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech) => (
                      <li key={tech} className="text-xs font-mono text-accent/80">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Education Section */}
        <Section id="education" title={labels.sections.education}>
            <div className="space-y-8">
                {education.map(edu => (
                    <div key={edu.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-colors">
                        <div>
                            <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                            <p className="text-accent">{edu.degree}</p>
                        </div>
                        <span className="text-sm font-mono text-slate-500 mt-2 md:mt-0">{edu.period}</span>
                    </div>
                ))}
            </div>
        </Section>

        {/* Certificates Section */}
        <Section id="certificates" title={labels.sections.certificates}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map(cert => (
                    <div key={cert.id} className="bg-slate-800/30 p-6 rounded-xl border border-white/5 hover:border-accent/30 transition-all hover:shadow-lg group">
                        <div className="flex justify-between items-start mb-4">
                            <Award className="text-accent w-8 h-8" strokeWidth={1.5} />
                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                <ExternalLink size={18} />
                            </a>
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-accent transition-colors mb-1">
                            {cert.title}
                        </h3>
                        <p className="text-sm text-slate-400 mb-2">{cert.issuer}</p>
                        <span className="text-xs font-mono text-slate-500 bg-slate-900/50 px-2 py-1 rounded">
                            {cert.date}
                        </span>
                    </div>
                ))}
            </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title={labels.sections.contact} className="mb-20">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">{labels.contact.title}</h3>
            <p className="text-slate-400 mb-8">
              {labels.contact.subtitle}
            </p>
            
            <div className="flex justify-center gap-6 mb-12">
                <a href={personal.socials.github} className="text-slate-400 hover:text-accent transition-colors hover:scale-110 transform duration-200"><Github size={24} /></a>
                <a href={personal.socials.linkedin} className="text-slate-400 hover:text-accent transition-colors hover:scale-110 transform duration-200"><Linkedin size={24} /></a>
                <a href={personal.socials.twitter} className="text-slate-400 hover:text-accent transition-colors hover:scale-110 transform duration-200"><Twitter size={24} /></a>
                <a href={`mailto:${personal.email}`} className="text-slate-400 hover:text-accent transition-colors hover:scale-110 transform duration-200"><Mail size={24} /></a>
            </div>
          </div>

          <div className="max-w-lg mx-auto bg-slate-800/50 p-8 rounded-xl border border-white/10 backdrop-blur-sm">
              {formStatus === 'success' ? (
                  <div className="text-center py-8">
                      <div className="text-accent text-5xl mb-4">✓</div>
                      <h4 className="text-xl font-bold text-white">{labels.contact.successTitle}</h4>
                      <p className="text-slate-400 mt-2">{labels.contact.successMessage}</p>
                      <button onClick={() => setFormStatus('idle')} className="mt-6 text-sm text-accent underline">{labels.contact.sendAnother}</button>
                  </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">{labels.contact.formName}</label>
                        <input type="text" id="name" required className="w-full bg-slate-900/50 border border-slate-600 rounded p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">{labels.contact.formEmail}</label>
                        <input type="email" id="email" required className="w-full bg-slate-900/50 border border-slate-600 rounded p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">{labels.contact.formMessage}</label>
                        <textarea id="message" rows={4} required className="w-full bg-slate-900/50 border border-slate-600 rounded p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"></textarea>
                    </div>
                    <Button type="submit" className="w-full" disabled={formStatus === 'submitting'}>
                        {formStatus === 'submitting' ? labels.contact.formSending : labels.contact.formSubmit}
                    </Button>
                </form>
              )}
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-500 text-sm font-mono bg-slate-900/80 backdrop-blur border-t border-white/5">
        <div className="mb-2">
            {labels.footer.designed} <span className="text-accent">{personal.name}</span>
        </div>
        <div>© {new Date().getFullYear()} {labels.footer.rights}</div>
      </footer>

      {/* AI Terminal Widget */}
      <TerminalComponent lang={lang} />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
};

export default App;