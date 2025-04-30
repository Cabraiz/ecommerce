import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import { VariacaoComTamanhosDTO } from '../../types/variacao';

interface ProductCardProps {
  product: Product;
  variacoes: VariacaoComTamanhosDTO[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variacoes }) => {
  const { addToCart } = useCart();
  const [selectedCor, setSelectedCor] = useState<string | null>(null);
  const [selectedTamanho, setSelectedTamanho] = useState<string | null>(null);

  const variacoesDoProduto = variacoes.filter(v => String(v.produtoId) === product.id);
  const variacaoSelecionada = variacoesDoProduto.find(v => v.cor === selectedCor);

  function getColorHexFromName(cor: string): string {
    const cores: Record<string, string> = {
      preto: '#000',
      branco: '#fff',
      cinza: '#999',
      azul: '#007BFF',
      vermelho: '#FF4136',
      padrão: '#ccc',
    };
    return cores[cor.toLowerCase()] || '#ddd';
  }

  const handleAddToCart = () => {
    if (!selectedCor || !selectedTamanho) {
      alert('Selecione uma cor e tamanho.');
      return;
    }

    addToCart({
      ...product,
      selectedCor,
      selectedTamanho,
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 bg-white">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-48 w-auto object-contain"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">R$ {product.price.toFixed(2)}</p>

        {/* 🟢 Cores disponíveis */}
        <div className="flex gap-2 mt-1">
          {variacoesDoProduto.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setSelectedCor(v.cor);
                setSelectedTamanho(null);
              }}
              className={`w-5 h-5 rounded-full border ${selectedCor === v.cor ? 'ring-2 ring-black' : ''}`}
              style={{ backgroundColor: getColorHexFromName(v.cor) }}
              title={v.cor}
            />
          ))}
        </div>

        {/* 🟡 Tamanhos da cor selecionada */}
        {variacaoSelecionada && (
          <div className="flex flex-wrap gap-2 mt-2">
            {variacaoSelecionada.tamanhos.map((t) => (
              <button
                key={t.tamanho}
                onClick={() => setSelectedTamanho(t.tamanho)}
                disabled={t.estoque === 0}
                className={`px-2 py-1 border rounded text-xs ${
                  selectedTamanho === t.tamanho ? 'bg-blue-600 text-white' : 'bg-white'
                } ${t.estoque === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {t.tamanho} ({t.estoque})
              </button>
            ))}
          </div>
        )}

        <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline text-sm">
          Ver detalhes
        </Link>

        <button
          onClick={handleAddToCart}
          className="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 text-sm"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
