import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Cpu, Sparkles, HelpCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

interface AiChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiChatAssistant({ isOpen, onClose }: AiChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "⚙️ ¡Conexión establecida con CRUBIK AI GUIDE! Soy tu sistema inteligente de soporte táctico y entrenamiento biomecánico. ¿Tienes preguntas sobre el algoritmo CFOP o deseas calibrar la tensión MagLev de tu cubo Neon 3x3? Indícame tu consulta."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Suggestions for quick entry
  const SUGGESTIONS = [
    "Explícame el método CFOP",
    "¿Qué tecnología tiene el Neon 3x3?",
    "¿Cómo resuelvo el Cyber-Dog?",
    "Algoritmo rápido para PLL"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages([...updatedMessages, { role: "model", content: data.text }]);
      } else {
        setMessages([
          ...updatedMessages,
          {
            role: "model",
            content: "⚠️ [Error de Enlace de Datos] No he podido sincronizar con la red central. Por favor, revisa la consola de telemetría o reintenta en un momento."
          }
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages([
        ...updatedMessages,
        {
          role: "model",
          content: "⚠️ [Fallo de Enlace Satelital] Se ha perdido la conexión con el servidor de IA de Crubik."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Main Panel */}
      <div 
        className="w-full max-w-md bg-neutral-950 border-l border-cyber-cyan/30 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.8)] h-full"
        style={{ borderRadius: "0px" }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-900 flex justify-between items-center bg-black">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-cyber-cyan animate-pulse" />
            <div>
              <span className="font-display text-base font-extrabold text-white uppercase tracking-tight">CRUBIK AI GUIDE</span>
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-cyber-cyan font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                ONLINE (SISTEMA V3.5)
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-900 border border-transparent hover:border-gray-800 text-gray-400 hover:text-white transition-colors"
            style={{ borderRadius: "0px" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin bg-neutral-950">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div className="font-mono text-[9px] text-gray-600 mb-1">
                {msg.role === "user" ? "CUBER_SOLVER" : "CRUBIK_AI_CORE"}
              </div>
              <div 
                className={`p-3.5 max-w-[85%] text-xs leading-relaxed border ${
                  msg.role === "user"
                    ? "bg-cyber-cyan-dark/5 border-cyber-cyan/30 text-white"
                    : "bg-neutral-900/60 border-gray-900 text-gray-300"
                }`}
                style={{ borderRadius: "0px" }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="font-mono text-[9px] text-gray-600 mb-1">CRUBIK_AI_CORE</div>
              <div 
                className="p-3.5 bg-neutral-900/60 border border-gray-900 text-cyber-cyan text-xs flex items-center gap-2"
                style={{ borderRadius: "0px" }}
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Sincronizando con red neuronal...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Block */}
        {messages.length === 1 && !isLoading && (
          <div className="px-6 py-3 bg-[#0a0a0b] border-t border-gray-950">
            <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyber-cyan" /> Consultas Rápidas:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="font-sans text-[11px] text-gray-400 hover:text-cyber-cyan bg-neutral-900 hover:bg-neutral-800 border border-gray-900 hover:border-cyber-cyan/20 px-2.5 py-1 transition-all"
                  style={{ borderRadius: "0px" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Input Bar */}
        <div className="p-4 border-t border-gray-900 bg-black">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(input); }}
              placeholder="Pregunta a la IA sobre CFOP, giros, productos..."
              className="flex-1 bg-neutral-900 border border-gray-800 text-xs py-2.5 px-3 font-mono text-white focus:outline-none focus:border-cyber-cyan placeholder-gray-600"
              style={{ borderRadius: "0px" }}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 bg-cyber-cyan text-black hover:bg-cyber-cyan-dim disabled:bg-gray-800 disabled:text-gray-500 disabled:pointer-events-none font-bold font-mono transition-colors"
              style={{ borderRadius: "0px" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
