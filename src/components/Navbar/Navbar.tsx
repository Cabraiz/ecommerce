import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext'; // 👈 importa o hook

const Navbar: React.FC = () => {
  const { cartItems } = useCart(); // 👈 usa o carrinho do contexto

  // Corrigir o total para somar a quantidade de produtos
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link to="/" className="text-xl font-bold">Logo</Link>

      <div className="flex gap-6 items-center">
        <Link to="/category/roupas" className="hover:underline">Roupas</Link>
        <Link to="/category/acessorios" className="hover:underline">Acessórios</Link>
        <Link to="/category/calcados" className="hover:underline">Calçados</Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/login" className="hover:underline">Entrar</Link>
        <Link to="/cart" className="relative">
          🛒
          {totalItems > 0 && ( // 👈 mostra o número apenas se houver itens
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
