
import React from 'react';
import { Product } from '../types/products';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showActions = true,
  className = ""
}) => {
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };
  
  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const categoryName = product.category_name || 
    (product.category && 'name' in product.category ? product.category.name : 'Uncategorized');

  return (
    <div 
      className={`bg-white rounded-lg border border-mosaic-earth overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      onClick={handleViewDetails}
    >
      <div className="h-48 overflow-hidden relative group">
        <img 
          src={product.image_url || '/placeholder.svg'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {showActions && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="bg-white text-mosaic-green-dark p-2 rounded-full mx-1 hover:bg-mosaic-green hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              <Eye size={18} />
            </button>
            <button 
              className="bg-white text-mosaic-green-dark p-2 rounded-full mx-1 hover:bg-mosaic-green hover:text-white transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
            </button>
            <button 
              className={`bg-white p-2 rounded-full mx-1 transition-colors ${
                isInWishlist(product.id)
                  ? 'text-red-500'
                  : 'text-mosaic-green-dark hover:bg-mosaic-green hover:text-white'
              }`}
              onClick={handleToggleWishlist}
            >
              <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-serif font-bold text-mosaic-green-dark">{product.name}</h4>
          <span className="text-mosaic-green font-bold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">{categoryName}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
