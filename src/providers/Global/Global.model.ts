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
    categoryId: number;
    name: string;
    createdAt: CreatedAtType;
}

export interface Favourite {
    createdAt: CreatedAtType;
    id: string;
    products: any[];
}

// export interface TempCategory {
//     createdAt: CreatedAtType;
//     id: string;
//     name: string;
//     products: string[];
// }

export interface Filter {
    name: string;
    products: string[];
}
