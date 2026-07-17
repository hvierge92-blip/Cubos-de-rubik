import React from "react";
import { motion } from "motion/react";
import { ShoppingCart, Check, Ban, Clock, Award, ShieldCheck, Heart, ArrowLeft } from "lucide-react";

interface ProductPageProps {
  name: string;
  price: number;
  image: string;
  availability: "Disponible" | "Agotado" | "Próximamente";
  onAddToCart?: () => void;
  onClose?: () => void;
}

export default function ProductPage({
  name,
  price,
  image,
  availability,
  onAddToCart,
  onClose
}: ProductPageProps) {
  
  // Neon colors
  const neonPink = "#FF3EA6";
  const neonCian = "#35D8FF";

  const isAvailable = availability === "Disponible";
  const isAgotado = availability === "Agotado";
  const isProximamente = availability === "Próximamente";

  // Features list as required: Puzzle 3x3, Tacto premium, Acabado mate
  const features = [
    "Puzzle 3x3 Escultórico",
    "Tacto premium ultra suave",
    "Acabado mate de alta resistencia"
  ];

  return (
    <div className="w-full bg-[#08080A] text-white py-8 px-4 sm:px-6 md:px-8 border border-neutral-900 shadow-2xl relative overflow-hidden">
      {/* Grid Pattern Background for a high-tech vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40"></div>
      
      {/* Decorative ambient neon glows */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ backgroundColor: neonCian }}
      ></div>
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-25"
        style={{ backgroundColor: neonPink }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="mb-6 flex items-center gap-2 font-mono text-xs text-gray-400 hover:text-[#35D8FF] transition-colors cursor-pointer group uppercase border border-neutral-800 hover:border-[#35D8FF]/30 px-3 py-1.5 bg-black/60"
            style={{ borderRadius: "0px" }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Listado</span>
          </button>
        )}
        
        {/* Outline / Neon Header Logo */}
        <div className="flex flex-col items-center sm:items-start mb-8 border-b border-neutral-900 pb-6">
          <div className="flex items-center gap-3">
            <h1 
              className="font-display text-4xl sm:text-5xl font-black uppercase tracking-wider text-transparent select-none"
              style={{
                WebkitTextStroke: `1.5px ${neonCian}`,
                filter: `drop-shadow(0 0 10px rgba(53, 216, 255, 0.5))`
              }}
            >
              CRUBIK
            </h1>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#FF3EA6] uppercase border border-[#FF3EA6] px-2 py-0.5 shadow-[0_0_8px_rgba(255,62,166,0.2)]">
              PRO HARDWARE
            </span>
          </div>
          <p className="font-mono text-[9px] text-gray-500 tracking-widest uppercase mt-2">
            Mecanizado de precisión para amantes del Speedcubing y el Arte Canino
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Big Product Image */}
          <div className="md:col-span-6 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-square border border-neutral-900 overflow-hidden bg-neutral-950 flex items-center justify-center group"
              style={{
                boxShadow: `0 0 30px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.02)`,
                background: "radial-gradient(circle at 50% 50%, rgba(20, 20, 25, 0.8) 0%, rgba(8, 8, 10, 1) 100%)"
              }}
            >
              {/* Image Border Accent Shadow */}
              <div 
                className="absolute inset-0 border border-transparent group-hover:border-[#35D8FF]/30 transition-colors duration-500 pointer-events-none"
              ></div>

              {/* Tag / Status Overlays */}
              {availability && (
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <div 
                    className="px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase border-2 bg-[#08080A]/90"
                    style={{
                      borderColor: isAvailable ? neonCian : isAgotado ? neonPink : "#F59E0B",
                      color: isAvailable ? neonCian : isAgotado ? neonPink : "#F59E0B",
                      textShadow: `0 0 4px ${isAvailable ? neonCian : isAgotado ? neonPink : "#F59E0B"}`,
                      boxShadow: `0 0 12px rgba(${isAvailable ? "53,216,255" : isAgotado ? "255,62,166" : "245,158,11"}, 0.2)`
                    }}
                  >
                    {availability}
                  </div>
                </div>
              )}

              {/* Product Image */}
              <img
                src={image}
                alt={`Crubik ${name}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Ambient overlay shadows */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-black/30 pointer-events-none" />
            </motion.div>

            {/* Micro-Indicator */}
            <div className="flex gap-1.5 mt-4 justify-center">
              <span className="w-1.5 h-1.5 bg-[#35D8FF] rounded-full animate-ping"></span>
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Vista Escultórica 3D Habilitada</span>
            </div>
          </div>

          {/* Right Column: Details Panel */}
          <div className="md:col-span-6 space-y-6">
            
            {/* Title & Price */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-gray-500 tracking-wider block">GAMA EXCLUSIVA CRUBIK®</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
                Crubik <span className="text-[#35D8FF]" style={{ textShadow: `0 0 10px rgba(53,216,255,0.3)` }}>{name}</span>
              </h2>
              
              <div className="flex items-baseline gap-2 pt-2">
                <span className="font-display text-3xl font-black text-[#FF3EA6]" style={{ textShadow: `0 0 8px rgba(255,62,166,0.3)` }}>
                  {price.toFixed(2)} €
                </span>
                <span className="font-mono text-[10px] text-gray-500">I.V.A. INCLUIDO</span>
              </div>
            </div>

            {/* Neon Border Badges (No Fill) */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div 
                className="px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase border bg-transparent"
                style={{
                  borderColor: neonCian,
                  color: neonCian,
                  boxShadow: `0 0 10px rgba(53, 216, 255, 0.15)`
                }}
              >
                Diseño exclusivo
              </div>
              <div 
                className="px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase border bg-transparent"
                style={{
                  borderColor: neonPink,
                  color: neonPink,
                  boxShadow: `0 0 10px rgba(255, 62, 166, 0.15)`
                }}
              >
                Edición limitada
              </div>
            </div>

            {/* Short Description */}
            <div className="border-y border-neutral-900 py-4 my-2">
              <blockquote className="font-display text-sm font-semibold tracking-wide text-gray-200 border-l-2 border-[#35D8FF] pl-3 italic">
                "Rompe la forma. Ordena el caos."
              </blockquote>
              <p className="font-sans text-xs text-gray-400 leading-relaxed mt-3">
                Un rompecabezas tridimensional totalmente único con la fisionomía artística de la raza {name}. Las juntas de sus bloques están optimizadas para giros rápidos y de baja fricción, sirviendo tanto de estimulante desafío como de pieza de diseño moderno.
              </p>
            </div>

            {/* Characteristics List */}
            <div className="space-y-3">
              <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                CARACTERÍSTICAS TÉCNICAS:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2.5 font-mono text-[11px] text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: neonCian }}></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call To Action Button (CTA) */}
            <div className="pt-4 space-y-3">
              <button
                disabled={!isAvailable}
                onClick={onAddToCart}
                className="w-full py-4 font-mono text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group cursor-pointer"
                style={{
                  borderRadius: "0px",
                  backgroundColor: isAvailable ? neonCian : "#131315",
                  color: isAvailable ? "#000000" : "#555558",
                  border: isAvailable ? `1px solid ${neonCian}` : `1px solid #252528`,
                  boxShadow: isAvailable ? `0 0 20px rgba(53, 216, 255, 0.35)` : "none"
                }}
              >
                {/* Visual hover laser bar inside CTA button */}
                {isAvailable && (
                  <span className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine pointer-events-none" />
                )}

                {isAvailable ? (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Hazte con el tuyo</span>
                  </>
                ) : isAgotado ? (
                  <>
                    <Ban className="w-4 h-4 text-red-500" />
                    <span>Agotado temporalmente</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Próximamente disponible</span>
                  </>
                )}
              </button>

              {/* Status helper text based on availability */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                {isAvailable ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#35D8FF]" />
                    <span>Envío inmediato desde Álava • 1€ Donado a Indartxu</span>
                  </>
                ) : isAgotado ? (
                  <>
                    <Award className="w-3.5 h-3.5 text-[#FF3EA6]" />
                    <span>Suscríbete a alertas para recibir aviso de re-stock</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Resérvalo contactando con nuestro soporte IA</span>
                  </>
                )}
              </div>
            </div>

            {/* Solidarity Badge Integration */}
            <div className="bg-[#0D0D11]/90 border border-neutral-900 p-3.5 flex items-start gap-3 mt-4">
              <Heart className="w-5 h-5 text-[#FF3EA6] fill-[#FF3EA6]/10 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-[#FF3EA6] font-bold block uppercase tracking-wider">COMPROMISO SOLIDARIO INDARTXU</span>
                <p className="font-sans text-[11px] text-gray-400 leading-normal">
                  Cada compra de la línea Crubik aporta de forma directa <strong className="text-white">1,00€ íntegro</strong> a la protectora de animales <strong className="text-[#35D8FF]">Indartxu</strong>, ayudando a financiar comida y tratamientos médicos para perros rescatados.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
