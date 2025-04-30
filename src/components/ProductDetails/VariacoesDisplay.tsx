import React from 'react';
import { VariacaoComTamanhosDTO } from '../../types/variacao';

interface Props {
  variacoes: VariacaoComTamanhosDTO[];
}

const VariacoesDisplay: React.FC<Props> = ({ variacoes }) => {
  if (!variacoes.length) return null;

  return (
    <div className="mt-4 space-y-4">
      {variacoes.map((variacao) => (
        <div key={variacao.id}>
          <p className="text-sm font-medium">
            Cor: <span className="capitalize">{variacao.cor}</span>
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {variacao.tamanhos.map((t, index) => (
              <div
                key={index}
                className={`px-3 py-1 border rounded text-xs ${
                  t.estoque === 0
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-white text-black'
                }`}
              >
                {t.tamanho} ({t.estoque})
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariacoesDisplay;
