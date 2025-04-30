// types/product.ts
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

export interface ProductInCart extends Product {
    selectedCor: string;
    selectedTamanho: string;
}