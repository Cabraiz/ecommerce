// src/data/getProductCount.ts
const API_URL = 'https://ecommerce-api-production-df5c.up.railway.app';

export async function getProductCount(): Promise<number> {
  const cached = localStorage.getItem('productCount');
  if (cached) return parseInt(cached);

  const response = await fetch(`${API_URL}/produtos/ativos/quantidade`);
  const count = await response.json();
  localStorage.setItem('productCount', count.toString());
  return count;
}
