export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  thumbnail: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string;
  thumbnail: string;
  quantity: number;
}

export interface PaginatedResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = "https://dummyjson.com";

class ApiService {
  async getProducts(limit = 20, skip = 0): Promise<PaginatedResponse<Product>> {
    try {
      const response = await fetch(
        `${BASE_URL}/products?limit=${limit}&skip=${skip}`
      );

      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);

      if (!response.ok) throw new Error("Failed to fetch product");
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async searchProducts(
    query: string,
    limit = 20
  ): Promise<PaginatedResponse<Product>> {
    try {
      const response = await fetch(
        `${BASE_URL}/products/search?q=${encodeURIComponent(
          query
        )}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Failed to search products");
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async getProductsByCategory(
    category: string,
    limit = 20
  ): Promise<PaginatedResponse<Product>> {
    try {
      const response = await fetch(
        `${BASE_URL}/products/category/${category}?limit=${limit}`
      );
      if (!response.ok) throw new Error("Failed to fetch products by category");
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }
}

export const apiService = new ApiService();
