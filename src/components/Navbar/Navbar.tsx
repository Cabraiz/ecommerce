import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import logo from '../../assets/logo.png';
import { cartIconRef } from './cartIconRef';

const Navbar: React.FC = () => {
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const nomeUsuario = Cookies.get('usuario_nome');
  const saudacao = nomeUsuario ? `Olá, ${nomeUsuario.split(' ')[0]}` : 'Olá, visitante';

  const handleLogout = () => {
    logout();
    toast.info('Você saiu com sucesso!');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover select-none" />
          <span className="text-xl font-bold whitespace-nowrap select-none">OneForAllCommerce</span>
        </Link>

        {/* Botão de menu no mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative" ref={cartIconRef}>
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
        <div className="hidden md:flex gap-6 items-center select-none">
          <Link to="/category/roupas" className="hover:underline">Roupas</Link>
          <Link to="/category/acessorios" className="hover:underline">Acessórios</Link>
          <Link to="/category/calcados" className="hover:underline">Calçados</Link>

          <div className="flex gap-4 items-center">
            <span className="text-gray-700 text-sm font-medium">{saudacao}</span>

            {isLoggedIn ? (
              <>
                <Link to="/retiradas" className="text-sm text-blue-600 underline hover:text-blue-800 transition">
                  Meus Produtos
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
                Entrar
              </Link>
            )}

            <Link to="/cart" className="relative" ref={cartIconRef}>
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
        <div className="flex flex-col gap-4 items-center bg-white shadow-md py-4 md:hidden select-none">
          <Link to="/category/roupas" className="hover:underline">Roupas</Link>
          <Link to="/category/acessorios" className="hover:underline">Acessórios</Link>
          <Link to="/category/calcados" className="hover:underline">Calçados</Link>

          <span className="text-gray-700 text-sm font-medium">{saudacao}</span>

          {isLoggedIn ? (
            <>
              <Link to="/retiradas" className="text-sm text-blue-600 underline hover:text-blue-800 transition">
                Meus Produtos
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
              Entrar
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
