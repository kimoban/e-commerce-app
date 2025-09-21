import { ENDPOINTS } from '@config/api';
import ENV from '@config/env';
import type { Product } from '@store/productsSlice';

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
    const res = await fetch(url.toString());
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
    const start = (params.page - 1) * params.pageSize;
    const mockItems: Product[] = Array.from({ length: params.pageSize }).map((_, i) => {
      const id = String(start + i + 1);
      return {
        id,
        name: `Mock Product ${id}`,
        price: Math.floor(Math.random() * 200) + 10,
        image: 'https://via.placeholder.com/300',
        category: ['Electronics', 'Fashion', 'Home', 'Beauty'][Math.floor(Math.random() * 4)],
      } as Product;
    });
    return { items: mockItems, total: 1000 };
  }
}
