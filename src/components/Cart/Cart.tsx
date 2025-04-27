import React from 'react';
import { useCart } from '../../contexts/CartContext';

const Cart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useCart();
  
  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Seu Carrinho</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">O carrinho está vazio.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg shadow-sm gap-4"
            >
              {/* Imagem e Nome */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <div className="font-semibold">{item.product.name}</div>
                  <div className="text-gray-500 text-sm">
                    R$ {item.product.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Quantidade + Subtotal + Lixeira */}
<div className="flex flex-col md:flex-row items-end md:items-center justify-end gap-2 md:gap-8 w-full md:w-auto">

{/* Quantidade */}
<div className="flex items-center bg-gray-100 rounded-md overflow-hidden shadow-sm">
  <button
    onClick={() => decreaseQuantity(item.product)}
    className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold"
  >
    -
  </button>
  <span className="px-4 py-2 font-semibold text-lg">{item.quantity}</span>
  <button
    onClick={() => addToCart(item.product)}
    className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold"
  >
    +
  </button>
</div>

{/* Subtotal */}
<div className="text-xl font-extrabold text-indigo-600 min-w-[100px] text-center">
  R$ {(item.product.price * item.quantity).toFixed(2)}
</div>

{/* Botão Remover */}
<div className="w-full md:w-auto">
  <button
    onClick={() => removeFromCart(item.product)}
    className="w-full md:w-auto bg-red-500 md:bg-transparent text-white md:text-red-500 py-2 md:py-0 rounded-md md:rounded-none hover:bg-red-600 md:hover:bg-transparent transition-all flex items-center justify-center gap-2"
    title="Remover"
  >
    <span className="block md:hidden font-semibold">Remover Item</span> {/* Mobile: botão vermelho com texto */}
    <span className="hidden md:block text-2xl">🗑️</span> {/* Desktop: só o ícone da lixeira */}
  </button>
</div>


</div>

            </div>
          ))}

          {/* Total */}
          <div className="flex justify-end text-xl font-bold mt-8">
            Total: R$ {total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;