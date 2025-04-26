import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Pedido Confirmado!</h1>
      <p className="mb-6">Obrigado por comprar com a gente.</p>

      <Link to="/" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Voltar à Loja
      </Link>
    </div>
  );
};

export default OrderSuccess;
