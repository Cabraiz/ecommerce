import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import { VariacaoComTamanhosDTO } from '../../types/variacao';
import { cartIconRef } from '../Navbar/cartIconRef';


interface ProductCardProps {
  product: Product;
  variacoes: VariacaoComTamanhosDTO[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variacoes }) => {
  const { addToCart } = useCart();
  const variacoesDoProduto = variacoes.filter(v => String(v.produtoId) === product.id);
  const primeiraVariacao = variacoesDoProduto[0];
  
  const [selectedVariacaoId, setSelectedVariacaoId] = useState<string | null>(
    primeiraVariacao ? String(primeiraVariacao.id) : null
  );
  
  const [selectedTamanho, setSelectedTamanho] = useState<string | null>(
    primeiraVariacao?.tamanhos?.[0]?.tamanho || null
  );
  
  const variacaoSelecionada = variacoesDoProduto.find(v => String(v.id) === selectedVariacaoId);

  const animateToCart = () => {
    const productImage = document.querySelector(`#product-image-${product.id}`) as HTMLImageElement;
    const cartIcon = cartIconRef.current;
    if (!productImage || !cartIcon) return;
  
    const imgRect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
  
    const flyingImage = productImage.cloneNode(true) as HTMLImageElement;
    flyingImage.style.position = 'fixed';
    flyingImage.style.left = `${imgRect.left}px`;
    flyingImage.style.top = `${imgRect.top}px`;
    flyingImage.style.width = `${imgRect.width}px`;
    flyingImage.style.height = `${imgRect.height}px`;
    flyingImage.style.transition = 'all 0.8s ease-in-out';
    flyingImage.style.zIndex = '1000';
    flyingImage.style.pointerEvents = 'none';
    flyingImage.style.borderRadius = '8px';
    document.body.appendChild(flyingImage);
  
    requestAnimationFrame(() => {
      flyingImage.style.left = `${cartRect.left + cartRect.width / 2 - 15}px`;
      flyingImage.style.top = `${cartRect.top + cartRect.height / 2 - 15}px`;
      flyingImage.style.width = '30px';
      flyingImage.style.height = '30px';
      flyingImage.style.opacity = '0.1';
      flyingImage.style.transform = 'rotate(20deg)';
    });
  
    setTimeout(() => {
      flyingImage.remove();
    }, 800);
  };
  

  useEffect(() => {
    if (variacoesDoProduto.length > 0 && !selectedVariacaoId) {
      const primeira = variacoesDoProduto[0];
      setSelectedVariacaoId(String(primeira.id));
      setSelectedTamanho(primeira.tamanhos?.[0]?.tamanho || null);
    }
  }, [variacoesDoProduto, selectedVariacaoId]);  

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
    if (!selectedVariacaoId || !selectedTamanho) {
      alert('Selecione uma cor e tamanho.');
      return;
    }

    animateToCart();

    addToCart({
      ...product,
      selectedCor: selectedVariacaoId, // ← ID da variação, que você usará no backend
      selectedTamanho,
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all flex flex-col">
      {/* Parte não interativa */}
      <div className="flex-1 flex items-center justify-center p-4 bg-white select-none pointer-events-none">
        <img
          id={`product-image-${product.id}`}
          src={product.imageUrl}
          alt={product.name}
          className="max-h-48 w-auto object-contain"
          draggable={false}
        />
      </div>
  
      {/* Conteúdo inferior com interatividade seletiva */}
      <div className="p-4 flex flex-col gap-2 items-end text-right select-none">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">R$ {product.price.toFixed(2)}</p>
  
        {/* Botões de cor (interativos) */}
        <div className="flex gap-2 mt-1 pointer-events-auto">
          {variacoesDoProduto.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setSelectedVariacaoId(String(v.id));
                setSelectedTamanho(null);
              }}
              className={`w-5 h-5 rounded-full border ${
                String(v.id) === selectedVariacaoId ? 'ring-2 ring-black' : ''
              }`}
              style={{ backgroundColor: getColorHexFromName(v.cor) }}
              title={v.cor}
            />
          ))}
        </div>
  
        {/* Botões de tamanho (interativos) */}
        {variacaoSelecionada && (
          <div className="flex flex-wrap gap-2 mt-2 pointer-events-auto">
            {variacaoSelecionada.tamanhos.map((t) => (
              <button
                key={t.tamanho}
                onClick={() => setSelectedTamanho(t.tamanho)}
                disabled={t.estoque === 0}
                className={`px-2 py-1 border rounded text-xs 
                  ${selectedTamanho === t.tamanho ? 'bg-blue-600 text-white' : 'bg-white'} 
                  ${t.estoque === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {t.tamanho} ({t.estoque})
              </button>
            ))}
          </div>
        )}
  
        {/* Link e botão: interativos */}
        <Link
          to={`/product/${product.id}`}
          className="text-blue-600 hover:underline text-sm pointer-events-auto"
        >
          Ver detalhes
        </Link>
  
        <button
          onClick={handleAddToCart}
          className="mt-2 bg-green-600 text-white py-2 w-full rounded hover:bg-green-700 text-sm font-semibold transition pointer-events-auto"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
  
};

export default ProductCard;
