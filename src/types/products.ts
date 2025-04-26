
export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductWeight {
  id: string;
  product_id: string;
  weight: number;
  unit: string;
  created_at: string;
  updated_at: string;
}

export interface ProductVariation {
  id: string;
  product_id: string;
  name: string;
  options: Record<string, string[]>;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  inventory_count: number;
  is_featured: boolean | null;
  created_at?: string;
  updated_at?: string;
  
  // Extended properties from related data (not part of the database schema)
  category?: Category;
  weights?: ProductWeight[];
  variations?: ProductVariation[];
  weight?: {
    weight: number;
    unit: string;
  };
  image?: string; // Alias for image_url for backward compatibility
}
