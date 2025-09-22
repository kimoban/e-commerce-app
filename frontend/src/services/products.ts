import { ENDPOINTS } from '@config/api';
import ENV from '@config/env';
import type { Product } from '@store/productsSlice';
import { apiFetch } from './http';

export type FetchProductsParams = {
  page: number;
  pageSize: number;
  category?: string;
  search?: string;
  sort?: 'asc' | 'desc';
};

export type FetchProductsResponse = {
  items: Product[];
  total?: number;
};

export async function fetchProducts(params: FetchProductsParams): Promise<FetchProductsResponse> {
  const url = new URL(ENDPOINTS.products, ENV.API_URL);
  url.searchParams.set('page', String(params.page));
  url.searchParams.set('limit', String(params.pageSize));
  if (params.category && params.category !== 'All') url.searchParams.set('category', params.category);
  if (params.search) url.searchParams.set('q', params.search);
  if (params.sort) url.searchParams.set('sort', params.sort === 'asc' ? 'price' : '-price');

  try {
  const res = await apiFetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // Accept various shapes: {items,total} | {data,total} | []
    if (Array.isArray(data)) {
      return { items: data as Product[] };
    }
    if (data.items) return { items: data.items as Product[], total: data.total };
    if (data.data) return { items: data.data as Product[], total: data.total };
    return { items: [] };
  } catch (e) {
    // Fallback mock to keep the UI functional in dev without backend
    const categoryImages: Record<string, any> = {
      Electronics: require('@assets/product-images/Computer.png'),
      Fashion: require('@assets/product-images/canvas shoe.png'),
      Home: require('@assets/product-images/bag.png'),
      Beauty: require('@assets/product-images/camera.png'),
      Accessories: require('@assets/product-images/headphone.png'),
      Automotive: require('@assets/product-images/car.png'),
    };
    const start = (params.page - 1) * params.pageSize;
    const categoriesPool = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Accessories', 'Automotive'] as const;
    const selectedCat = params.category && params.category !== 'All' ? (params.category as any) : null;

    // Generate a larger pool so that search/sort/pagination feel realistic
    const poolSize = 100;
    let pool: Product[] = Array.from({ length: poolSize }).map((_, i) => {
      const id = String(i + 1);
      const cat = (selectedCat && categoriesPool.includes(selectedCat))
        ? selectedCat
        : categoriesPool[Math.floor(Math.random() * categoriesPool.length)];
      const name = `${cat} Item ${id}`;
      const price = Math.floor(Math.random() * 200) + 10;
      return {
        id,
        name,
        price,
        image: categoryImages[cat] || require('@assets/product-images/bag.png'),
        category: cat as string,
      } as Product;
    });

    // Apply search filter
    if (params.search) {
      const q = params.search.toLowerCase();
      pool = pool.filter((p) => p.name.toLowerCase().includes(q));
    }

    // Apply sort
    if (params.sort === 'asc' || params.sort === 'desc') {
      pool.sort((a, b) => params.sort === 'asc' ? a.price - b.price : b.price - a.price);
    }

    // Paginate
    const paged = pool.slice(start, start + params.pageSize);
    return { items: paged, total: pool.length };
  }
}
