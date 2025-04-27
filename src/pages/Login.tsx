import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/'); // Depois de logar, vai para a Home. Pode mudar para /cart se quiser!
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Entrar na sua conta</h1>
        
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
