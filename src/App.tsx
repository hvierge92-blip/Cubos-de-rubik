import { useState, useEffect } from "react";
import { Menu, ShoppingCart, HelpCircle, Home, LayoutGrid, GraduationCap, User, MessageSquare, Heart, Sparkles } from "lucide-react";
import HomeView from "./components/HomeView";
import CatalogView from "./components/CatalogView";
import ShopView from "./components/ShopView";
import LearnView from "./components/LearnView";
import ProfileView from "./components/ProfileView";
import SolidarityView from "./components/SolidarityView";
import CartDrawer from "./components/CartDrawer";
import AiChatAssistant from "./components/AiChatAssistant";
import { Product } from "./data";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load cart from localStorage on init
  useEffect(() => {
    const cachedCart = localStorage.getItem("crubik_cart");
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("crubik_cart", JSON.stringify(newCart));
  };

  const handleAddToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    let newCart: CartItem[];
    if (existing) {
      newCart = cart.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { product, quantity: 1 }];
    }
    saveCart(newCart);
    // Open cart drawer immediately to give visual confirmation feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const newCart = cart.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(newCart);
  };

  const handleRemoveItem = (productId: string) => {
    const newCart = cart.filter(item => item.product.id !== productId);
    saveCart(newCart);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab("shop");
  };

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-cyber-bg text-white flex flex-col font-sans select-none overflow-x-hidden relative">
      
      {/* Top Header Bar exactly as requested */}
      <header className="sticky top-0 z-40 bg-black/90 border-b border-gray-900 px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => setIsAiChatOpen(true)}
          className="p-1 text-gray-400 hover:text-cyber-cyan transition-colors"
          title="Menú IA"
        >
          <Menu className="w-5.5 h-5.5" />
        </button>

        <div className="cursor-pointer" onClick={() => setActiveTab("home")}>
          <h1 className="font-display text-2xl font-extrabold tracking-widest text-white uppercase select-none flex items-center gap-1.5">
            CRUBIK
          </h1>
        </div>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="p-1 text-gray-400 hover:text-cyber-cyan transition-colors relative"
          title="Ver Caja"
        >
          <ShoppingCart className="w-5.5 h-5.5" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-cyber-cyan text-black text-[9px] font-mono font-extrabold flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(0,245,255,0.6)]">
              {cartItemsCount}
            </span>
          )}
        </button>
      </header>

      {/* Main View Scroll Area */}
      <main className="flex-1 w-full flex flex-col">
        {activeTab === "home" && (
          <HomeView 
            onNavigate={setActiveTab} 
            onAddToCart={handleAddToCart} 
            onSelectProduct={handleSelectProduct} 
          />
        )}
        {activeTab === "catalogo" && (
          <CatalogView 
            onAddToCart={handleAddToCart} 
          />
        )}
        {activeTab === "shop" && (
          <ShopView 
            onAddToCart={handleAddToCart} 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
          />
        )}
        {activeTab === "learn" && (
          <LearnView />
        )}
        {activeTab === "solidarity" && (
          <SolidarityView />
        )}
        {activeTab === "profile" && (
          <ProfileView />
        )}
      </main>

      {/* Floating help / chat ? bubble button at bottom right (matches screenshot floating circular button) */}
      <button
        onClick={() => setIsAiChatOpen(true)}
        className="fixed bottom-22 right-4 z-30 w-12 h-12 bg-cyber-cyan hover:bg-cyber-cyan-dim text-black flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:shadow-[0_0_20px_rgba(0,245,255,0.6)] hover:scale-105 transition-all"
        style={{ borderRadius: "50%" }}
        title="Soporte Inteligente CRUBIK AI"
      >
        <MessageSquare className="w-5.5 h-5.5" />
      </button>

      {/* Bottom Sticky Navigation Menu (Matches standard layout navigation) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-gray-900 py-3.5 px-6 flex justify-around items-center">
        <button
          onClick={() => setActiveTab("home")}
          className={`group flex flex-col items-center gap-1 transition-all ${
            activeTab === "home" ? "scale-110 opacity-100 font-extrabold" : "opacity-75 hover:opacity-100"
          }`}
        >
          <Home className="w-5 h-5 text-cyber-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.95)]" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-cyber-cyan drop-shadow-[0_0_4px_rgba(0,245,255,0.5)]">HOME</span>
        </button>

        <button
          onClick={() => setActiveTab("catalogo")}
          className={`group flex flex-col items-center gap-1 transition-all ${
            activeTab === "catalogo" ? "scale-110 opacity-100 font-extrabold" : "opacity-75 hover:opacity-100"
          }`}
        >
          <Sparkles className="w-5 h-5 text-cyber-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.95)]" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-cyber-cyan drop-shadow-[0_0_4px_rgba(0,245,255,0.5)]">CATÁLOGO</span>
        </button>

        <button
          onClick={() => {
            setSelectedProduct(null);
            setActiveTab("shop");
          }}
          className={`group flex flex-col items-center gap-1 transition-all ${
            activeTab === "shop" ? "scale-110 opacity-100 font-extrabold" : "opacity-75 hover:opacity-100"
          }`}
        >
          <LayoutGrid className="w-5 h-5 text-cyber-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.95)]" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-cyber-cyan drop-shadow-[0_0_4px_rgba(0,245,255,0.5)]">SHOP</span>
        </button>

        <button
          onClick={() => setActiveTab("learn")}
          className={`group flex flex-col items-center gap-1 transition-all ${
            activeTab === "learn" ? "scale-110 opacity-100 font-extrabold" : "opacity-75 hover:opacity-100"
          }`}
        >
          <GraduationCap className="w-5 h-5 text-cyber-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.95)]" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-cyber-cyan drop-shadow-[0_0_4px_rgba(0,245,255,0.5)]">LEARN</span>
        </button>

        <button
          onClick={() => setActiveTab("solidarity")}
          className={`group flex flex-col items-center gap-1 transition-all ${
            activeTab === "solidarity" ? "scale-110 opacity-100 font-extrabold animate-pulse" : "opacity-75 hover:opacity-100 animate-pulse"
          }`}
        >
          <Heart className="w-5 h-5 text-cyber-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.95)]" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-cyber-cyan drop-shadow-[0_0_4px_rgba(0,245,255,0.5)]">SOLIDARIO</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`group flex flex-col items-center gap-1 transition-all ${
            activeTab === "profile" ? "scale-110 opacity-100 font-extrabold" : "opacity-75 hover:opacity-100"
          }`}
        >
          <User className="w-5 h-5 text-cyber-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.95)]" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-cyber-cyan drop-shadow-[0_0_4px_rgba(0,245,255,0.5)]">PROFILE</span>
        </button>
      </nav>

      {/* Sidebar Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <AiChatAssistant
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />
    </div>
  );
}
