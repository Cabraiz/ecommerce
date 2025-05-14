import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const API_URL = 'https://ecommerce-api-production-df5c.up.railway.app';

interface FormCartaoCreditoProps {
  onVoltar: () => void;
  valorTotal: number; // <- você vai passar esse valor do carrinho
  onPagamentoSucesso: () => void; // <- função para limpar carrinho e mostrar sucesso
}

const FormCartaoCredito: React.FC<FormCartaoCreditoProps> = ({ onVoltar, valorTotal, onPagamentoSucesso }) => {
  const [state, setState] = useState<{
    number: string;
    name: string;
    expiry: string;
    cvc: string;
    focus: 'number' | 'name' | 'expiry' | 'cvc' | undefined;
  }>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: undefined,
  });

  const [loading, setLoading] = useState(false);

  const isValidFocus = (value: string): value is 'number' | 'name' | 'expiry' | 'cvc' => {
    return ['number', 'name', 'expiry', 'cvc'].includes(value);
  };

  const handlePagamento = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/pagamentos/cartao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeTitular: state.name,
          numeroCartao: state.number.replace(/\s/g, ''),
          validade: state.expiry,
          cvv: state.cvc,
          valor: valorTotal,
        }),
      });

      if (!response.ok) throw new Error('Falha no pagamento');

      alert('✅ Pagamento com cartão aprovado!');
      onPagamentoSucesso(); // comunica para limpar carrinho e mostrar mensagem
    } catch (err) {
      console.error(err);
      alert('❌ Erro ao processar pagamento com cartão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <Cards
        number={state.number}
        name={state.name}
        expiry={state.expiry}
        cvc={state.cvc}
        focused={state.focus}
      />

      <input
        type="tel"
        name="number"
        className="w-full border rounded px-4 py-3"
        placeholder="Número do cartão"
        value={state.number}
        onChange={(e) => setState({ ...state, number: e.target.value })}
        onFocus={(e) => isValidFocus(e.target.name) && setState({ ...state, focus: e.target.name })}
      />

      <input
        type="text"
        name="name"
        className="w-full border rounded px-4 py-3"
        placeholder="Nome no cartão"
        value={state.name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
        onFocus={(e) => isValidFocus(e.target.name) && setState({ ...state, focus: e.target.name })}
      />

      <div className="flex gap-4">
        <input
          type="text"
          name="expiry"
          className="w-1/2 border rounded px-4 py-3"
          placeholder="Validade (MM/AAAA)"
          value={state.expiry}
          onChange={(e) => setState({ ...state, expiry: e.target.value })}
          onFocus={(e) => isValidFocus(e.target.name) && setState({ ...state, focus: e.target.name })}
        />

        <input
          type="text"
          name="cvc"
          className="w-1/2 border rounded px-4 py-3"
          placeholder="CVV"
          value={state.cvc}
          onChange={(e) => setState({ ...state, cvc: e.target.value })}
          onFocus={(e) => isValidFocus(e.target.name) && setState({ ...state, focus: e.target.name })}
        />
      </div>

      <button
        onClick={handlePagamento}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition font-semibold text-lg"
        disabled={loading}
      >
        {loading ? 'Processando...' : 'Confirmar Pagamento'}
      </button>

      <button
        onClick={onVoltar}
        className="w-full text-sm text-gray-500 hover:text-gray-700 transition"
      >
        Voltar
      </button>
    </div>
  );
};

export default FormCartaoCredito;
