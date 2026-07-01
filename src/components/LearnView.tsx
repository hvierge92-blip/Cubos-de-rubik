import { useState, useEffect, useRef } from "react";
import { ALGORITHMS, Algorithm } from "../data";
import { Search, Play, Pause, RotateCcw, ChevronRight, Sparkles, Trophy, HelpCircle, Check, Flame } from "lucide-react";

export default function LearnView() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  
  // Selected algorithm for practice
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm>(ALGORITHMS[0]);
  
  // Step-by-step interactive player
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const movesArray = selectedAlgo.notation.split(" ");

  // Timer/Chronomoter for practice
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [savedTimes, setSavedTimes] = useState<{ [algoId: string]: number[] }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved times from localStorage
  useEffect(() => {
    const cached = localStorage.getItem("crubik_saved_times");
    if (cached) {
      try {
        setSavedTimes(JSON.parse(cached));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const handleStartStopTimer = () => {
    if (isTimerRunning) {
      // Stopping: Save time
      setIsTimerRunning(false);
      const currentTimes = savedTimes[selectedAlgo.id] || [];
      const updatedTimes = [time, ...currentTimes].slice(0, 5); // Keep last 5 times
      const newSavedTimes = { ...savedTimes, [selectedAlgo.id]: updatedTimes };
      setSavedTimes(newSavedTimes);
      localStorage.setItem("crubik_saved_times", JSON.stringify(newSavedTimes));
    } else {
      // Starting: Reset and run
      setTime(0);
      setIsTimerRunning(true);
    }
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTime(0);
  };

  const clearTimes = () => {
    const newSavedTimes = { ...savedTimes, [selectedAlgo.id]: [] };
    setSavedTimes(newSavedTimes);
    localStorage.setItem("crubik_saved_times", JSON.stringify(newSavedTimes));
  };

  // Filter algorithms
  const filteredAlgos = ALGORITHMS.filter((algo) => {
    const matchesCategory = activeCategory === "ALL" || algo.category === activeCategory;
    const cleanQuery = searchQuery.trim().toLowerCase();
    const matchesSearch =
      cleanQuery === "" ||
      algo.name.toLowerCase().includes(cleanQuery) ||
      algo.notation.toLowerCase().includes(cleanQuery);
    const matchesDifficulty =
      filterDifficulty === "all" || algo.difficulty.toLowerCase() === filterDifficulty.toLowerCase();

    return matchesCategory && matchesSearch && matchesDifficulty;
  });

  // Format milliseconds to mm:ss.SS
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    const minutesStr = minutes > 0 ? `${minutes}:` : "";
    const secondsStr = seconds.toString().padStart(minutes > 0 ? 2 : 1, "0");
    const centiStr = centiseconds.toString().padStart(2, "0");

    return `${minutesStr}${secondsStr}.${centiStr}s`;
  };

  const handleSelectAlgo = (algo: Algorithm) => {
    setSelectedAlgo(algo);
    setCurrentStepIndex(-1);
    setIsTimerRunning(false);
    setTime(0);
  };

  return (
    <div className="w-full space-y-8 py-6 pb-24 max-w-4xl mx-auto px-4">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="font-mono text-xs text-cyber-green tracking-widest uppercase">
          ALGORITHM_GUIDE_DATABASE.EXE
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          CENTRO DE ENTRENAMIENTO
        </h1>
        <p className="font-sans text-sm text-gray-400 max-w-lg mx-auto">
          Explora nuestra biblioteca de algoritmos de alto rendimiento con simulador de secuencias interactivo y cronómetro integrado.
        </p>
      </div>

      {/* Main Grid: Interactive panel & list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Algorithm Trainer/Simulator (7 cols on large screens) */}
        <div className="lg:col-span-7 space-y-6">
          <div 
            className="border border-cyber-cyan/30 bg-neutral-950 p-6 space-y-6"
            style={{ borderRadius: "0px" }}
          >
            <div className="flex justify-between items-start border-b border-gray-900 pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-cyber-cyan uppercase tracking-wider">
                  CASO EN ENTRENAMIENTO: {selectedAlgo.category}
                </span>
                <h2 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                  {selectedAlgo.name}
                </h2>
              </div>
              <span className={`px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase border ${
                selectedAlgo.difficulty === "Principiante"
                  ? "border-cyber-green text-cyber-green bg-cyber-green/5"
                  : selectedAlgo.difficulty === "Intermedio"
                  ? "border-yellow-500 text-yellow-500 bg-yellow-500/5"
                  : "border-cyber-magenta text-cyber-magenta bg-cyber-magenta/5"
              }`}>
                {selectedAlgo.difficulty}
              </span>
            </div>

            {/* Simulated Cube Move Indicator */}
            <div className="bg-[#0b0b0c] border border-gray-900 p-8 flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
              <div className="absolute top-3 left-3 font-mono text-[9px] text-gray-600">VISUALIZADOR DE MOVIMIENTOS</div>
              
              {/* Giant graphic placeholder that highlights currently selected rotation */}
              <div className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-cyber-cyan/20 rounded-full relative">
                <span className="text-4xl font-display font-extrabold text-cyber-cyan tracking-wider drop-shadow-[0_0_10px_rgba(0,245,255,0.4)]">
                  {currentStepIndex >= 0 ? movesArray[currentStepIndex] : "GO"}
                </span>
                
                {/* Micro indicators representing face orientation */}
                <div className="absolute -top-3 px-2 py-0.5 bg-black border border-gray-900 font-mono text-[8px] text-gray-400">UP</div>
                <div className="absolute -bottom-3 px-2 py-0.5 bg-black border border-gray-900 font-mono text-[8px] text-gray-400">DOWN</div>
                <div className="absolute -right-5 px-2 py-0.5 bg-black border border-gray-900 font-mono text-[8px] text-gray-400 rotate-90">RIGHT</div>
                <div className="absolute -left-5 px-2 py-0.5 bg-black border border-gray-900 font-mono text-[8px] text-gray-400 -rotate-90">LEFT</div>
              </div>

              {/* Slider / steps bar */}
              <div className="w-full space-y-2">
                <div className="flex flex-wrap justify-center gap-1.5 font-mono text-sm">
                  {movesArray.map((move, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStepIndex(idx)}
                      className={`px-2 py-1 transition-all ${
                        idx === currentStepIndex
                          ? "bg-cyber-cyan text-black font-extrabold"
                          : "bg-neutral-900 text-gray-400 border border-gray-950 hover:text-white"
                      }`}
                      style={{ borderRadius: "0px" }}
                    >
                      {move}
                    </button>
                  ))}
                </div>
                <p className="font-mono text-[10px] text-gray-500 text-center pt-2">
                  {currentStepIndex === -1 
                    ? "Haz clic en una rotación arriba o presiona Siguiente Paso para comenzar." 
                    : `Giro ${currentStepIndex + 1} de ${movesArray.length}: Rotar cara "${movesArray[currentStepIndex]}"`
                  }
                </p>
              </div>

              {/* Step Controls */}
              <div className="flex gap-2 w-full pt-2">
                <button
                  onClick={() => setCurrentStepIndex(Math.max(-1, currentStepIndex - 1))}
                  disabled={currentStepIndex === -1}
                  className="flex-1 py-2 border border-gray-800 text-xs font-mono text-white hover:border-gray-500 disabled:opacity-30 disabled:pointer-events-none uppercase"
                  style={{ borderRadius: "0px" }}
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentStepIndex(-1)}
                  className="px-3 py-2 border border-gray-800 text-xs font-mono text-gray-500 hover:text-white uppercase"
                  style={{ borderRadius: "0px" }}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentStepIndex(Math.min(movesArray.length - 1, currentStepIndex + 1))}
                  disabled={currentStepIndex === movesArray.length - 1}
                  className="flex-1 py-2 bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan text-xs font-mono font-bold hover:bg-cyber-cyan hover:text-black disabled:opacity-30 disabled:pointer-events-none uppercase"
                  style={{ borderRadius: "0px" }}
                >
                  Siguiente
                </button>
              </div>
            </div>

            {/* Custom Interactive Speed Benchmarking chronometer */}
            <div className="border border-gray-900 bg-neutral-950 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-cyber-magenta tracking-wider uppercase flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-cyber-magenta animate-pulse" />
                  CRONÓMETRO DE PRÁCTICA
                </span>
                <span className="font-mono text-[9px] text-gray-600">SISTEMA BENCHMARK</span>
              </div>

              <div className="flex flex-col items-center py-4 space-y-4">
                <div className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                  {formatTime(time)}
                </div>

                <div className="flex gap-2 w-full max-w-xs">
                  <button
                    onClick={handleStartStopTimer}
                    className={`flex-1 py-2.5 font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5 ${
                      isTimerRunning
                        ? "bg-red-600 text-white hover:bg-red-500"
                        : "bg-cyber-magenta text-black hover:bg-cyber-magenta-dim"
                    }`}
                    style={{ borderRadius: "0px" }}
                  >
                    {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {isTimerRunning ? "Detener" : "Iniciar"}
                  </button>

                  <button
                    onClick={handleResetTimer}
                    className="px-4 py-2.5 bg-neutral-900 border border-gray-800 text-gray-400 hover:text-white font-mono text-xs uppercase"
                    style={{ borderRadius: "0px" }}
                  >
                    Reiniciar
                  </button>
                </div>
              </div>

              {/* Saved sessions times logs */}
              <div className="border-t border-gray-900 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-[10px] text-gray-500 uppercase">Tiempos Guardados (Este Caso)</span>
                  {(savedTimes[selectedAlgo.id] || []).length > 0 && (
                    <button
                      onClick={clearTimes}
                      className="font-mono text-[9px] text-red-500 hover:underline bg-transparent border-0 cursor-pointer"
                    >
                      Borrar
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(savedTimes[selectedAlgo.id] || []).length === 0 ? (
                    <span className="font-mono text-[10px] text-gray-600">Sin registros guardados. ¡Activa el cronómetro y deténlo para registrar!</span>
                  ) : (
                    (savedTimes[selectedAlgo.id] || []).map((t, idx) => (
                      <span key={idx} className="font-mono text-xs bg-neutral-900 border border-gray-900 px-2.5 py-1 text-gray-300 flex items-center gap-1">
                        {idx === 0 && <Trophy className="w-3 h-3 text-yellow-500" />}
                        {formatTime(t)}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Algorithm catalog listing (5 cols on large screens) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Controls Panel */}
          <div className="border border-gray-800 bg-neutral-950 p-4 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por caso o secuencia..."
                className="w-full bg-neutral-900 border border-gray-800 text-xs py-2.5 pl-10 pr-4 font-mono text-white focus:outline-none focus:border-cyber-cyan placeholder-gray-600"
                style={{ borderRadius: "0px" }}
              />
            </div>

            {/* Filter difficulty */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-gray-500 uppercase">FILTRAR POR:</span>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="bg-neutral-900 border border-gray-800 font-mono text-[10px] text-white px-2.5 py-1.5 focus:outline-none focus:border-cyber-cyan"
                style={{ borderRadius: "0px" }}
              >
                <option value="all">TODAS LAS DIFICULTADES</option>
                <option value="principiante">PRINCIPIANTE</option>
                <option value="intermedio">INTERMEDIO</option>
                <option value="avanzado">AVANZADO</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 border-b border-gray-900 pb-2">
            {["ALL", "F2L", "OLL", "PLL", "Crux"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-colors ${
                  activeCategory === cat
                    ? "border-b-2 border-cyber-green text-cyber-green bg-cyber-green/5"
                    : "text-gray-400 hover:text-white"
                }`}
                style={{ borderRadius: "0px" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Algorithm List Container */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredAlgos.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-900 font-mono text-xs text-gray-500">
                Ningún algoritmo coincide con la búsqueda.
              </div>
            ) : (
              filteredAlgos.map((algo) => (
                <div
                  key={algo.id}
                  onClick={() => handleSelectAlgo(algo)}
                  className={`border p-4 cursor-pointer transition-all ${
                    selectedAlgo.id === algo.id
                      ? "bg-neutral-900 border-cyber-cyan/50 shadow-[0_0_10px_rgba(0,245,255,0.05)]"
                      : "bg-neutral-950/40 border-gray-900 hover:border-gray-800 hover:bg-neutral-900/10"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-0.5">
                      <span className="font-mono text-[9px] text-cyber-green font-bold uppercase tracking-widest bg-cyber-green/5 border border-cyber-green/10 px-1.5 py-0.5">
                        {algo.category}
                      </span>
                      <h3 className="font-display text-sm font-bold text-white uppercase tracking-tight mt-1.5">
                        {algo.name}
                      </h3>
                    </div>
                    <span className="font-mono text-[9px] text-gray-500 uppercase">{algo.difficulty}</span>
                  </div>

                  <p className="font-mono text-xs text-cyber-cyan font-bold bg-[#0a0a0b] p-2 border border-gray-950 truncate">
                    {algo.notation}
                  </p>

                  <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2.5 mt-2 border-t border-gray-950 font-mono">
                    <span>GIROS: {algo.stats.moves}</span>
                    <span>VELOCIDAD: {algo.stats.speed}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
