import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { ProductInCart } from '../types/product';

interface CartItem {
  product: ProductInCart;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductInCart) => void;
  removeFromCart: (product: ProductInCart) => void;
  decreaseQuantity: (product: ProductInCart) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: ProductInCart) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id &&
                item.product.selectedCor === product.selectedCor &&
                item.product.selectedTamanho === product.selectedTamanho
      );
  
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id &&
          item.product.selectedCor === product.selectedCor &&
          item.product.selectedTamanho === product.selectedTamanho
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (product: ProductInCart) => {
    setCartItems(prevItems =>
      prevItems.filter(item =>
        !(item.product.id === product.id &&
          item.product.selectedCor === product.selectedCor &&
          item.product.selectedTamanho === product.selectedTamanho)
      )
    );
  };
  
  const decreaseQuantity = (product: ProductInCart) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.product.id === product.id &&
          item.product.selectedCor === product.selectedCor &&
          item.product.selectedTamanho === product.selectedTamanho
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Aqui usamos useMemo para memorizar o value
  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity
  }), [cartItems]); // só muda quando cartItems mudar

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
