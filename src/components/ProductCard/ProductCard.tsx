import React from 'react';
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

        {/* 🟢 Mostrar variações de cor */}
        {variacoes.length > 0 && (
          <div className="flex gap-2 mt-1">
            {variacoes.map((v) => (
              <div
                key={v.id}
                className="w-5 h-5 rounded-full border"
                title={v.cor}
                style={{
                  backgroundColor: getColorHexFromName(v.cor),
                }}
              />
            ))}
          </div>
        )}

        <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline text-sm">
          Ver detalhes
        </Link>

        <button
          onClick={() => addToCart(product)}
          className="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 text-sm"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};


export default ProductCard;
