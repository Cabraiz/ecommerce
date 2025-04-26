import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // aqui enviaríamos para o backend real
    navigate('/success');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome Completo"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Endereço"
          className="border p-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
};

export default Checkout;
