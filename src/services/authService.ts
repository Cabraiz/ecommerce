import axios from 'axios';

// URL base fixa
const API_URL = 'https://ecommerce-api-production-df5c.up.railway.app';

/**
 * Cadastro de novo usuário
 */
export const registerUser = async (nome: string, email: string, senha: string) => {
  const payload = {
    nome,
    email,
    senhaHash: senha, // Atenção: A API espera o campo como "senhaHash"
  };

  const response = await axios.post(`${API_URL}/usuarios`, payload);
  return response.data;
};

/**
 * Login de usuário
 */
export const loginUser = async (email: string, senha: string) => {
  const payload = {
    email,
    senha,
  };

  const response = await axios.post(`${API_URL}/usuarios/login`, payload);
  return response.data;
};
