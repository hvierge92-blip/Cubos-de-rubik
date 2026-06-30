import { useState, useEffect } from "react";
import { Award, Flame, Zap, ShieldCheck, ChevronRight, User, RefreshCw, Volume2, Target, BarChart2 } from "lucide-react";

export default function ProfileView() {
  const [username, setUsername] = useState<string>("SpeedySolver_99");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Local stats state
  const [stats, setStats] = useState({
    solves: 124,
    bestTime: 11.45,
    ao5: 13.82,
    streak: 8,
    rank: "Elite Cuber",
  });

  // Checklist of goals
  const [goals, setGoals] = useState([
    { id: 1, text: "Resolver el Neon 3x3 bajo 15 segundos", done: true },
    { id: 2, text: "Aprender 10 algoritmos de OLL avanzados", done: false },
    { id: 3, text: "Adquirir una pieza cinética Cyber-Dog", done: false },
    { id: 4, text: "Completar racha de 7 días consecutivos", done: true },
    { id: 5, text: "Configurar un perfil biomecánico de giro", done: false },
  ]);

  const toggleGoal = (id: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const handleResetStats = () => {
    if (confirm("¿Estás seguro de que deseas reiniciar todos tus récords y estadísticas? Esta acción es irreversible.")) {
      setStats({
        solves: 0,
        bestTime: 0,
        ao5: 0,
        streak: 1,
        rank: "Candidato",
      });
    }
  };

  return (
    <div className="w-full space-y-8 py-6 pb-24 max-w-4xl mx-auto px-4">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="font-mono text-xs text-cyber-magenta tracking-widest uppercase">
          USER_PROFILE_INTERFACE.EXE
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          PERFIL DE VELOCIDAD
        </h1>
        <p className="font-sans text-sm text-gray-400 max-w-lg mx-auto">
          Monitorea tus estadísticas biomegánicas, ajusta tus preferencias del cronómetro y sigue tus objetivos en tiempo real.
        </p>
      </div>

      {/* Profile Header Card */}
      <div 
        className="border border-cyber-magenta/30 bg-neutral-950 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6"
        style={{ borderRadius: "0px" }}
      >
        <div className="flex items-center gap-5 w-full sm:w-auto">
          <div className="w-16 h-16 bg-neutral-900 border border-cyber-magenta flex items-center justify-center relative">
            <User className="w-8 h-8 text-cyber-magenta" />
            <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 bg-cyber-magenta text-black text-[9px] font-mono font-bold flex items-center justify-center rounded-full border-2 border-neutral-950 animate-pulse">
              LV
            </div>
          </div>

          <div className="space-y-1.5 flex-1 sm:flex-initial">
            <div className="flex items-center gap-2">
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={(e) => { if (e.key === "Enter") setIsEditing(false); }}
                  className="bg-neutral-900 border border-cyber-magenta text-white text-lg font-mono px-2 py-0.5 focus:outline-none w-44"
                />
              ) : (
                <h2 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                  {username}
                </h2>
              )}
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="font-mono text-[9px] text-cyber-magenta border border-cyber-magenta/20 hover:border-cyber-magenta px-2 py-0.5 bg-transparent cursor-pointer"
              >
                {isEditing ? "GUARDAR" : "EDITAR"}
              </button>
            </div>
            <p className="font-mono text-xs text-cyber-cyan font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Rango: {stats.rank}
            </p>
          </div>
        </div>

        {/* Daily Streak Counter */}
        <div className="flex items-center gap-3 bg-cyber-magenta-dark/10 border border-cyber-magenta/20 p-4 w-full sm:w-auto justify-center">
          <Flame className="w-8 h-8 text-cyber-magenta animate-pulse" />
          <div className="text-left font-mono">
            <div className="text-2xl font-extrabold text-white leading-none">{stats.streak} DÍAS</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">RACHA DE SOLUCIÓN</div>
          </div>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-gray-900 bg-neutral-950 p-5 space-y-1 font-mono text-center md:text-left">
          <div className="text-gray-500 text-[10px] uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
            <Zap className="w-3.5 h-3.5 text-cyber-cyan" /> SOLUCIONES
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{stats.solves}</div>
          <div className="text-[9px] text-cyber-cyan uppercase">LOGROS COMPLETADOS</div>
        </div>

        <div className="border border-gray-900 bg-neutral-950 p-5 space-y-1 font-mono text-center md:text-left">
          <div className="text-gray-500 text-[10px] uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
            <Target className="w-3.5 h-3.5 text-cyber-magenta" /> MEJOR SINGLE
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyber-magenta">
            {stats.bestTime > 0 ? `${stats.bestTime.toFixed(2)}s` : "--"}
          </div>
          <div className="text-[9px] text-gray-500 uppercase">RÉCORD PERSONAL</div>
        </div>

        <div className="border border-gray-900 bg-neutral-950 p-5 space-y-1 font-mono text-center md:text-left">
          <div className="text-gray-500 text-[10px] uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
            <BarChart2 className="w-3.5 h-3.5 text-cyber-green" /> PROMEDIO (AO5)
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyber-green">
            {stats.ao5 > 0 ? `${stats.ao5.toFixed(2)}s` : "--"}
          </div>
          <div className="text-[9px] text-gray-500 uppercase">ÚLTIMAS 5 SOLUCIONES</div>
        </div>

        <div className="border border-gray-900 bg-neutral-950 p-5 space-y-1 font-mono text-center md:text-left">
          <div className="text-gray-500 text-[10px] uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-500" /> RENDIMIENTO
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-yellow-500">94.8%</div>
          <div className="text-[9px] text-gray-500 uppercase">EFICIENCIA DE GIROS</div>
        </div>
      </div>

      {/* Main Content Sections split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Goals/Achievements Checklist (7 cols) */}
        <div className="md:col-span-7 border border-gray-900 bg-neutral-950 p-6 space-y-6">
          <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <Target className="w-5 h-5 text-cyber-magenta" /> OBJETIVOS DEL PROTOCOLO
          </h3>

          <div className="space-y-3">
            {goals.map((goal) => (
              <div 
                key={goal.id} 
                onClick={() => toggleGoal(goal.id)}
                className={`flex justify-between items-center p-3 border cursor-pointer transition-all ${
                  goal.done 
                    ? "bg-cyber-cyan-dark/5 border-cyber-cyan/20 text-gray-400 line-through" 
                    : "bg-neutral-950 border-gray-900 text-white hover:border-gray-800"
                }`}
                style={{ borderRadius: "0px" }}
              >
                <span className="font-sans text-xs">{goal.text}</span>
                <div className={`w-4 h-4 border flex items-center justify-center ${
                  goal.done 
                    ? "bg-cyber-cyan border-cyber-cyan text-black" 
                    : "border-gray-800"
                }`}>
                  {goal.done && <span className="text-[10px] font-bold">✔</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Settings & Preferences (5 cols) */}
        <div className="md:col-span-5 border border-gray-900 bg-neutral-950 p-6 space-y-6 font-mono">
          <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
            Configuración
          </h3>

          <div className="space-y-4 text-xs">
            {/* Sound alert switch */}
            <div className="flex justify-between items-center py-2.5 border-b border-gray-900">
              <span className="text-gray-400 flex items-center gap-2 uppercase">
                <Volume2 className="w-4 h-4 text-cyber-cyan" /> Alertar Récord Personal
              </span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`px-3 py-1 font-mono text-[10px] tracking-widest border transition-all cursor-pointer ${
                  soundEnabled 
                    ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan font-bold" 
                    : "border-gray-800 text-gray-500"
                }`}
              >
                {soundEnabled ? "SÍ" : "NO"}
              </button>
            </div>

            {/* Calibration details readout */}
            <div className="space-y-1 py-1.5 border-b border-gray-900">
              <span className="text-gray-500 text-[10px] uppercase">Giro Calibración</span>
              <div className="flex justify-between font-bold text-gray-300">
                <span>MagLev Tensión</span>
                <span>Fórmula 4G</span>
              </div>
            </div>

            <div className="space-y-1 py-1.5 border-b border-gray-900">
              <span className="text-gray-500 text-[10px] uppercase">Sensor Latencia</span>
              <div className="flex justify-between font-bold text-gray-300">
                <span>Pulsaciones</span>
                <span>0.15 ms</span>
              </div>
            </div>

            {/* Reset data */}
            <div className="pt-4">
              <button
                onClick={handleResetStats}
                className="w-full py-2.5 border border-red-600/40 hover:border-red-600 text-red-500 bg-transparent text-xs tracking-wider uppercase font-bold transition-all cursor-pointer"
                style={{ borderRadius: "0px" }}
              >
                <RefreshCw className="w-3.5 h-3.5 inline mr-1.5 animate-spin-slow" />
                Reiniciar Estadísticas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
