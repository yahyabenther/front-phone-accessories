import { Category } from './category.model';
import { Brand } from './Brand.model';

export interface Accessory {
  id?: number;
  name: string;
  price: number;
  stock: number;

  category?: Category;
  brand?: Brand;
}