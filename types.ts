export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoLink?: string;
  codeLink?: string;
}

export interface SkillItem {
  name: string;
  category?: 'language' | 'tool' | 'framework';
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export interface TerminalMessage {
  id: string;
  type: 'user' | 'system' | 'ai';
  content: string;
  timestamp: number;
}

export interface UILabels {
  nav: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    certificates: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
    ctaProject: string;
    ctaContact: string;
    ctaCV: string;
  };
  sections: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    education: string;
    certificates: string;
    contact: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
    formSending: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
  };
  footer: {
    rights: string;
    designed: string;
  };
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    shortBio: string;
    longBio: string;
    location: string;
    availability: string;
    email: string;
    socials: {
      linkedin: string;
      github: string;
      twitter: string;
    };
  };
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  labels: UILabels;
}