import React, { useState } from "react";
import { PRODUCTS, Product } from "../data";
import { ShoppingCart, Check, ShieldCheck, Heart, Sparkles, X, ChevronRight, MapPin, ArrowLeft } from "lucide-react";
import ProductPage from "./ProductPage";

interface ShopViewProps {
  onAddToCart: (product: Product) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export default function ShopView({ onAddToCart, selectedProduct, setSelectedProduct }: ShopViewProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="w-full space-y-12 py-6 pb-24 max-w-4xl mx-auto px-4">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="font-mono text-xs text-[#FF3EA6] tracking-widest uppercase">
          SISTEMA DE SUMINISTRO OFICIAL
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          CATÁLOGO DE TIENDA
        </h1>
        <p className="font-sans text-sm text-gray-400 max-w-lg mx-auto">
          Adquiere los rompecabezas más avanzados del planeta. Mecanizados a nivel de micras y retroiluminados con núcleos magnéticos adaptativos.
        </p>
      </div>

      {/* Shop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 pt-4">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container resembling the brand's visual identity */}
            <div 
              className="relative aspect-[3/4] overflow-hidden border border-neutral-900 group-hover:border-[#35D8FF]/40 transition-all duration-300"
              style={{ 
                borderRadius: "0px",
                background: "radial-gradient(circle at 20% 30%, rgba(255, 62, 166, 0.15) 0%, rgba(255, 62, 166, 0.03) 50%, transparent 80%), radial-gradient(circle at 80% 70%, rgba(53, 216, 255, 0.12) 0%, rgba(53, 216, 255, 0.03) 50%, transparent 80%), #08080A"
              }}
            >
              {product.tag && (
                <div className="absolute top-4 left-4 z-10 bg-[#35D8FF] text-black px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase font-bold">
                  {product.tag}
                </div>
              )}
              
              <button
                onClick={(e) => toggleFavorite(product.id, e)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/70 hover:bg-neutral-900 border border-neutral-800 text-white hover:text-[#FF3EA6] transition-colors cursor-pointer"
                style={{ borderRadius: "0px" }}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-[#FF3EA6] text-[#FF3EA6]" : ""}`} />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/10 to-transparent pointer-events-none" />
              
              {/* Overlapping small spec label */}
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-gray-400 flex items-center gap-1.5 bg-black/60 px-2 py-1 border border-neutral-850">
                <Sparkles className="w-3 h-3 text-[#35D8FF]" />
                Dificultad: {product.specs["Dificultad"]}
              </div>
            </div>

            {/* Product Info below the card */}
            <div className="pt-4 space-y-3 flex-grow flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#35D8FF] transition-colors uppercase tracking-tight">
                    {product.name}
                  </h3>
                  <span className="font-mono text-sm font-bold text-[#35D8FF] whitespace-nowrap ml-2">
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
                  className="px-2.5 border border-neutral-800 text-white hover:border-white transition-colors cursor-pointer"
                  style={{ borderRadius: "0px" }}
                  title="Ver detalles"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
