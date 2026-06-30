import React, { useState } from "react";
import { PRODUCTS, Product } from "../data";
import { ShoppingCart, Check, ShieldCheck, Heart, Sparkles, X, ChevronRight } from "lucide-react";

interface ShopViewProps {
  onAddToCart: (product: Product) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export default function ShopView({ onAddToCart, selectedProduct, setSelectedProduct }: ShopViewProps) {
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredProducts = PRODUCTS.filter(p => {
    if (filterDifficulty === "all") return true;
    if (filterDifficulty === "easy") return p.specs["Dificultad"].includes("6/");
    if (filterDifficulty === "hard") return p.specs["Dificultad"].includes("8/") || p.specs["Dificultad"].includes("9.");
    return true;
  });

  return (
    <div className="w-full space-y-12 py-6 pb-24 max-w-4xl mx-auto px-4">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="font-mono text-xs text-cyber-magenta tracking-widest uppercase">
          SISTEMA DE SUMINISTRO OFICIAL
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          CATÁLOGO DE HARDWARE
        </h1>
        <p className="font-sans text-sm text-gray-400 max-w-lg mx-auto">
          Adquiere los rompecabezas más avanzados del planeta. Mecanizados a nivel de micras y retroiluminados con núcleos magnéticos adaptativos.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 border-b border-gray-900 pb-4">
        <button
          onClick={() => setFilterDifficulty("all")}
          className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all border ${
            filterDifficulty === "all"
              ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan"
              : "bg-transparent border-transparent text-gray-400 hover:text-white"
          }`}
          style={{ borderRadius: "0px" }}
        >
          TODOS ({PRODUCTS.length})
        </button>
        <button
          onClick={() => setFilterDifficulty("easy")}
          className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all border ${
            filterDifficulty === "easy"
              ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan"
              : "bg-transparent border-transparent text-gray-400 hover:text-white"
          }`}
          style={{ borderRadius: "0px" }}
        >
          VELOCIDAD (6/10)
        </button>
        <button
          onClick={() => setFilterDifficulty("hard")}
          className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all border ${
            filterDifficulty === "hard"
              ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan"
              : "bg-transparent border-transparent text-gray-400 hover:text-white"
          }`}
          style={{ borderRadius: "0px" }}
        >
          EXTREMO (8+/10)
        </button>
      </div>

      {/* Shop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group cursor-pointer border border-gray-800 bg-neutral-950/40 hover:border-cyber-cyan/40 transition-all duration-300 flex flex-col justify-between"
            style={{ borderRadius: "0px" }}
          >
            <div className="relative aspect-square overflow-hidden bg-neutral-950">
              {product.tag && (
                <div className="absolute top-4 left-4 z-10 bg-cyber-cyan text-black px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase">
                  {product.tag}
                </div>
              )}
              
              <button
                onClick={(e) => toggleFavorite(product.id, e)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/70 hover:bg-black border border-gray-800 text-white hover:text-cyber-magenta transition-colors"
                style={{ borderRadius: "0px" }}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-cyber-magenta text-cyber-magenta" : ""}`} />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/10 to-transparent" />
              
              {/* Overlapping small spec label */}
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-gray-400 flex items-center gap-1.5 bg-black/60 px-2 py-1 border border-gray-900">
                <Sparkles className="w-3 h-3 text-cyber-cyan" />
                Dificultad: {product.specs["Dificultad"]}
              </div>
            </div>

            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors uppercase">
                    {product.name}
                  </h3>
                  <span className="font-mono text-base font-bold text-cyber-cyan whitespace-nowrap ml-2">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="font-sans text-sm text-gray-400 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-900 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="flex-1 py-2.5 bg-cyber-cyan text-black hover:bg-cyber-cyan-dim font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                  style={{ borderRadius: "0px" }}
                >
                  <ShoppingCart className="w-4 h-4" /> Añadir al Carrito
                </button>
                <button
                  className="px-3 border border-gray-800 text-white hover:border-white transition-colors"
                  style={{ borderRadius: "0px" }}
                  title="Ver detalles"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Spec Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 overflow-y-auto">
          <div
            className="w-full max-w-2xl bg-neutral-950 border border-cyber-cyan/40 relative overflow-hidden"
            style={{ borderRadius: "0px" }}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-neutral-900 hover:bg-neutral-800 text-white hover:text-cyber-cyan border border-gray-800 transition-colors"
              style={{ borderRadius: "0px" }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image Panel */}
              <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-black">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                {selectedProduct.tag && (
                  <span className="absolute top-4 left-4 bg-cyber-cyan text-black px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase">
                    {selectedProduct.tag}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 font-mono text-[11px] text-cyber-cyan">
                  PREMIUM HARDWARE
                </div>
              </div>

              {/* Product Specs Panel */}
              <div className="p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
                <div className="space-y-2">
                  <h2 className="font-display text-2xl font-extrabold text-white uppercase tracking-tight">
                    {selectedProduct.name}
                  </h2>
                  <div className="font-mono text-xl font-bold text-cyber-cyan">
                    ${selectedProduct.price.toFixed(2)}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-mono text-xs text-cyber-magenta uppercase tracking-wider border-b border-gray-950 pb-1">
                    Descripción del Sistema
                  </h4>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed">
                    {selectedProduct.longDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-cyber-cyan uppercase tracking-wider border-b border-gray-950 pb-1">
                    Especificaciones Técnicas
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-[11px] py-1 border-b border-gray-900 font-mono">
                        <span className="text-gray-500 uppercase">{key}</span>
                        <span className="text-gray-300 font-bold text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-cyber-cyan-dark/10 border border-cyber-cyan-dim/20 p-3 text-[11px] text-cyber-cyan font-mono">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Soporte Oficial de Competición WCA Habilitado</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3 bg-cyber-cyan text-black hover:bg-cyber-cyan-dim font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                    style={{ borderRadius: "0px" }}
                  >
                    <ShoppingCart className="w-4 h-4" /> Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
