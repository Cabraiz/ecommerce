import React, { useState } from 'react';
import FormCartaoCredito from './FormCartaoCredito';

interface ModalPagamentoProps {
  onClose: () => void;
  onSelecionarPix: () => void;
  onSelecionarCartao: () => void;
  onSelecionarBoleto: () => void;
  valorTotal: number;
  onPagamentoSucesso: () => void;
  loadingPix?: boolean; // opcional: mostra spinner no botão Pix
}

const ModalPagamento: React.FC<ModalPagamentoProps> = ({
  onClose,
  onSelecionarPix,
  onSelecionarCartao,
  onSelecionarBoleto,
  valorTotal,
  onPagamentoSucesso,
  loadingPix = false,
}) => {
  const [modoCartao, setModoCartao] = useState(false);

  const handleSelecionarCartao = () => {
    setModoCartao(true);
    onSelecionarCartao();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 animate-fade-in border border-gray-200">
        {!modoCartao ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center tracking-tight">
              Escolha a forma de pagamento
            </h2>

            <div className="space-y-3">
              <button
                onClick={onSelecionarPix}
                disabled={loadingPix}
                className={`w-full py-3 rounded-lg shadow font-medium text-lg flex items-center justify-center gap-2 transition text-white ${
                  loadingPix
                    ? 'bg-green-400 cursor-wait'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                }`}
              >
                {loadingPix ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l2-2m0 0l2-2m-2 2v6m-4 4h8a2 2 0 002-2v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5a2 2 0 002 2z" />
                    </svg>
                    Pagar com Pix (QR Code + Código)
                  </>
                )}
              </button>

              <button
                onClick={handleSelecionarCartao}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 rounded-lg shadow hover:from-indigo-600 hover:to-indigo-700 transition font-medium text-lg"
              >
                Pagar com Cartão de Crédito
              </button>

              <button
                onClick={onSelecionarBoleto}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg shadow hover:from-yellow-600 hover:to-yellow-700 transition font-medium text-lg"
              >
                Gerar Boleto Bancário
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Preencha os dados do cartão</h2>
            <FormCartaoCredito
              valorTotal={valorTotal}
              onPagamentoSucesso={() => {
                setModoCartao(false);
                onPagamentoSucesso();
              }}
              onVoltar={() => setModoCartao(false)}
            />
          </>
        )}

        <button
          onClick={onClose}
          className="mt-6 block w-full text-center text-gray-500 hover:text-gray-700 text-sm transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalPagamento;
