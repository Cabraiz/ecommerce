import React from 'react';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Entregue' | 'Em andamento' | 'Cancelado';
}

const mockOrders: Order[] = [
  { id: '1', date: '2025-04-25', total: 199.90, status: 'Entregue' },
  { id: '2', date: '2025-04-20', total: 89.90, status: 'Em andamento' },
];

const UserProfile: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Meus Pedidos</h1>

      <div className="space-y-4">
        {mockOrders.map(order => (
          <div key={order.id} className="border p-4 rounded shadow-sm">
            <div><strong>ID Pedido:</strong> {order.id}</div>
            <div><strong>Data:</strong> {order.date}</div>
            <div><strong>Total:</strong> R$ {order.total.toFixed(2)}</div>
            <div><strong>Status:</strong> {order.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
