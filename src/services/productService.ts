import axios from 'axios';

/**
 * Busca todos os produtos cadastrados no sistema.
 * URL fixa: https://ecommerce-api-production-df5c.up.railway.app/produtos
 */
export const getProdutos = async () => {
  const response = await axios.get('https://ecommerce-api-production-df5c.up.railway.app/produtos');
  return response.data;
};
