import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = await loginUser(email, password); // chamada real

      // Salva nos cookies por 1 dia
      Cookies.set('usuario_id', userData.id, { expires: 1 });
      Cookies.set('usuario_nome', userData.nome, { expires: 1 });
      Cookies.set('usuario_email', userData.email, { expires: 1 });
      if (userData.papel) {
        Cookies.set('usuario_papel', userData.papel, { expires: 1 });
      }

      login(); // atualiza contexto (se usar AuthContext)
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Credenciais inválidas.');
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Entrar</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="border p-3 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition"
          >
            Entrar
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          Não tem conta?{' '}
          <Link to="/register" className="text-green-500 hover:underline">
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
