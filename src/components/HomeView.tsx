import { motion } from "motion/react";
import { ArrowRight, ShoppingCart, MessageSquare, Terminal, Users, Cpu, ShieldAlert } from "lucide-react";
import { PRODUCTS, Product } from "../data";

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function HomeView({ onNavigate, onAddToCart, onSelectProduct }: HomeViewProps) {
  // We've got 3 main products in the catalog
  const featuredProducts = PRODUCTS;

  return (
    <div className="w-full space-y-16 py-6 pb-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-3xl mx-auto px-4 mt-8">
        <div className="inline-block border border-cyber-cyan-dim bg-cyber-cyan-dark/20 px-4 py-1.5 text-xs font-mono tracking-widest text-cyber-cyan uppercase">
          SISTEMA DE PRECISIÓN V1.0
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white uppercase">
          CRUBIK: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-cyan-dim to-cyber-magenta">
            REINVENTANDO EL GIRO
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
          className="relative border border-cyber-cyan/30 bg-black overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ borderRadius: "0px" }}
        >
          <img
            src="/src/assets/images/cyber_dog_puzzle_1782733170159.jpg"
            alt="The Cyber-Dog"
            className="w-full aspect-square object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-cyber-cyan bg-black/80 px-2 py-1 tracking-widest border border-cyber-cyan/20">
            MODELO: C-DOG-2077
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
              DRIVING INNOVATION
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
              className="w-full aspect-square bg-neutral-950 overflow-hidden relative cursor-pointer group"
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
                  ${product.price.toFixed(2)}
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
