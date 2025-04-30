import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/product';

interface ProductListProps {
  products: Product[];
  totalCount: number;
}

const ProductList: React.FC<ProductListProps> = ({ products, totalCount }) => {
  const filled = new Array(totalCount).fill(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filled.map((_, i) =>
        products[i] ? (
          <div
            key={products[i].id}
            className="opacity-0 animate-fade-in"
            style={{
              animationDelay: `${i * 100}ms`,
              animationFillMode: 'forwards',
            }}
          >
            <ProductCard product={products[i]} />
          </div>
        ) : (
          <SkeletonCard key={i} />
        )
      )}
    </div>
  );
};

export default ProductList;

// ⬇️ Estilização do esqueleto
const SkeletonCard = () => (
  <div
    className="border rounded-lg overflow-hidden shadow-md flex flex-col animate-pulse"
    aria-hidden="true"
  >
    <div className="h-48 bg-gray-200" />
    <div className="p-4 flex flex-col gap-2">
      <div className="w-2/3 h-5 bg-gray-300 rounded" />
      <div className="w-1/3 h-4 bg-gray-300 rounded" />
      <span className="text-blue-400 text-sm select-none">Ver detalhes</span>
      <button
        disabled
        className="mt-2 bg-green-600 text-white py-1 px-3 rounded text-sm opacity-50 pointer-events-none"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  </div>
);
