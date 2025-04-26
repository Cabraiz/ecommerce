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
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              {/* Imagem e Nome */}
              <div className="flex items-center gap-4">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-contain" />
                <div>
                  <div className="font-semibold">{item.product.name}</div>
                  <div className="text-gray-500 text-sm">R$ {item.product.price.toFixed(2)}</div>
                </div>
              </div>

              {/* Quantidade */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.product)}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => addToCart(item.product)}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="w-24 text-right">
                <div className="font-semibold">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>

              {/* Remover */}
              <button
                onClick={() => removeFromCart(item.product)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
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
