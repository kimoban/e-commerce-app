// Order type/interface
import type { Product } from './product';
export interface Order { id: string; userId: string; products: Product[]; total: number; }