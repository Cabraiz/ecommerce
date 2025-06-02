import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from "react-router-dom";
import ModalPagamento from './ModalPagamento';
import QRCode from "qrcode";
import Cookies from 'js-cookie';


const Cart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [produtosComprados, setProdutosComprados] = useState<typeof cartItems>([]);
  const [estimativaEntrega, setEstimativaEntrega] = useState<string | null>(null);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);

  const [qrLoading, setQrLoading] = useState(false);
  const [compraLoading, setCompraLoading] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (pagamentoConfirmado) {
      const timeout = setTimeout(() => navigate('/'), 5000);
      return () => clearTimeout(timeout);
    }
  }, [pagamentoConfirmado, navigate]);

  const gerarQRCode = async () => {
  try {
    setQrLoading(true);

    const payloadBody = {
      valor: total,
      descricao: 'Comprador1'
    };

    const resPix = await fetch('https://ecommerce-api-production-df5c.up.railway.app/pagamentos/pix/payload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadBody)
    });

    if (!resPix.ok) throw new Error('Erro ao gerar código Pix');

    const payloadText = await resPix.text();

    // transforma o payload em uma imagem base64 (QR Code visual)
    const qrCodeDataUrl = await QRCode.toDataURL(payloadText);

    setQrCode(qrCodeDataUrl);
    setPixCode(payloadText);
  } catch (err) {
    console.error(err);
    alert('Erro ao gerar código Pix');
  } finally {
    setQrLoading(false);
  }
};



  const gerarEstimativaEntrega = () => {
    const dias = Math.floor(Math.random() * 4) + 2;
    return `${dias} dia${dias > 1 ? 's' : ''} úteis`;
  };

  const handleEscaneado = async () => {
    try {
      setCompraLoading(true);
      await handleComprar();
      setQrCode(null);
      setPixCode(null);
    } finally {
      setCompraLoading(false);
    }
  };

  const handleComprar = async () => {
    try {
      const usuarioId = Cookies.get('usuario_id');

      if (!usuarioId) {
        alert('Usuário não identificado. Faça login novamente.');
        return;
      }

      const payload = cartItems.map(item => ({
        variacaoId: item.product.variacaoId ?? parseInt(item.product.selectedCor),
        tamanho: item.product.selectedTamanho,
        quantidade: item.quantity,
        usuarioId: parseInt(usuarioId)
      }));

      const res = await fetch('https://ecommerce-api-production-df5c.up.railway.app/estoque/reduzir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setProdutosComprados(cartItems);
        setEstimativaEntrega(gerarEstimativaEntrega());
        setPagamentoConfirmado(true);
        clearCart();
      } else {
        const msg = await res.text();
        console.error('❌ Erro na resposta:', msg);
        alert('Erro ao comprar: ' + msg);
      }
    } catch (err) {
      console.error('❌ Erro na requisição:', err);
      alert('Erro inesperado na compra.');
    }
  };


  return (
    <div className="p-8 select-none">
      {cartItems.length === 0 && !pagamentoConfirmado ? (
        <p className="text-gray-500">O carrinho está vazio.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg shadow-sm gap-4">
              <div className="flex items-center gap-4 flex-1">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-contain" />
                <div>
                  <div className="font-semibold">{item.product.name}</div>
                  <div className="text-gray-500 text-sm">R$ {item.product.price.toFixed(2)}</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-end md:items-center justify-end gap-2 md:gap-8 w-full md:w-auto">
                <div className="flex items-center bg-gray-100 rounded-md overflow-hidden shadow-sm">
                  <button onClick={() => decreaseQuantity(item.product)} className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold">-</button>
                  <span className="px-4 py-2 font-semibold text-lg">{item.quantity}</span>
                  <button onClick={() => addToCart(item.product)} className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold">+</button>
                </div>
                <div className="text-xl font-extrabold text-indigo-600 min-w-[100px] text-center">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </div>
                <div className="w-full md:w-auto">
                  <button onClick={() => removeFromCart(item.product)} className="w-full md:w-auto bg-red-500 md:bg-transparent text-white md:text-red-500 py-2 md:py-0 rounded-md md:rounded-none hover:bg-red-600 md:hover:bg-transparent transition-all flex items-center justify-center gap-2" title="Remover">
                    <span className="block md:hidden font-semibold">Remover Item</span>
                    <span className="hidden md:block text-2xl">🗑️</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end text-xl font-bold mt-8">
            Total: R$ {total.toFixed(2)}
          </div>

          <div className="flex justify-end mt-4">
            {qrCode ? (
              <div className="flex flex-col items-end gap-4">
                <img src={qrCode} alt="QR Code Pix" className="w-56 h-56 border-2 border-gray-300 rounded-md shadow-md" />

                {pixCode && (
                  <div className="w-full max-w-md">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Código Pix (copia e cola):</label>
                    <textarea
                      value={pixCode}
                      readOnly
                      className="w-full bg-gray-100 text-gray-700 p-2 rounded-md text-sm font-mono resize-none"
                      rows={4}
                    />
                    <button
                      onClick={() => pixCode && navigator.clipboard.writeText(pixCode)}
                      className="text-sm mt-2 text-blue-600 hover:underline"
                    >
                      Copiar código Pix
                    </button>
                  </div>
                )}

                <button onClick={handleEscaneado} disabled={compraLoading} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-2">
                  {compraLoading ? (
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : 'Escaneado'}
                </button>

                {pagamentoConfirmado && (
                  <div role="alert" aria-live="polite" className="bg-green-50 border border-green-300 text-green-800 p-4 rounded-md shadow-md w-full max-w-md animate-fade-in transition-all duration-500">
                    <h3 className="text-lg font-semibold mb-2">✅ Pagamento confirmado!</h3>
                    <p className="mb-2 text-sm">Sua compra foi processada com sucesso. Os seguintes itens foram adquiridos:</p>
                    <ul className="list-disc list-inside text-sm mb-2">
                      {produtosComprados.map((item, index) => (
                        <li key={index}>{item.quantity}x {item.product.name} ({item.product.selectedTamanho})</li>
                      ))}
                    </ul>
                    {estimativaEntrega && (
                      <p className="text-sm font-medium">🕓 Chegará em: <span className="font-bold">{estimativaEntrega}</span></p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <>
                {!qrCode && !modalAberto && (
                  <button
                    onClick={() => setModalAberto(true)}
                    disabled={cartItems.length === 0 || qrLoading}
                    className={`px-6 py-2 rounded transition text-white flex items-center justify-center gap-2 ${
                      cartItems.length === 0 || qrLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {qrLoading ? (
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : 'Comprar'}
                  </button>
                )}

                {modalAberto && (
                  <ModalPagamento
                    valorTotal={total}
                    onPagamentoSucesso={async () => {
                      await handleComprar();
                      setModalAberto(false);
                    }}
                    onClose={() => setModalAberto(false)}
                    onSelecionarPix={() => {
                      setModalAberto(false);
                      gerarQRCode();
                    }}
                    onSelecionarCartao={() => {}}
                    onSelecionarBoleto={() => {
                      setModalAberto(false);
                      alert('🧾 Simulação: boleto gerado com vencimento em 2 dias úteis.');
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
