import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart } from '../../contexts/CartContext'; // <-- Importa o context

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart(); // <-- Usar o hook aqui

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
