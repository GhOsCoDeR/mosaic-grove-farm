
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Leaf, Star, ShoppingCart, Heart, Eye, Clock, Tag, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Product, Category } from '../types/products';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async (): Promise<Product[]> => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('*');

  const { data: weights } = await supabase
    .from('product_weights')
    .select('*');

  const { data: variations } = await supabase
    .from('product_variations')
    .select('*');

  // Transform the data to match our Product interface
  return products.map(product => {
    const category = categories?.find(c => c.id === product.category_id);
    const productWeights = weights?.filter(w => w.product_id === product.id) || [];
    const productVariations = variations?.filter(v => v.product_id === product.id) || [];

    // Process variations to ensure options are properly formatted
    const formattedVariations = productVariations.map(v => {
      let parsedOptions: Record<string, string[]> = {};
      
      if (typeof v.options === 'string') {
        try {
          const parsed = JSON.parse(v.options);
          if (parsed && typeof parsed === 'object') {
            parsedOptions = parsed;
          }
        } catch (e) {
          console.error("Failed to parse variation options:", e);
        }
      } else if (v.options && typeof v.options === 'object') {
        parsedOptions = v.options as Record<string, string[]>;
      }

      return {
        ...v,
        options: parsedOptions
      };
    });

    return {
      ...product,
      image: product.image_url,
      category: category || { name: 'Unknown' },
      category_name: category?.name || 'Unknown',
      weights: productWeights,
      variations: formattedVariations,
      weight: productWeights.length > 0 
        ? { 
            weight: productWeights[0].weight, 
            unit: productWeights[0].unit,
            options: productWeights.map(w => w.weight)
          }
        : { options: [0], unit: 'g' },
      weight_options: {
        options: productWeights.map(w => w.weight),
        unit: productWeights.length > 0 ? productWeights[0].unit : 'g'
      },
      variation_options: productVariations.map(v => {
        let options: string[] = [];
        
        if (typeof v.options === 'object' && v.options) {
          if (Array.isArray(v.options)) {
            options = v.options.map(String);
          } else if ('options' in v.options) {
            options = Array.isArray(v.options.options) 
              ? v.options.options.map(String) 
              : [];
          }
        }
        
        return {
          name: v.name,
          options: options
        };
      })
    } as Product;
  });
};

const ProductCard = ({ product, isVisible }: { product: Product, isVisible: boolean }) => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleAddToWishlist = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToWishlist(product);
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };
  
  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className={`product-item bg-white rounded-lg border border-mosaic-earth overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
        isVisible ? 'animate-scale-in opacity-100' : 'opacity-0'
      }`}
      onClick={handleViewDetails}
    >
      <div className="h-48 overflow-hidden relative group">
        <img 
          src={product.image_url || '/placeholder.svg'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.is_flash_sale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center">
            <Zap size={14} className="mr-1" /> FLASH SALE
          </div>
        )}
        {product.is_coming_soon && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center">
            <Clock size={14} className="mr-1" /> COMING SOON
          </div>
        )}
        {product.discount_percent && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center">
            <Tag size={14} className="mr-1" /> {product.discount_percent}% OFF
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="bg-white text-mosaic-green-dark p-2 rounded-full mx-1 hover:bg-mosaic-green hover:text-white transition-colors"
            onClick={(e) => {e.stopPropagation(); handleViewDetails();}}
          >
            <Eye size={18} />
          </button>
          <button 
            className="bg-white text-mosaic-green-dark p-2 rounded-full mx-1 hover:bg-mosaic-green hover:text-white transition-colors"
            onClick={(e) => handleAddToCart(e)}
          >
            <ShoppingCart size={18} />
          </button>
          <button 
            className={`bg-white p-2 rounded-full mx-1 transition-colors ${
              isInWishlist(product.id)
                ? 'text-red-500'
                : 'text-mosaic-green-dark hover:bg-mosaic-green hover:text-white'
            }`}
            onClick={(e) => handleAddToWishlist(e)}
          >
            <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-serif font-bold text-mosaic-green-dark">{product.name}</h4>
          <div>
            {product.discount_percent ? (
              <div className="flex flex-col items-end">
                <span className="text-red-500 font-bold">${(product.price * (1 - product.discount_percent/100)).toFixed(2)}</span>
                <span className="text-gray-400 text-xs line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-mosaic-green font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <Button
          onClick={(e) => handleAddToCart(e)}
          className="w-full bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors flex items-center justify-center gap-2"
          disabled={product.is_coming_soon}
        >
          {product.is_coming_soon ? (
            <>Coming Soon</>
          ) : (
            <><ShoppingCart size={18} /> Add to Cart</>
          )}
        </Button>
      </div>
    </div>
  );
};

const ProductSection = ({ 
  title, 
  products, 
  visibleItems 
}: { 
  title: string, 
  products: Product[],
  visibleItems: string[] 
}) => {
  if (!products || products.length === 0) return null;
  
  return (
    <div className="mb-16">
      <div className="flex items-center mb-6">
        <div className="bg-mosaic-green h-1 flex-grow"></div>
        <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mx-4">{title}</h3>
        <div className="bg-mosaic-green h-1 flex-grow"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id}
            product={product} 
            isVisible={visibleItems.includes(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const featuredProducts = products.filter(product => product.is_featured === true);
  const flashSaleProducts = products.filter(product => product.is_flash_sale === true);
  const comingSoonProducts = products.filter(product => product.is_coming_soon === true);
  const regularProducts = products.filter(product => 
    !product.is_featured && !product.is_flash_sale && !product.is_coming_soon
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id.split('-')[1];
            setVisibleItems(prev => [...prev, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.product-item').forEach(item => {
      observer.observe(item);
    });

    return () => {
      document.querySelectorAll('.product-item').forEach(item => {
        observer.unobserve(item);
      });
    };
  }, [products]);

  const isVisible = (id: string) => visibleItems.includes(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg">Loading products...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg text-red-500">Error loading products. Please try again later.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="bg-mosaic-green-dark text-white py-20 px-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')] bg-cover opacity-20 scale-110 animate-scale-in"></div>
        <div className="container mx-auto text-center max-w-3xl relative z-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our Products
          </h1>
          <p className="text-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover our range of sustainable, organic products grown with care in Ghana
          </p>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-heading text-center mb-12 animate-fade-in">Nutri-Rich Harvests</h2>
          
          {/* Flash Sale Section */}
          <ProductSection 
            title="Flash Sale - Limited Time Offers!" 
            products={flashSaleProducts} 
            visibleItems={visibleItems} 
          />
          
          {/* Featured Products Section */}
          <ProductSection 
            title="Featured Products" 
            products={featuredProducts} 
            visibleItems={visibleItems} 
          />
          
          {/* Regular Products Section */}
          <ProductSection 
            title="Our Organic Products" 
            products={regularProducts} 
            visibleItems={visibleItems} 
          />
          
          {/* Coming Soon Section */}
          <ProductSection 
            title="Coming Soon" 
            products={comingSoonProducts} 
            visibleItems={visibleItems} 
          />
          
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-mosaic-green h-1 flex-grow"></div>
              <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mx-4">Our Flagship Harvest</h3>
              <div className="bg-mosaic-green h-1 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-200 h-80 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1563412580953-7f9e99209336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FzaGV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" 
                  alt="Cashews" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="animate-fade-in">
                <p className="mb-4">
                  Our organic cashews are cultivated on our 100-acre farm in Ghana's Eastern Afram Plains, where we employ sustainable farming practices that preserve the environment while producing premium quality nuts.
                </p>
                <p className="mb-6">
                  Currently, 40 acres have been successfully cultivated, with harvesting already underway. Our cashews are grown without chemical pesticides or fertilizers, resulting in a product that's not only better for you but also for the planet.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>100% Organic</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>Premium Quality</span>
                  </div>
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>Sustainably Grown</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-mosaic-green h-1 flex-grow"></div>
              <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mx-4">Tiger Nuts & Products</h3>
              <div className="bg-mosaic-green h-1 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-1 md:order-2 bg-gray-200 h-80 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bnV0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" 
                  alt="Tiger Nuts" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="order-2 md:order-1 animate-fade-in">
                <p className="mb-4">
                  In 2020, we launched the only tiger nut cooperative farm in Ghana's eastern Kwahu region. Tiger nuts are not actually nuts, but nutrient-rich tubers with numerous health benefits.
                </p>
                <p className="mb-4">
                  Under our subsidiary, Not Nuts, we currently produce organic tiger nut flour from our harvests. This versatile flour is gluten-free, rich in fiber, and packed with essential nutrients.
                </p>
                <p className="mb-6">
                  Soon, we'll be expanding our product line to include innovative tiger nut creations, including plant-based milk, frozen desserts, and baked goods—all bringing the nutritional benefits of tiger nuts to consumers in new and delicious ways.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>Rich in fiber and nutrients</span>
                  </div>
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>Certified organic</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>Naturally gluten-free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-mosaic-green h-1 flex-grow"></div>
              <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mx-4">New Crop Ventures</h3>
              <div className="bg-mosaic-green h-1 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-mosaic-earth rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in">
                <div className="bg-gray-200 h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1626683392018-9578a053b5e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJhZ29uJTIwZnJ1aXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" 
                    alt="Dragon Fruit" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Dragon Fruits</h3>
                  <p>
                    In 2024, we began cultivating dragon fruits, known for their vibrant color, unique taste, and rich nutritional profile. This exotic superfruit is part of our commitment to diversifying sustainable agriculture in Ghana.
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-mosaic-earth rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="bg-gray-200 h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
                    alt="Wambugu Apple" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Wambugu Apples</h3>
                  <p>
                    Sourced from Kenya, Wambugu apples represent our latest agricultural innovation. These unique apples are well-suited to African climates and offer a promising new crop for our sustainable farming initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-mosaic-earth-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843')] bg-cover opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="section-heading animate-fade-in">Health & Environmental Benefits</h2>
          <p className="mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Our commitment to organic farming practices results in products that are not only healthier for consumers but also better for our planet and communities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Organic</h3>
              <p className="text-sm">
                No synthetic pesticides or fertilizers, ensuring pure, chemical-free nutrition.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Sustainable</h3>
              <p className="text-sm">
                Farming practices that preserve soil health and protect local ecosystems.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Nutrient-Rich</h3>
              <p className="text-sm">
                Our products retain maximum nutritional value through careful cultivation and processing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Community-Focused</h3>
              <p className="text-sm">
                Every purchase supports our mission of empowering local farmers and communities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-mosaic-green text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mosaic-green-dark to-mosaic-green opacity-50"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 animate-fade-in">
            Interested in Our Products?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Reach out to learn more about wholesale opportunities, distribution partnerships, or inquire about our current availability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/wishlist" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300 animate-fade-in flex items-center gap-2" style={{ animationDelay: "0.2s" }}>
              <Heart size={18} /> View Wishlist
            </Link>
            <Link to="/contact" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Products;
