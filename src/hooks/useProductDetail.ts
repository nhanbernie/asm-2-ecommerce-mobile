import { useState, useEffect } from "react";
import { apiService, Product } from "@/services/api";

interface UseProductDetailReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProductDetail = (productId: number): UseProductDetailReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    try {
      const productData = await apiService.getProduct(productId);
      setProduct(productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchProduct();
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return {
    product,
    loading,
    error,
    refetch,
  };
};
