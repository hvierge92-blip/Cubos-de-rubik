import React, { useState } from "react";
import { Product } from "../data";
import { X, Trash2, ShoppingBag, CreditCard, ShieldCheck, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "processing" | "success">("cart");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loadingText, setLoadingText] = useState("");

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleStartCheckout = () => {
    setCheckoutStep("form");
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setCheckoutStep("processing");
    
    // Step-by-step progress simulation
    const steps = [
      "Iniciando pasarela de pago segura Crubik-Pay...",
      "Autenticando credenciales de cuber élite...",
      "Generando telemetría de envío en contenedor térmico...",
      "¡Orden procesada y registrada con éxito!"
    ];

    let currentStep = 0;
    setLoadingText(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingText(steps[currentStep]);
      } else {
        clearInterval(interval);
        setCheckoutStep("success");
        onClearCart();
      }
    }, 1200);
  };

  const handleReset = () => {
    setCheckoutStep("cart");
    setEmail("");
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      {/* Click outside backdrop close constraint */}
      <div className="flex-1" onClick={onClose} />

      {/* Cart Container Drawer */}
      <div 
        className="w-full max-w-md bg-neutral-950 border-l border-cyber-cyan/30 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.8)] h-full"
        style={{ borderRadius: "0px" }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-900 flex justify-between items-center bg-black">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyber-cyan" />
            <span className="font-display text-lg font-bold text-white uppercase tracking-tight">Caja de Suministro</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-900 border border-transparent hover:border-gray-800 text-gray-400 hover:text-white transition-colors"
            style={{ borderRadius: "0px" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Inner Panel View depending on checkoutStep */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {checkoutStep === "cart" && (
            <>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-gray-700 stroke-[1.5]" />
                  <div className="space-y-1">
                    <h3 className="font-display text-sm font-bold text-white uppercase">Caja vacía</h3>
                    <p className="font-sans text-xs text-gray-500 max-w-[200px] leading-relaxed">
                      No has añadido ninguna pieza de hardware a tus suministros todavía.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="font-mono text-xs text-cyber-cyan border border-cyber-cyan/30 px-4 py-2 hover:bg-cyber-cyan hover:text-black transition-colors"
                    style={{ borderRadius: "0px" }}
                  >
                    EXPLORAR TIENDA
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="border border-gray-900 bg-[#09090a] p-4 flex gap-4 relative"
                      style={{ borderRadius: "0px" }}
                    >
                      {/* Image */}
                      <div className="w-16 h-16 bg-black border border-gray-950 flex-shrink-0 overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Specs */}
                      <div className="flex-1 space-y-2">
                        <div className="space-y-0.5">
                          <h4 className="font-display text-sm font-bold text-white uppercase">{item.product.name}</h4>
                          <span className="font-mono text-xs text-cyber-cyan">${item.product.price.toFixed(2)}</span>
                        </div>

                        {/* Increment / Decrement Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 bg-neutral-900 border border-gray-800 text-xs font-bold text-white hover:border-gray-500"
                            style={{ borderRadius: "0px" }}
                          >
                            -
                          </button>
                          <span className="font-mono text-xs text-white px-2.5">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 bg-neutral-900 border border-gray-800 text-xs font-bold text-white hover:border-gray-500"
                            style={{ borderRadius: "0px" }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-gray-500 hover:text-red-500 absolute top-2 right-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === "form" && (
            <form onSubmit={handleSimulatePayment} className="space-y-6">
              <div className="space-y-2 text-center border-b border-gray-900 pb-4">
                <span className="font-mono text-[10px] text-cyber-cyan uppercase tracking-widest">SISTEMA COMPRA_INTEGRADA.EXE</span>
                <h3 className="font-display text-md font-bold text-white uppercase">Información de Envío</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-500 uppercase">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Leo Cuber"
                    className="w-full bg-neutral-900 border border-gray-800 text-xs py-2.5 px-3 font-mono text-white focus:outline-none focus:border-cyber-cyan"
                    style={{ borderRadius: "0px" }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-500 uppercase">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cuber@crubik.com"
                    className="w-full bg-neutral-900 border border-gray-800 text-xs py-2.5 px-3 font-mono text-white focus:outline-none focus:border-cyber-cyan"
                    style={{ borderRadius: "0px" }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-500 uppercase">Dirección de Destino</label>
                  <input
                    type="text"
                    required
                    placeholder="Avenida del Giro Perpetuo 360"
                    className="w-full bg-neutral-900 border border-gray-800 text-xs py-2.5 px-3 font-mono text-white focus:outline-none focus:border-cyber-cyan"
                    style={{ borderRadius: "0px" }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-500 uppercase">Datos de Facturación (Simulada)</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder="4000 1234 5678 9010"
                      className="w-full bg-neutral-900 border border-gray-800 text-xs py-2.5 pl-10 pr-3 font-mono text-white focus:outline-none"
                      style={{ borderRadius: "0px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-cyber-cyan-dark/5 border border-cyber-cyan/10 p-3 text-[10px] text-cyber-cyan font-mono leading-relaxed">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Simulación de pasarela de pruebas activada. No se realizarán cargos reales.</span>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="flex-1 py-2.5 border border-gray-800 font-mono text-xs text-gray-400 hover:text-white uppercase"
                  style={{ borderRadius: "0px" }}
                >
                  Regresar
                </button>
                <button
                  type="submit"
                  className="flex-grow py-2.5 bg-cyber-cyan text-black hover:bg-cyber-cyan-dim font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                  style={{ borderRadius: "0px" }}
                >
                  SIMULAR COMPRA
                </button>
              </div>
            </form>
          )}

          {checkoutStep === "processing" && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <Loader2 className="w-10 h-10 text-cyber-cyan animate-spin" />
              <div className="space-y-2">
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-tight">PROCESANDO PEDIDO</h3>
                <p className="font-mono text-[10px] text-cyber-cyan max-w-xs leading-relaxed font-bold animate-pulse">
                  {loadingText}
                </p>
              </div>
            </div>
          )}

          {checkoutStep === "success" && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <CheckCircle2 className="w-12 h-12 text-cyber-green animate-bounce" />
              <div className="space-y-2">
                <h3 className="font-display text-base font-extrabold text-white uppercase tracking-tight">¡SUMINISTRO DESPLEGADO!</h3>
                <p className="font-sans text-xs text-gray-400 max-w-xs leading-relaxed">
                  Felicidades, <span className="text-white font-bold">{name}</span>. Tu pedido de hardware ha sido procesado. Se ha enviado la telemetría y detalles a <span className="text-white font-mono font-bold">{email}</span>.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="w-full max-w-xs py-2.5 bg-cyber-cyan text-black hover:bg-cyber-cyan-dim font-mono text-xs font-bold uppercase tracking-widest"
                style={{ borderRadius: "0px" }}
              >
                CERRAR Y CONTINUAR
              </button>
            </div>
          )}
        </div>

        {/* Footer Billing Breakdown */}
        {checkoutStep === "cart" && cart.length > 0 && (
          <div className="p-6 border-t border-gray-900 bg-neutral-950 font-mono space-y-4 text-xs">
            <div className="space-y-1.5 text-gray-400">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>ENVÍO</span>
                <span className="text-white">
                  {shipping === 0 ? "GRATUITO (Hardcore-Drop)" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-900 pt-3 flex justify-between font-bold text-sm text-cyber-cyan">
              <span>TOTAL ESTIMADO</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={handleStartCheckout}
                className="w-full py-3 bg-cyber-cyan text-black hover:bg-cyber-cyan-dim font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                style={{ borderRadius: "0px" }}
              >
                PROCESAR SUMINISTROS <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
