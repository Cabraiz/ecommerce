import React from 'react';

interface ModalPagamentoProps {
  onClose: () => void;
  onSelecionarPix: () => void;
  onSelecionarCartao: () => void;
  onSelecionarBoleto: () => void;
}

const ModalPagamento: React.FC<ModalPagamentoProps> = ({
  onClose,
  onSelecionarPix,
  onSelecionarCartao,
  onSelecionarBoleto,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 animate-fade-in border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center tracking-tight">
          Escolha a forma de pagamento
        </h2>

        <div className="space-y-3">
          <button
            onClick={onSelecionarPix}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition font-medium text-lg"
          >
            Pagar com Pix
          </button>

          <button
            onClick={onSelecionarCartao}
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
