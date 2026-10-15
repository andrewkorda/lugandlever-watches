import { X, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from './CartContext';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } = useCart();

  if (!isOpen) return null;

  const freeShippingThreshold = 500;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountToFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm transition-opacity" 
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-orange-600">
                Curated Allocation
              </span>
              <h2 className="font-display font-black text-xl uppercase tracking-tight text-zinc-950 mt-0.5">
                Acquisition Bag
              </h2>
            </div>
            <button 
              onClick={closeCart} 
              className="text-zinc-400 hover:text-zinc-950 p-1 transition"
              aria-label="Close acquisition bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Meter */}
          <div className="bg-zinc-50 border-b border-zinc-200 px-6 py-3 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-zinc-900 font-medium">
                <Truck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Complimentary Expedited Courier unlocked across Canada</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-zinc-600">
                  Add <span className="font-bold text-zinc-950">${amountToFreeShipping} CAD</span> for complimentary courier shipping.
                </div>
                <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-orange-600 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-zinc-100">
            {items.length === 0 ? (
              <div className="py-20 text-center text-zinc-400 text-xs">
                Your acquisition bag is currently empty.
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.product.id}-${item.selectedOption || 'def'}`} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <div className="w-20 h-20 bg-zinc-100 p-2 border border-zinc-200 shrink-0 flex items-center justify-center">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-bold text-xs uppercase text-zinc-950">
                          {item.product.name}
                        </h4>
                        <button 
                          onClick={() => removeItem(item.product.id, item.selectedOption)}
                          className="text-zinc-400 hover:text-red-600 text-[10px] uppercase font-bold"
                        >
                          Remove
                        </button>
                      </div>

                      {item.selectedOption && (
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          Width: {item.selectedOption}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-zinc-300">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1, item.selectedOption)}
                          className="p-1 hover:bg-zinc-100 text-zinc-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span data-testid="cart-item-qty" className="px-2.5 text-xs font-bold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1, item.selectedOption)}
                          className="p-1 hover:bg-zinc-100 text-zinc-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-display font-bold text-xs text-zinc-950">
                        ${item.product.price * item.quantity} {item.product.currency}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-medium text-zinc-500 uppercase tracking-wider">Subtotal</span>
                <span data-testid="cart-subtotal" className="font-display font-extrabold text-lg text-zinc-950">
                  ${subtotal} CAD
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>3-Year Atelier Warranty & Diagnostic Timing Certificate Included</span>
              </div>

              <button 
                className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-display font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2"
              >
                Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}