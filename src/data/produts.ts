import { Product } from '../types/product';

const API_URL = 'https://ecommerce-api-production-df5c.up.railway.app';

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/produtos`);
    const data = await response.json();

    const products: Product[] = data.map((prod: any) => ({
      id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      imageUrl: `data:${prod.imageType};base64,${prod.image}`,
    }));

    return products;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}
