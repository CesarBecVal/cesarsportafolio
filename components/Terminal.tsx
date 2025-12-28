import React, { useState, useRef, useEffect } from 'react';
import { generateResponse, getDemoResponse } from '../services/geminiService';
import { TERMINAL_COMMANDS } from '../constants';
import { TerminalMessage } from '../types';
import { Terminal, Send, Cpu, XCircle, Wifi, WifiOff } from 'lucide-react';

interface TerminalProps {
    lang: 'es' | 'en';
}

const TerminalComponent: React.FC<TerminalProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize history based on language
  useEffect(() => {
      setHistory([{ 
        id: 'init', 
        type: 'system', 
        content: lang === 'es' 
            ? 'Bienvenido a Portfolio OS v1.0. Escribe "help" para ver comandos o pregunta lo que quieras.' 
            : 'Welcome to Portfolio OS v1.0. Type "help" for commands or just ask anything.', 
        timestamp: Date.now() 
      }]);
  }, [lang]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: TerminalMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: Date.now()
    };

    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const lowerCmd = input.toLowerCase().trim();

    // Native Commands
    if (lowerCmd === TERMINAL_COMMANDS.CLEAR) {
      setHistory([]);
      setIsLoading(false);
      return;
    }
    
    if (lowerCmd === TERMINAL_COMMANDS.HELP) {
      setTimeout(() => {
        setHistory(prev => [...prev, {
          id: Date.now().toString(),
          type: 'system',
          content: lang === 'es'
            ? `Comandos disponibles:\n- help: Ver este menú\n- clear: Limpiar terminal\n\nO pregunta:\n"¿Cuál es tu experiencia?"\n"Háblame de tus proyectos"\n"¿Qué certificaciones tienes?"`
            : `Available commands:\n- help: Show this menu\n- clear: Clear terminal\n\nOr ask:\n"What is your experience?"\n"Tell me about your projects"`,
          timestamp: Date.now()
        }]);
        setIsLoading(false);
      }, 300);
      return;
    }

    // AI or Fallback logic
    // Check if Environment Key is available (Client-side check for UI feedback only)
    const hasKey = !!process.env.API_KEY;
    
    let responseText = '';
    
    if (hasKey) {
      try {
        responseText = await generateResponse(input, lang);
      } catch (err) {
        responseText = lang === 'es' ? "Error del sistema." : "System error.";
      }
    } else {
      // Fallback Mode if no key configured in .env
      responseText = getDemoResponse(input, lang);
      
      if ((responseText.includes('no reconocido') || responseText.includes('not recognized')) && !responseText.includes('[SYSTEM]')) {
         responseText += lang === 'es' 
            ? "\n\n[SYSTEM]: Modo Demo activo. Para IA real, configura API_KEY en .env."
            : "\n\n[SYSTEM]: Demo Mode active. For real AI, configure API_KEY in .env.";
      }
    }

    const aiMsg: TerminalMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: responseText,
      timestamp: Date.now()
    };

    setHistory(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900/90 text-accent border border-accent/30 rounded-full shadow-[0_0_15px_rgba(0,184,217,0.3)] hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 group"
        aria-label="Open AI Terminal"
      >
        {isOpen ? <XCircle size={24} /> : <Terminal size={24} className="animate-pulse-slow" />}
      </button>

      {/* Terminal Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[450px] max-h-[60vh] flex flex-col bg-[#0d1117]/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-40 ring-1 ring-white/10 animate-in slide-in-from-bottom-10 duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Cpu size={14} className="text-accent" />
              <span>user@portfolio:~</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-wider">
                 {process.env.API_KEY ? (
                     <>
                        <Wifi size={12} className="text-green-500" />
                        <span>Online</span>
                     </>
                 ) : (
                     <>
                        <WifiOff size={12} className="text-orange-500" />
                        <span>Demo Mode</span>
                     </>
                 )}
               </div>
            </div>
          </div>

          {/* Output Area */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
          >
            {history.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                <span className={`text-[10px] mb-1 opacity-50 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.type === 'user' ? 'YOU' : msg.type === 'system' ? 'SYSTEM' : 'AI'}
                </span>
                <div className={`p-2 rounded max-w-[85%] whitespace-pre-wrap break-words ${
                    msg.type === 'user' 
                        ? 'bg-slate-800 text-slate-200 rounded-br-none' 
                        : msg.type === 'system'
                        ? 'text-yellow-500/90 italic pl-0'
                        : 'text-accent/90 pl-0'
                }`}>
                    {msg.type !== 'user' && <span className="mr-2 text-accent font-bold">{'>'}</span>}
                    {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
                <div className="flex items-center gap-1 text-accent pl-2">
                    <span>{'>'}</span>
                    <span className="animate-pulse">_</span>
                </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleCommand} className="p-3 bg-slate-800/30 border-t border-slate-700 flex items-center gap-2">
            <span className="text-accent font-bold animate-pulse">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === 'es' ? "Escribe un comando..." : "Type a command..."}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder-slate-600"
              autoFocus
            />
            <button type="submit" disabled={!input.trim()} className="text-slate-400 hover:text-accent disabled:opacity-30 transition-colors">
                <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default TerminalComponent;