import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import logo from '../../assets/logo.png';

const Navbar: React.FC = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo + Nome */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="text-xl font-bold whitespace-nowrap">OneForAllCommerce</span>
        </Link>

        {/* Botão de menu no mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>


        {/* Itens de menu - desktop */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/category/roupas" className="hover:underline">Roupas</Link>
          <Link to="/category/acessorios" className="hover:underline">Acessórios</Link>
          <Link to="/category/calcados" className="hover:underline">Calçados</Link>
          <div className="flex gap-4 items-center">
            <Link to="/login" className="hover:underline">Entrar</Link>
            <Link to="/cart" className="relative">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Itens de menu - mobile */}
      {menuOpen && (
        <div className="flex flex-col gap-4 items-center bg-white shadow-md py-4 md:hidden">
          <Link to="/category/roupas" className="hover:underline">Roupas</Link>
          <Link to="/category/acessorios" className="hover:underline">Acessórios</Link>
          <Link to="/category/calcados" className="hover:underline">Calçados</Link>
          <Link to="/login" className="hover:underline">Entrar</Link> {/* apenas o Entrar aqui */}
        </div>
      )}

    </nav>
  );
};

export default Navbar;
