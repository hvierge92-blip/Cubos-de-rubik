import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart, MapPin, Truck, ShieldAlert, Sparkles, ShoppingBag, Radio, ArrowRight, ArrowLeftRight, CheckCircle2 } from "lucide-react";

export default function SolidarityView() {
  const [salesGoal, setSalesGoal] = useState<number>(150);

  // Stats calculation based on simulated sales
  const donationAmount = salesGoal * 1.00;
  const foodKilos = salesGoal * 0.75;
  const vaccinesDoses = Math.floor(salesGoal / 12);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-10" id="solidarity-root-container">
      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative border border-cyber-magenta/30 bg-neutral-950 p-6 sm:p-8 overflow-hidden"
        style={{ borderRadius: "0px" }}
        id="solidarity-hero-banner"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyber-magenta/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyber-magenta/10 border border-cyber-magenta/20 text-cyber-magenta font-mono text-[10px] tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 animate-pulse" />
            <span>Campaña Solidaria Alavesa</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Rompe la forma, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-cyan-dim to-cyber-magenta">
              ORDENA EL CAOS EN SUS VIDAS
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
            Por cada unidad que compres de nuestros cubos de diseño escultórico inspirado en el <strong className="text-white">American Staffordshire</strong>, donamos <span className="text-cyber-magenta font-bold">1,00€ íntegro</span> a la protectora de animales y tienda de mascotas <strong className="text-cyber-cyan">Indartxu</strong>, dirigida por la hermana del fundador.
          </p>
        </div>
      </motion.div>

      {/* Grid of logistics and local strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="solidarity-strategy-grid">
        {/* Logistics Detail Card */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border border-gray-900 bg-black p-6 space-y-5 flex flex-col justify-between"
          style={{ borderRadius: "0px" }}
          id="logistics-detail-card"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
              <MapPin className="w-5 h-5 text-cyber-cyan" />
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                Logística Inteligente Álava
              </h3>
            </div>

            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              La sede física de la protectora y tienda <strong className="text-white">Indartxu</strong> se encuentra en el hermoso municipio de <strong className="text-cyber-cyan">Murgia</strong> (Álava), un entorno natural perfecto para la recuperación de los animales, pero algo apartado para el día a día urbano.
            </p>

            {/* Hub Connections diagram */}
            <div className="bg-neutral-950 border border-gray-900 p-4 space-y-4 font-mono text-[11px]">
              <div className="flex justify-between items-center text-gray-500 border-b border-gray-900 pb-2 text-[10px]">
                <span>CENTRAL (MURGIA)</span>
                <ArrowLeftRight className="w-4 h-4 text-cyber-magenta animate-pulse" />
                <span>PUNTO DE ENTREGA (VITORIA)</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 mt-1 bg-cyber-magenta rounded-full" />
                  <div>
                    <span className="text-white font-bold block">Sede Central y Refugio • Murgia</span>
                    <span className="text-gray-500 block text-[10px]">Sede de Indartxu, control de stock y acogida animal.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 mt-1 bg-cyber-cyan rounded-full" />
                  <div>
                    <span className="text-cyber-cyan font-bold block">Punto de Recogida Gratuito • Vitoria-Gasteiz</span>
                    <span className="text-gray-500 block text-[10px]">Punto de entrega colaborador para evitar el desplazamiento largo.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyber-cyan/5 border border-cyber-cyan/20 p-3.5 text-xs font-sans text-gray-300 leading-normal">
            <span className="text-cyber-cyan font-mono text-[10px] font-bold block uppercase mb-1">💡 Ventaja de Proximidad</span>
            Al comprar tu cubo, puedes seleccionar <strong className="text-white">"Recogida Gratuita en Vitoria Centro"</strong>. Recoges el producto sin gastos de envío y apoyas el refugio de Murgia de forma totalmente cómoda.
          </div>
        </motion.div>

        {/* Dynamic Impact Calculator */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-gray-900 bg-black p-6 space-y-6 flex flex-col justify-between"
          style={{ borderRadius: "0px" }}
          id="impact-calculator-card"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
              <Sparkles className="w-5 h-5 text-cyber-magenta" />
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                Simulador de Impacto Directo
              </h3>
            </div>

            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Utiliza el control interactivo para estimar la donación solidaria acumulada en base al volumen de ventas mensuales proyectado en Álava:
            </p>

            <div className="space-y-2 bg-neutral-950 p-4 border border-gray-900">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-gray-400">Proyección de Ventas:</span>
                <span className="text-cyber-cyan font-bold">{salesGoal} unidades</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                value={salesGoal}
                onChange={(e) => setSalesGoal(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyber-magenta"
                id="solidarity-sales-slider"
              />
              <div className="flex justify-between font-mono text-[9px] text-gray-600">
                <span>10 cubos</span>
                <span>500 cubos</span>
              </div>
            </div>

            {/* Impact stats columns */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-neutral-900 p-2.5 border border-gray-900 space-y-1">
                <span className="font-mono text-[9px] text-cyber-magenta block uppercase font-bold">Donación</span>
                <span className="font-display text-sm sm:text-base font-black text-white">{donationAmount.toFixed(2)}€</span>
                <span className="font-sans text-[8px] text-gray-500 block leading-none">1€ por unidad</span>
              </div>
              <div className="bg-neutral-900 p-2.5 border border-gray-900 space-y-1">
                <span className="font-mono text-[9px] text-cyber-cyan block uppercase font-bold">Pienso Premium</span>
                <span className="font-display text-sm sm:text-base font-black text-white">{foodKilos.toFixed(1)} kg</span>
                <span className="font-sans text-[8px] text-gray-500 block leading-none">0.75 kg por unidad</span>
              </div>
              <div className="bg-neutral-900 p-2.5 border border-gray-900 space-y-1">
                <span className="font-mono text-[9px] text-cyber-green block uppercase font-bold">Médico Canino</span>
                <span className="font-display text-sm sm:text-base font-black text-white">{vaccinesDoses} dosis</span>
                <span className="font-sans text-[8px] text-gray-500 block leading-none">Vacunas y desparasitado</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-950 border border-gray-900 p-3 flex gap-2.5 items-center">
            <CheckCircle2 className="w-5 h-5 text-cyber-green flex-shrink-0" />
            <p className="font-sans text-[11px] text-gray-400 leading-snug">
              Toda la comida y las vacunas se gestionan directamente a través de <strong className="text-white">Indartxu Murgia</strong> para asegurar que lleguen de inmediato a los perros en adopción.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Info list of commitments */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="border border-gray-900 bg-neutral-950 p-6 space-y-6"
        style={{ borderRadius: "0px" }}
        id="solidarity-commitments"
      >
        <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
          <Radio className="w-5 h-5 text-cyber-magenta animate-pulse" />
          <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
            Nuestros Compromisos de Transparencia
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans text-xs">
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] text-cyber-cyan font-bold block uppercase">1. Donación Íntegra Sin Letra Pequeña</span>
            <p className="text-gray-400 leading-relaxed">
              No donamos "un porcentaje de los beneficios". Donamos exactamente 1,00€ íntegro de cada venta de 29,99€ directamente. Es fácil de auditar, transparente y directo.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[10px] text-cyber-magenta font-bold block uppercase">2. Apoyo al Refugio Indartxu</span>
            <p className="text-gray-400 leading-relaxed">
              La labor de la protectora de animales de mi hermana en Murgia se centra principalmente en perros de razas como Staffordshire y mestizos, ofreciéndoles cuidados y buscando adoptantes responsables.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[10px] text-cyber-green font-bold block uppercase">3. Punto de Entrega en Vitoria</span>
            <p className="text-gray-400 leading-relaxed">
              Estableciendo un punto neurálgico en Vitoria-Gasteiz centro facilitamos que cualquier fan del speedcubing colabore activamente sin barreras de distancia geográfica ni costes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
