import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Item {
  produtoId: number;
  tamanho: string;
  corProduto: string;
  quantidade: number;
  status: string;
}

interface Retirada {
  id: number;
  dataRetirada: string;
  observacao: string;
  itens: Item[];
}

const MeusProdutos = () => {
  const [retiradas, setRetiradas] = useState<Retirada[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get('usuario_id');

  useEffect(() => {
    if (userId && !isNaN(Number(userId))) {
      axios
        .get(`https://ecommerce-api-production-df5c.up.railway.app/retiradas/usuario/${userId}`)
        .then((res) => setRetiradas(res.data))
        .catch((err) => console.error('Erro ao buscar retiradas:', err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Meus Produtos</h1>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Carregando retiradas...</p>
      ) : retiradas.length === 0 ? (
        <p className="text-gray-600">Nenhuma retirada encontrada.</p>
      ) : (
        <ul className="space-y-4">
          {retiradas.map((r) => (
            <li key={r.id} className="border rounded p-4 shadow-sm bg-white">
              <p className="font-semibold">
                Data: {new Date(r.dataRetirada).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">{r.observacao}</p>
              <ul className="mt-2 pl-4 text-sm list-disc">
                {r.itens.map((i, idx) => (
                  <li key={idx}>
                    {i.quantidade}x {i.corProduto} - Tamanho {i.tamanho}
                    <span
                      className={`ml-2 inline-block px-2 py-1 rounded text-xs ${
                        i.status === 'Aguardando separação'
                          ? 'bg-yellow-100 text-yellow-700'
                          : i.status === 'Enviado'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {i.status}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MeusProdutos;
