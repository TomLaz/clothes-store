export interface MenuItems {
    url: string;
    title: string;
}

export interface Product {
    categoryId: number;
    createdAt: CreatedAtType;
    description: string;
    id: string;
    imgUrl: string;
    price: number;
    subcategoryId: number;
    title: string;
    userId: string;
    sizes: Size[];
    color: string;
}

type CreatedAtType = {
    nanoseconds: number;
    seconds: number;
}

type Size = {
    size: string;
    stock: number;
}

export interface Category {
    id: number;
    name: string;
    createdAt: CreatedAtType;
}

export interface SubCategory {
    id: number;
    categoryId: number;
    name: string;
    createdAt: CreatedAtType;
}

export interface Favourite {
    createdAt: CreatedAtType;
    id: string;
    products: string[];
}

export interface Filter {
    name: string;
    products: string[];
}

export interface ProductToBuy {
    createdAt: CreatedAtType;
    id: string;
    products: ProductProperties[]
}

export interface ProductProperties {
    id: string;
    productId: string;
    quantity: string;
    size: string;
}

export interface BasketProducts {
    createdAt: CreatedAtType;
    id: string;
    products: ProductProperties[]
}
