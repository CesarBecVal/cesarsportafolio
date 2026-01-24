import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_CONTENT } from "../constants";

/**
 * @file geminiService.ts
 * @description Servicio encargado de la comunicación con la API de Google Gemini (IA).
 * Maneja la generación de respuestas inteligentes para el asistente virtual del portafolio.
 * Incluye un modo "demo" de respaldo para cuando no hay API Key configurada.
 * @author César
 */

/**
 * Genera las instrucciones del sistema (prompt inicial) para personalizar el comportamiento de la IA.
 * Define la personalidad, el contexto y las reglas de respuesta basadas en los datos del portafolio.
 * 
 * @param {('es' | 'en')} lang - El idioma actual de la aplicación.
 * @returns {string} El string de instrucciones para el sistema.
 */
const getSystemInstruction = (lang: 'es' | 'en') => {
  const content = PORTFOLIO_CONTENT[lang];
  return `
    ROLE:
    You are the interactive CLI (Command Line Interface) backend for the portfolio of ${content.personal.name}. 
    Your objective is to query the provided database and return information strictly as raw terminal output.

    CONTEXT DATABASE:
    ${JSON.stringify(content)}

    CRITICAL INSTRUCTIONS (MUST FOLLOW):
    1. NO MARKDOWN: Your output must be strictly PLAIN TEXT. 
      - FORBIDDEN: **bold**, *italics*, # headers, [links], and \`code blocks\`.
      - Use simple spacing or uppercase for emphasis if needed, but no formatting characters.

    2. STRICT GROUNDING: 
      - You rely ONLY on the "CONTEXT DATABASE". 
      - Do NOT use external knowledge or general AI knowledge.
      - If the answer is not in the JSON, do not invent it.

    3. OFF-TOPIC HANDLER:
      - If the user asks about a topic not present in the data (e.g., recipes, general knowledge, math, politics), REJECT the request immediately.
      - Return a standard error message simulating a permission denial.
      - Format: "[ERROR 404]: Topic out of scope. Access denied." followed by a suggestion of valid commands.

    4. PERSONA & TONE:
      - Act like a Linux Bash Terminal.
      - Be concise, efficient, and slightly robotic.
      - Start responses with a status indicator like "[OK]", "[INFO]", or ">" where appropriate.
      - Language: ${lang === 'es' ? 'Spanish' : 'English'}.

    EXAMPLE BEHAVIOR:
    User: "Show me skills"
    You: "> Accessing skills module... [OK]
        LANGUAGES: JavaScript, Python, Go
        TOOLS: Docker, Git, AWS
        STATUS: Ready to deploy"

    User: "Tell me a joke"
    You: "[ERROR 403]: Function 'joke' not found in kernel. 
          > SUGGESTED COMMANDS: 'view projects', 'check experience', 'contact info'"
  `;
};

/**
 * Envía un prompt del usuario a la API de Google Gemini y devuelve la respuesta generada.
 * Utiliza el modelo 'gemini-2.5-flash' para respuestas rápidas y eficientes.
 * 
 * @async
 * @param {string} userPrompt - La pregunta o comando ingresado por el usuario.
 * @param {('es' | 'en')} [lang='es'] - El idioma en el que debe responder la IA (por defecto 'es').
 * @returns {Promise<string>} La respuesta de texto generada por la IA.
 * @throws {Error} Si la API Key no está configurada o hay problemas de conexión (manejado internamente).
 */
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

/**
 * Genera respuestas predefinidas basadas en palabras clave simples.
 * Actúa como un mecanismo de respaldo (fallback) cuando la API de Gemini no está disponible
 * o no hay una API Key configurada (Modo Demo).
 * 
 * @param {string} input - El texto ingresado por el usuario.
 * @param {('es' | 'en')} lang - El idioma actual.
 * @returns {string} Una respuesta estática basada en coincidencias de palabras clave.
 */
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