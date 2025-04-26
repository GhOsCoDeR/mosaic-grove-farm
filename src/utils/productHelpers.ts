
import { Product, Category, ProductWeight, ProductVariation } from '../types/products';

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
    }
  }
  
  // Add related variations if available
  if (variations) {
    const productVariations = variations.filter(v => v.product_id === product.id);
    if (productVariations.length > 0) {
      extendedProduct.variations = productVariations;
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
