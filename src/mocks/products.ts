import { Product } from '../types/product';

// Agora IMPORTANDO as imagens dentro de mocks/mocksImg/
import camisetaImg from './mocksImg/camisa.webp';
import tenisImg from './mocksImg/tenis.webp';
import mochilaImg from './mocksImg/mochila.png'; 

export const products: Product[] = [
  {
    id: '1',
    name: 'Camiseta Básica',
    price: 49.90,
    description: 'Uma camiseta confortável feita de algodão 100%.',
    imageUrl: camisetaImg,
  },
  {
    id: '2',
    name: 'Tênis Esportivo',
    price: 199.90,
    description: 'Ideal para corridas e atividades físicas intensas.',
    imageUrl: tenisImg,
  },
  {
    id: '3',
    name: 'Mochila Casual',
    price: 129.90,
    description: 'Prática e resistente para o dia a dia.',
    imageUrl: mochilaImg,
  },
];
