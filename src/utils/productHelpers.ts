
import { Product, Category, ProductWeight, ProductVariation, convertProductIdType } from '../types/products';

/**
 * Extends a product with related data
 */
export function extendProduct(
  product: Product, 
  categories?: Category[], 
  weights?: ProductWeight[], 
  variations?: ProductVariation[]
): Product {
  const extendedProduct = { ...product };
  
  // Add category data if available
  if (categories && product.category_id) {
    extendedProduct.category = categories.find(c => c.id === product.category_id) || undefined;
    
    // For backward compatibility with components expecting a category string
    if (extendedProduct.category) {
      extendedProduct.category_name = extendedProduct.category.name;
    }
  }
  
  // Add related weights if available
  if (weights) {
    const productWeights = weights.filter(w => w.product_id === product.id);
    if (productWeights.length > 0) {
      extendedProduct.weights = productWeights;
      
      // Set default weight if available
      if (productWeights[0]) {
        extendedProduct.weight = {
          weight: productWeights[0].weight,
          unit: productWeights[0].unit
        };
      }
      
      // For backward compatibility with components expecting weight options
      const weightOptions = productWeights.map(w => w.weight);
      const unit = productWeights[0]?.unit || 'g';
      extendedProduct.weight_options = {
        options: weightOptions,
        unit
      };
    }
  }
  
  // Add related variations if available
  if (variations) {
    const productVariations = variations.filter(v => v.product_id === product.id);
    if (productVariations.length > 0) {
      extendedProduct.variations = productVariations;
      
      // For backward compatibility with components expecting variation options
      extendedProduct.variation_options = productVariations.map(v => ({
        name: v.name,
        options: Object.values(v.options).flat()
      }));
    }
  }
  
  // For backward compatibility
  extendedProduct.image = product.image_url;
  
  return extendedProduct;
}

/**
 * Format price with proper decimals
 */
export function formatPrice(price: number): string {
  return price.toFixed(2);
}

/**
 * Safely compares product IDs regardless of their type (string or number)
 */
export function isSameProduct(id1: string | number, id2: string | number): boolean {
  return String(id1) === String(id2);
}
