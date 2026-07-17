import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ShoppingCart, MessageSquare, Terminal, Users, Cpu, ShieldAlert, Heart, Sparkles, Gift, MapPin, Search, BarChart3, Radio, Brain } from "lucide-react";
import { PRODUCTS, Product } from "../data";
import heroImage from "../assets/images/regenerated_image_1783676215043.png";

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function HomeView({ onNavigate, onAddToCart, onSelectProduct }: HomeViewProps) {
  const [simulatedCubes, setSimulatedCubes] = useState<number>(120);

  // We've got 3 main products in the catalog (excluding the hero product Chihuahua to avoid duplicate visual)
  const featuredProducts = PRODUCTS.filter(product => product.id !== "chihuahua");

  return (
    <div className="w-full space-y-16 py-6 pb-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-3xl mx-auto px-4 mt-8">
        <div className="inline-block border border-cyber-cyan-dim bg-cyber-cyan-dark/20 px-4 py-1.5 text-xs font-mono tracking-widest text-cyber-cyan uppercase">
          SISTEMA DE PRECISIÓN V1.0
        </div>
        
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white uppercase">
          CRUBIK: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-cyan-dim to-cyber-magenta">
            ROMPE LA FORMA, ORDENA EL CAOS
          </span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Ingeniería futurista aplicada al arte del speed-cubing. Descubre la nueva frontera de la resolución mecánica.
        </p>

        <div>
          <button
            onClick={() => onNavigate("shop")}
            className="px-8 py-4 bg-cyber-cyan text-black hover:bg-cyber-cyan-dim font-mono font-bold tracking-widest uppercase transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] border-0"
            style={{ borderRadius: "0px" }}
          >
            COMPRAR AHORA
          </button>
        </div>
      </section>

      {/* Hero Interactive Image Card */}
      <section className="max-w-xl mx-auto px-4">
        <motion.div 
          className="relative border border-cyber-cyan/30 overflow-hidden group cursor-pointer"
          onClick={() => onNavigate("shop")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            borderRadius: "0px",
            background: "radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.45) 0%, rgba(255, 0, 128, 0.08) 50%, transparent 80%), radial-gradient(circle at 80% 70%, rgba(0, 240, 255, 0.42) 0%, rgba(0, 240, 255, 0.08) 50%, transparent 80%), radial-gradient(circle at 50% 50%, rgba(120, 50, 255, 0.15) 0%, transparent 70%), #0d0a16"
          }}
        >
          <img
            src={heroImage}
            alt="Staffordshire 3x3"
            className="w-full aspect-[3/4] object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-cyber-cyan bg-black/80 px-2 py-1 tracking-widest border border-cyber-cyan/20">
            MODELO: CHIHUAHUA
          </div>
        </motion.div>
      </section>

      {/* Catalog Title Section */}
      <section className="max-w-xl mx-auto px-4 pt-4">
        <div className="flex justify-between items-end border-b border-gray-800 pb-3">
          <div className="space-y-1">
            <p className="font-mono text-[10px] tracking-widest text-cyber-magenta uppercase">
              CATÁLOGO DE ÉLITE
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white uppercase">
              AMERICAN STAFFORDSHIRE
            </h2>
          </div>
          <button 
            onClick={() => onNavigate("shop")}
            className="flex items-center gap-1 font-mono text-xs text-cyber-cyan hover:text-white transition-colors uppercase tracking-wider"
          >
            VER TODO <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Product List */}
      <section className="max-w-xl mx-auto px-4 space-y-10">
        {featuredProducts.map((product) => (
          <div 
            key={product.id}
            className="border border-gray-800 bg-cyber-bg hover:border-cyber-cyan/30 transition-all duration-300 relative"
            style={{ borderRadius: "0px" }}
          >
            {/* Tag/Badge inside */}
            {product.tag && (
              <div className="absolute top-4 left-4 z-10 bg-cyber-cyan text-black px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase">
                {product.tag}
              </div>
            )}
            
            {/* Clickable Image Container */}
            <div 
              className="w-full aspect-square overflow-hidden relative cursor-pointer group"
              style={{ background: "radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.45) 0%, rgba(255, 0, 128, 0.08) 50%, transparent 80%), radial-gradient(circle at 80% 70%, rgba(0, 240, 255, 0.42) 0%, rgba(0, 240, 255, 0.08) 50%, transparent 80%), radial-gradient(circle at 50% 50%, rgba(120, 50, 255, 0.15) 0%, transparent 70%), #0d0a16" }}
              onClick={() => onSelectProduct(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>

            {/* Info Footer */}
            <div className="p-6 space-y-4">
              <div className="space-y-1 cursor-pointer" onClick={() => onSelectProduct(product)}>
                <h3 className="font-display text-xl font-bold text-white tracking-tight hover:text-cyber-cyan transition-colors uppercase">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-900">
                <span className="font-mono text-lg font-bold text-cyber-cyan">
                  {product.price.toFixed(2)}€
                </span>
                <button
                  onClick={() => onAddToCart(product)}
                  className="p-3 bg-neutral-900 border border-gray-800 text-white hover:text-black hover:bg-cyber-cyan hover:border-cyber-cyan transition-all duration-300"
                  style={{ borderRadius: "0px" }}
                  title="Añadir al carrito"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Campaña Solidaria Indartxu */}
      <section className="max-w-xl mx-auto px-4">
        <div 
          className="border border-cyber-magenta/30 bg-neutral-950/80 p-6 space-y-6 relative overflow-hidden"
          style={{ borderRadius: "0px" }}
        >
          {/* Subtle glowing background aura */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-magenta/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 border-b border-gray-900 pb-4">
            <div className="p-2.5 bg-cyber-magenta/10 text-cyber-magenta border border-cyber-magenta/20">
              <Heart className="w-6 h-6 fill-cyber-magenta/20 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-widest text-cyber-magenta uppercase block">
                COMPROMISO SOCIAL ACTIVO
              </span>
              <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">
                CRUBIK x INDARTXU
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-sans text-sm text-gray-300 leading-relaxed">
              ¿Sabías que los perros de tipo Stafford o Pitbull suelen ser los que más tiempo pasan en las protectoras? Al tener una fisonomía esculpida e imponente, muchas veces se malinterpreta su nobleza. 
            </p>
            <p className="font-sans text-sm text-gray-300 leading-relaxed font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyber-cyan">
              Por eso, por cada Crubik de 29,99€ que compres, donamos exactamente 1€ directamente a la protectora de animales <span className="text-cyber-cyan">Indartxu</span> para financiar alimentación, tratamientos veterinarios y rescates.
            </p>
            <p className="font-sans text-xs text-gray-400 leading-relaxed italic border-l-2 border-cyber-magenta/40 pl-3">
              "Rompe la forma del cubo, ordena el caos en sus vidas y dales un futuro."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-900">
            <a 
              href="https://indartxu.com/es_es/tienda/"
              target="_blank"
              rel="noreferrer"
              className="flex-1 px-4 py-3 bg-transparent border border-cyber-magenta/40 text-cyber-magenta hover:bg-cyber-magenta hover:text-black font-mono text-xs font-bold text-center tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
              style={{ borderRadius: "0px" }}
            >
              <Sparkles className="w-4 h-4" />
              Visitar Tienda Indartxu
            </a>
            <button
              onClick={() => onNavigate("shop")}
              className="flex-1 px-4 py-3 bg-cyber-cyan text-black hover:bg-cyber-cyan-dim font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border-0"
              style={{ borderRadius: "0px" }}
            >
              <Gift className="w-4 h-4" />
              Adoptar un Crubik
            </button>
          </div>
        </div>
      </section>

      {/* Centro de Estrategia GEO-SEO y Marketing Vitoria-Gasteiz */}
      <section className="max-w-xl mx-auto px-4">
        <div 
          className="border border-cyber-cyan/30 bg-neutral-950/80 p-6 space-y-6 relative overflow-hidden"
          style={{ borderRadius: "0px" }}
        >
          {/* Subtle decoration */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-gray-900 pb-4">
            <div className="p-2.5 bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-widest text-cyber-cyan uppercase block">
                VITORIA-GASTEIZ • PLAN SOLIDARIO
              </span>
              <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">
                ESTRATEGIA SOLIDARIA
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-sans text-xs text-gray-300 leading-relaxed">
              Ajusta el volumen de ventas simulado en la provincia de <strong className="text-cyber-cyan">Álava</strong> para calcular la ayuda directa y las raciones que recibirá la protectora de animales <strong className="text-cyber-magenta">Indartxu</strong>:
            </p>

            {/* Slider Input */}
            <div className="space-y-2 bg-neutral-900/40 p-4 border border-gray-900">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-gray-400">Cubos Crubik Vendidos:</span>
                <span className="text-cyber-cyan font-bold">{simulatedCubes} uds.</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                value={simulatedCubes}
                onChange={(e) => setSimulatedCubes(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
              />
              <div className="flex justify-between font-mono text-[9px] text-gray-600">
                <span>10 cubos</span>
                <span>500 cubos</span>
              </div>
            </div>

            {/* Impact Indicators */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-neutral-900/60 p-3 border border-gray-900 text-center space-y-1">
                <span className="font-mono text-xs text-cyber-magenta block uppercase font-bold">Donación</span>
                <span className="font-display text-sm font-black text-white">{simulatedCubes},00€</span>
                <span className="font-sans text-[9px] text-gray-500 block leading-tight">1€ íntegro por cada unidad</span>
              </div>
              <div className="bg-neutral-900/60 p-3 border border-gray-900 text-center space-y-1">
                <span className="font-mono text-xs text-cyber-cyan block uppercase font-bold">Comida</span>
                <span className="font-display text-sm font-black text-white">{(simulatedCubes * 0.75).toFixed(0)} kg</span>
                <span className="font-sans text-[9px] text-gray-500 block leading-tight">Pienso premium para perros</span>
              </div>
              <div className="bg-neutral-900/60 p-3 border border-gray-900 text-center space-y-1">
                <span className="font-mono text-xs text-cyber-green block uppercase font-bold">Vacunas</span>
                <span className="font-display text-sm font-black text-white">{Math.floor(simulatedCubes / 12)} dosis</span>
                <span className="font-sans text-[9px] text-gray-500 block leading-tight">Atención médica completa</span>
              </div>
            </div>

            <div className="bg-neutral-900/20 p-3 border-l-2 border-cyber-magenta/40 text-[11px] font-sans text-gray-400">
              <span className="text-cyber-magenta font-mono text-[10px] font-bold block uppercase mb-1">💡 Sinergia de Distribución en Álava</span>
              Como la tienda física de tu hermana (<strong className="text-white">Indartxu</strong>) está en <strong className="text-white">Murgia</strong> y puede resultar lejana para el público de la ciudad, establecer un <strong className="text-white">Punto de Entrega Colaborativo en Vitoria-Gasteiz</strong> para recogida gratuita soluciona este inconveniente. Esto te permite captar el tráfico masivo de la capital sin costes de envío para tus clientes, mientras centralizas el stock solidario y las operaciones en la sede de Murgia. ¡Es la combinación estratégica perfecta!
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios para tu mente y salud */}
      <section className="max-w-xl mx-auto px-4">
        <div 
          className="border border-cyber-cyan/30 bg-neutral-950/80 p-6 space-y-6 relative overflow-hidden"
          style={{ borderRadius: "0px" }}
        >
          {/* Subtle glowing background aura */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 border-b border-gray-900 pb-4">
            <div className="p-2.5 bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
              <Brain className="w-6 h-6 text-cyber-green animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-widest text-cyber-green uppercase block">
                BENEFICIOS MENTALES & SALUD
              </span>
              <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">
                Beneficios para tu mente y salud
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[#0b0b0c] p-4 border border-gray-900 hover:border-cyber-cyan/30 transition-all flex gap-3 items-start">
              <span className="font-mono text-xs text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 px-2 py-0.5 mt-0.5 font-bold">01</span>
              <div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">Memoria</h4>
                <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                  Potencia la retención espacial y la memoria muscular mediante el aprendizaje y ejecución fluida de secuencias complejas.
                </p>
              </div>
            </div>

            <div className="bg-[#0b0b0c] p-4 border border-gray-900 hover:border-cyber-magenta/30 transition-all flex gap-3 items-start">
              <span className="font-mono text-xs text-cyber-magenta bg-cyber-magenta/10 border border-cyber-magenta/20 px-2 py-0.5 mt-0.5 font-bold">02</span>
              <div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">Atención y Concentración</h4>
                <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                  Entrena el enfoque absoluto y el estado de flujo (flow state), filtrando las distracciones del entorno para un rendimiento pico.
                </p>
              </div>
            </div>

            <div className="bg-[#0b0b0c] p-4 border border-gray-900 hover:border-cyber-green/30 transition-all flex gap-3 items-start">
              <span className="font-mono text-xs text-cyber-green bg-cyber-green/10 border border-cyber-green/20 px-2 py-0.5 mt-0.5 font-bold">03</span>
              <div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">Coordinación Mano-Ojo y Motricidad Fina</h4>
                <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                  Aumenta la destreza neuromuscular y la velocidad de reacción mediante giros rápidos y precisos a nivel de micras.
                </p>
              </div>
            </div>

            <div className="bg-[#0b0b0c] p-4 border border-gray-900 hover:border-cyber-cyan/30 transition-all flex gap-3 items-start">
              <span className="font-mono text-xs text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 px-2 py-0.5 mt-0.5 font-bold">04</span>
              <div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">Resolución de Problemas y Pensamiento Lógico</h4>
                <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                  Desarrolla habilidades cognitivas de análisis táctico, reconocimiento de patrones tridimensionales y algoritmos de resolución.
                </p>
              </div>
            </div>

            <div className="bg-[#0b0b0c] p-4 border border-gray-900 hover:border-cyber-magenta/30 transition-all flex gap-3 items-start">
              <span className="font-mono text-xs text-cyber-magenta bg-cyber-magenta/10 border border-cyber-magenta/20 px-2 py-0.5 mt-0.5 font-bold">05</span>
              <div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">Salud Cognitiva a Largo Plazo</h4>
                <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                  Mantiene el cerebro joven y plástico, ejercitando múltiples áreas cerebrales simultáneamente como un escudo contra el envejecimiento mental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executable Console Guide widget */}
      <section className="max-w-xl mx-auto px-4">
        <div 
          className="border border-cyber-green/30 bg-[#09090a] overflow-hidden"
          style={{ borderRadius: "0px" }}
        >
          {/* Console Header */}
          <div className="bg-neutral-950 border-b border-cyber-green/20 px-4 py-2 flex justify-between items-center font-mono text-[10px]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="text-gray-500 font-mono tracking-wider">algorithm_guide.exe</span>
          </div>

          {/* Console Body */}
          <div className="p-6 space-y-4">
            <div className="font-mono text-xs text-cyber-green flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              <span>&gt; Inicializando protocolos de resolución elite...</span>
            </div>

            <h3 className="font-display text-2xl font-extrabold text-cyber-green uppercase tracking-tight">
              DOMINA EL CUBO
            </h3>

            <p className="font-sans text-sm text-gray-300 leading-relaxed">
              Accede a nuestra base de datos de algoritmos optimizados para competición. Desde Fridrich (CFOP) hasta técnicas experimentales de Crubik.
            </p>

            <div className="flex gap-4 pt-2 border-t border-cyber-green/10">
              <button
                onClick={() => onNavigate("learn")}
                className="font-mono text-xs font-bold text-cyber-green hover:text-white hover:underline uppercase tracking-wider bg-transparent border-0 cursor-pointer"
              >
                SPEED
              </button>
              <button
                onClick={() => onNavigate("learn")}
                className="font-mono text-xs font-bold text-cyber-green/70 hover:text-white hover:underline uppercase tracking-wider bg-transparent border-0 cursor-pointer"
              >
                EFFICIENCY
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ÚNETE A LA ÉLITE Community Section */}
      <section className="max-w-xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-display text-3xl font-extrabold text-white tracking-tight uppercase">
          ÚNETE A LA ÉLITE
        </h2>
        <p className="font-sans text-sm text-gray-400 leading-relaxed">
          Forma parte de la comunidad de cubers más avanzada del mundo. Comparte tus tiempos, asiste a torneos exclusivos y desbloquea drops limitados.
        </p>

        {/* Community buttons grid */}
        <div className="grid grid-cols-3 gap-3 pt-4">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-4 border border-gray-800 bg-neutral-950/50 hover:border-cyber-cyan/30 hover:bg-neutral-900/40 transition-all duration-300 group"
            style={{ borderRadius: "0px" }}
          >
            <Users className="w-5 h-5 text-gray-400 group-hover:text-cyber-cyan transition-colors mb-2" />
            <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">Discord</span>
          </a>

          <a
            href="https://twitch.tv"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-4 border border-gray-800 bg-neutral-950/50 hover:border-cyber-magenta/30 hover:bg-neutral-900/40 transition-all duration-300 group"
            style={{ borderRadius: "0px" }}
          >
            <Cpu className="w-5 h-5 text-gray-400 group-hover:text-cyber-magenta transition-colors mb-2" />
            <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">Twitch</span>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-4 border border-gray-800 bg-neutral-950/50 hover:border-cyber-green/30 hover:bg-neutral-900/40 transition-all duration-300 group"
            style={{ borderRadius: "0px" }}
          >
            <Terminal className="w-5 h-5 text-gray-400 group-hover:text-cyber-green transition-colors mb-2" />
            <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">Github</span>
          </a>
        </div>
      </section>
    </div>
  );
}
