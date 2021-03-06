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

export interface Filter {
    name: string;
    products: string[];
}

export interface ProductProperties {
    id: string;
    productId: string;
    quantity: string;
    size: string;
}
