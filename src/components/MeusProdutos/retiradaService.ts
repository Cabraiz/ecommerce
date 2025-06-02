import axios from 'axios';

const API_URL = 'https://ecommerce-api-production-df5c.up.railway.app'; // Altere para a URL real se necessário

export const buscarRetiradasPorUsuario = async (usuarioId: number) => {
  const response = await axios.get(`${API_URL}/retiradas/usuario/${usuarioId}`);
  return response.data;
};
