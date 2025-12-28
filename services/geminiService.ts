import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_CONTENT } from "../constants";

const getSystemInstruction = (lang: 'es' | 'en') => {
  const content = PORTFOLIO_CONTENT[lang];
  return `
    You are an AI assistant for the portfolio of ${content.personal.name}.
    Your goal is to answer questions about ${content.personal.name}'s experience, skills, and projects based on the following data:
    ${JSON.stringify(content)}

    Rules:
    1. Keep answers concise, professional, and slightly tech-savvy.
    2. Use a friendly but direct tone.
    3. If asked about something not in the data, strictly say you don't have that information.
    4. Respond in ${lang === 'es' ? 'Spanish' : 'English'}.
    5. Act like a CLI terminal output occasionally of linux in bash terminal.
  `;
};

export const generateResponse = async (
  userPrompt: string,
  lang: 'es' | 'en' = 'es'
): Promise<string> => {
  try {
    // Securely access the key from environment variables
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
       throw new Error("API_KEY not configured");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: getSystemInstruction(lang),
      },
    });

    return response.text || (lang === 'es' ? "Sin respuesta generada." : "No response generated.");
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // We do not return the exact error to the user UI to avoid leaking details, just a generic message unless it's missing key
    if (error.message.includes("API_KEY")) {
        return lang === 'es' 
            ? "Error: API Key no configurada en variables de entorno." 
            : "Error: API Key not configured in environment variables.";
    }
    return lang === 'es' 
        ? "Error de conexión con el enlace neuronal." 
        : "Connection error with neural link.";
  }
};

// Fallback responses for demo mode or when no key is present
export const getDemoResponse = (input: string, lang: 'es' | 'en'): string => {
  const lowerInput = input.toLowerCase();
  const content = PORTFOLIO_CONTENT[lang];
  
  const keywords = {
    exp: ['experiencia', 'experience', 'work', 'trabajo'],
    proj: ['proyecto', 'project', 'portfolio'],
    tech: ['stack', 'habilidad', 'skill', 'tech'],
    contact: ['contacto', 'contact', 'email', 'mail'],
    cert: ['cert', 'curso', 'course', 'udemy', 'coursera', 'platzi', 'datacamp']
  };

  if (keywords.exp.some(k => lowerInput.includes(k))) {
    return content.experience.map(e => `${e.period}: ${e.role} @ ${e.company}`).join('\n');
  }
  if (keywords.proj.some(k => lowerInput.includes(k))) {
    return lang === 'es' 
      ? "He trabajado en dashboards, sitios web y asistentes IA. Escribe 'proyectos' para ver más."
      : "I've worked on dashboards, websites, and AI assistants. Type 'projects' to see more.";
  }
  if (keywords.tech.some(k => lowerInput.includes(k))) {
    return `Stack: ${content.skills.map(s => s.name).join(', ')}.`;
  }
  if (keywords.contact.some(k => lowerInput.includes(k))) {
    return `${lang === 'es' ? 'Escríbeme a' : 'Email me at'}: ${content.personal.email}`;
  }
  if (keywords.cert.some(k => lowerInput.includes(k))) {
      return content.certificates.map(c => `- ${c.title} (${c.issuer})`).join('\n');
  }
  
  return lang === 'es'
    ? "Comando no reconocido. Intenta: 'experiencia', 'proyectos', 'certificados', 'stack'."
    : "Command not recognized. Try: 'experience', 'projects', 'certificates', 'stack'.";
};