export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    sku?: string;
    warrantyInformation?: string;
    shippingInformation?: string;
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface FilterState {
    searchQuery: string;
    category: string;
    maxPrice: number;
    minRating: number;
    sortBy: string;
}