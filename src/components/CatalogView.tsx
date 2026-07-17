import React, { useState } from "react";
import { motion } from "motion/react";
import { PRODUCTS, Product } from "../data";
import { ShoppingCart, Heart, Sparkles, X, ChevronRight, Copy, Check, Eye, ArrowLeft } from "lucide-react";
import ProductPage from "./ProductPage";

interface CatalogViewProps {
  onAddToCart: (product: Product) => void;
}

export default function CatalogView({ onAddToCart }: CatalogViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const colors = [
    { name: "Rosa neón", hex: "#FF3EA6", desc: "Acento primario, energía vibrante" },
    { name: "Cian neón", hex: "#35D8FF", desc: "Tono tecnológico, precisión" },
    { name: "Negro violeta", hex: "#0B0A16", desc: "Fondo base, misterio cyberpunk" },
    { name: "Blanco", hex: "#FFFFFF", desc: "Contraste limpio, legibilidad" },
    { name: "Gris lavanda", hex: "#A9A6C9", desc: "Texto secundario, equilibrio suave" }
  ];

  const keywords = [
    "Neón", "Premium", "Cyberpunk", "Edición limitada", "Coleccionable", "Desafío mental", "Nicho friki"
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="w-full space-y-16 py-8 pb-24 max-w-4xl mx-auto px-4">
      
      {/* Brand Identity Header & Moodboard Title */}
      <div className="text-center space-y-4">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          CATÁLOGO DE TIENDA
        </h1>
        <p className="font-sans text-sm text-gray-400 max-w-lg mx-auto">
          Explora la colección exclusiva de rompecabezas Crubik. Diseños a nivel de micras y núcleos magnéticos adaptativos.
        </p>
      </div>

      {/* Actual Product Catalog Grid */}
      <section className="space-y-8">
        <div className="border-b border-neutral-900 pb-3 flex justify-between items-baseline">
          <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">
            PRODUCTO — CATÁLOGO ACTUAL
          </h3>
          <span className="font-mono text-[10px] text-[#35D8FF] tracking-wider uppercase font-bold">
            {PRODUCTS.length} MODELOS EXCLUSIVOS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 pt-2">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer flex flex-col justify-between transition-all"
            >
              {/* Product Card Image Container with Cyberpunk details */}
              <div 
                className="relative aspect-[3/4] overflow-hidden border border-neutral-900 group-hover:border-[#35D8FF]/40 transition-all duration-300"
                style={{ 
                  borderRadius: "0px",
                  background: "radial-gradient(circle at 20% 30%, rgba(255, 62, 166, 0.15) 0%, rgba(255, 62, 166, 0.03) 50%, transparent 80%), radial-gradient(circle at 80% 70%, rgba(53, 216, 255, 0.12) 0%, rgba(53, 216, 255, 0.03) 50%, transparent 80%), #08080A"
                }}
              >
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 bg-black/85 border border-[#35D8FF]/30 text-[#35D8FF] px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase">
                  DISEÑO EXCLUSIVO
                </div>

                {/* Editión Limitada Badge */}
                <div className="absolute bottom-12 left-4 z-10 bg-black/85 border border-[#FF3EA6]/30 text-[#FF3EA6] px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase">
                  EDICIÓN LIMITADA
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(product.id, e)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/75 hover:bg-neutral-900 border border-neutral-850 text-white hover:text-[#FF3EA6] transition-colors cursor-pointer"
                  style={{ borderRadius: "0px" }}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-[#FF3EA6] text-[#FF3EA6]" : ""}`} />
                </button>

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Accept the challenge label */}
                <div className="absolute bottom-4 left-4 z-10 font-mono text-[9px] tracking-wider text-white/50 group-hover:text-white transition-colors">
                  ¿ACEPTAS EL DESAFÍO?
                </div>

                {/* Model badge inside image (as shown in reference mockup design) */}
                <div className="absolute bottom-4 right-4 z-10 font-mono text-[9px] text-[#35D8FF] bg-black/80 px-2 py-0.5 border border-[#35D8FF]/20 uppercase">
                  HAZTE CON EL TUYO
                </div>

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70" />
              </div>

              {/* Title & info outside the card */}
              <div className="pt-4 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-display text-lg font-black text-white group-hover:text-[#35D8FF] transition-colors uppercase tracking-tight">
                      {product.name}
                    </h4>
                    <span className="font-mono text-sm font-bold text-[#35D8FF]">
                      {product.price.toFixed(2)}€
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#FF3EA6]">
                  <Heart className="w-3 h-3 fill-[#FF3EA6]/20" />
                  <span>1,00€ donado a la Protectora Indartxu</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="flex-1 py-2 bg-[#35D8FF] text-black hover:bg-[#35D8FF]/80 font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    style={{ borderRadius: "0px" }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Añadir al Carrito
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="px-2.5 border border-neutral-800 text-white hover:border-white transition-colors cursor-pointer flex items-center justify-center"
                    style={{ borderRadius: "0px" }}
                    title="Ver detalles"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Spec Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/95 overflow-y-auto p-0 sm:p-4">
          <div
            className="w-full max-w-5xl bg-[#08080A] border-x border-b border-[#35D8FF]/40 relative flex flex-col min-h-screen sm:min-h-0"
            style={{ borderRadius: "0px" }}
          >
            {/* Sticky Top Bar for high visibility and easy exit */}
            <div className="sticky top-0 z-50 bg-[#08080A] border-b border-neutral-900 px-4 sm:px-6 py-4 flex justify-between items-center backdrop-blur-md">
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-2 font-mono text-xs font-bold text-[#35D8FF] hover:text-white transition-all cursor-pointer group uppercase border border-[#35D8FF]/30 px-3.5 py-2 bg-black/60"
                style={{ borderRadius: "0px" }}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Volver Atrás</span>
              </button>
              
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest hidden md:inline">
                Detalle del Producto • {selectedProduct.name}
              </span>
              
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 bg-neutral-950 hover:bg-neutral-800 text-white hover:text-[#35D8FF] border border-neutral-850 transition-colors cursor-pointer"
                style={{ borderRadius: "0px" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>



            {/* Parameterized Product Page Component */}
            <ProductPage
              name={selectedProduct.name}
              price={selectedProduct.price}
              image={selectedProduct.image}
              availability={selectedProduct.availability || "Disponible"}
              onAddToCart={() => {
                onAddToCart(selectedProduct);
              }}
              onClose={() => setSelectedProduct(null)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
