import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/data/products';
import { getCache, setCache, removeCache } from '@/utils/cache';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductByCode: (code: string) => Product | undefined;
  getBestsellers: () => Product[];
  getFeatured: () => Product[];
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // 1. Try to get from cache first
      const cached = getCache<Product[]>('products_cache');
      if (cached) {
        setProducts(cached);
        setLoading(false);
        return;
      }

      const { data, error: supabaseError } = await supabase
        .from('products')
        .select('*');

      if (supabaseError) throw supabaseError;

      const mappedProducts = (data || []).map(p => ({
        code: p.code,
        name: p.name || 'Unnamed Piece',
        category: p.category || 'flowers',
        price: p.price || 0,
        description: p.description || '',
        longDescription: p.long_description || '',
        colors: Array.isArray(p.colors) ? p.colors : [],
        occasions: Array.isArray(p.occasions) ? p.occasions : [],
        whatsIncluded: Array.isArray(p.whats_included) ? p.whats_included : [],
        bestseller: !!p.bestseller,
        featured: !!p.featured,
        madeToOrder: !!p.made_to_order,
        customisable: !!p.customisable,
        images: Array.isArray(p.images) ? p.images : [],
        bouquetSize: p.bouquet_size || '',
      }));

      setProducts(mappedProducts);
      setCache('products_cache', mappedProducts);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load product catalog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductByCode = (code: string) => {
    if (!code) return undefined;
    const normalizedCode = code.trim().toLowerCase();
    return products.find(p => p.code?.trim().toLowerCase() === normalizedCode);
  };
  const getBestsellers = () => products.filter(p => p.bestseller);
  const getFeatured = () => products.filter(p => p.featured);

  const refreshProducts = async () => {
    removeCache('products_cache');
    await fetchProducts();
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      getProductByCode,
      getBestsellers,
      getFeatured,
      refreshProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
