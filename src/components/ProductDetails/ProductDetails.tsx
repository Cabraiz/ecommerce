import React from 'react';
import { Product } from '../../types/product';
import VariacoesDisplay from './VariacoesDisplay';
import { VariacaoComTamanhosDTO } from '../../types/variacao';

interface ProductDetailsProps {
  product: Product;
  variacoes: VariacaoComTamanhosDTO[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, variacoes }) => {
  const variacoesDoProduto = variacoes.filter(v => String(v.produtoId) === product.id);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 object-cover" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-green-600">R$ {product.price.toFixed(2)}</p>
        <p className="text-gray-600">{product.description}</p>

        {/* ✅ Exibe as variações já passadas via props */}
        <VariacoesDisplay variacoes={variacoesDoProduto} />

        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
