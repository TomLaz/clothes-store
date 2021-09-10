export interface ProductI {//
    categoryId: number;
    color: string;
    createdAt: CreatedAtI;
    description: string;
    id: string;
    imgUrl: string;
    price: number;
    sizes: SizeI[];
    title: string;
    userId: string;
}

export interface CategoryI {
    id: number;
    name: string;
}

export interface FavoritesI {
    id: string;
    products: string[];
}

export interface BasketI {
    id: string;
    products: BasketProductI[];
}

export interface BasketProductI {
    id: string;
    productId: string;
    quantity: string;
    size: string;
}

interface CreatedAtI {
    nanoseconds: number;
    seconds: number;
}

interface SizeI {
    size: string;
    stock: number;
}

export interface FilterI {
    name: string;
    products: string[];
}

export interface MenuItemsI {
    title: string;
    url: string;
}
