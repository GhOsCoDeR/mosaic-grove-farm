
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Leaf, Star } from 'lucide-react';

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-mosaic-green-dark text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our Products
          </h1>
          <p className="text-xl">
            Discover our range of sustainable, organic products grown with care in Ghana
          </p>
        </div>
      </section>
      
      {/* Product Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-heading text-center mb-12">Nutri-Rich Harvests</h2>
          
          {/* Cashew Products */}
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-mosaic-green h-1 flex-grow"></div>
              <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mx-4">Organic Cashews</h3>
              <div className="bg-mosaic-green h-1 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-200 h-80 rounded-lg">
                {/* Placeholder for cashew image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Cashew Image
                </div>
              </div>
              <div>
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
          
          {/* Tiger Nut Products */}
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-mosaic-green h-1 flex-grow"></div>
              <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mx-4">Tiger Nuts & Products</h3>
              <div className="bg-mosaic-green h-1 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-1 md:order-2 bg-gray-200 h-80 rounded-lg">
                {/* Placeholder for tiger nut image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Tiger Nut Image
                </div>
              </div>
              <div className="order-2 md:order-1">
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
            
            {/* Tiger Nut Products Grid */}
            <div className="mt-12">
              <h4 className="text-xl font-serif font-semibold text-mosaic-green mb-6">Tiger Nut Product Range</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-mosaic-earth-light rounded-lg p-6">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4">
                    {/* Placeholder for tiger nut flour image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Tiger Nut Flour Image
                    </div>
                  </div>
                  <h5 className="font-serif font-bold text-mosaic-green-dark mb-2">Organic Tiger Nut Flour</h5>
                  <p className="text-sm">
                    Our signature product, perfect for gluten-free baking and adding nutritional value to smoothies and recipes.
                  </p>
                </div>
                
                <div className="bg-mosaic-earth-light rounded-lg p-6">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4">
                    {/* Placeholder for tiger nut milk image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Tiger Nut Milk Image (Coming Soon)
                    </div>
                  </div>
                  <h5 className="font-serif font-bold text-mosaic-green-dark mb-2">Tiger Nut Milk <span className="text-mosaic-green text-xs ml-1">(Coming Soon)</span></h5>
                  <p className="text-sm">
                    Creamy plant-based milk alternative rich in nutrients and natural sweetness.
                  </p>
                </div>
                
                <div className="bg-mosaic-earth-light rounded-lg p-6">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4">
                    {/* Placeholder for tiger nut dessert image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Tiger Nut Desserts Image (Coming Soon)
                    </div>
                  </div>
                  <h5 className="font-serif font-bold text-mosaic-green-dark mb-2">Tiger Nut Desserts <span className="text-mosaic-green text-xs ml-1">(Coming Soon)</span></h5>
                  <p className="text-sm">
                    Frozen treats and baked delights featuring the unique flavor and nutrition of tiger nuts.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* New Crops Section */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-mosaic-green h-1 flex-grow"></div>
              <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mx-4">New Crop Ventures</h3>
              <div className="bg-mosaic-green h-1 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-mosaic-earth rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-200 h-48">
                  {/* Placeholder for dragon fruit image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Dragon Fruit Image
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Dragon Fruits</h3>
                  <p>
                    In 2024, we began cultivating dragon fruits, known for their vibrant color, unique taste, and rich nutritional profile. This exotic superfruit is part of our commitment to diversifying sustainable agriculture in Ghana.
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-mosaic-earth rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-200 h-48">
                  {/* Placeholder for Wambugu apple image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Wambugu Apple Image
                  </div>
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
      
      {/* Product Benefits */}
      <section className="py-16 px-4 bg-mosaic-earth-light">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="section-heading">Health & Environmental Benefits</h2>
          <p className="mb-12">
            Our commitment to organic farming practices results in products that are not only healthier for consumers but also better for our planet and communities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Organic</h3>
              <p className="text-sm">
                No synthetic pesticides or fertilizers, ensuring pure, chemical-free nutrition.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Sustainable</h3>
              <p className="text-sm">
                Farming practices that preserve soil health and protect local ecosystems.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Nutrient-Rich</h3>
              <p className="text-sm">
                Our products retain maximum nutritional value through careful cultivation and processing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-mosaic-green text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Interested in Our Products?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Reach out to learn more about wholesale opportunities, distribution partnerships, or inquire about our current availability.
          </p>
          <a href="/contact" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300">
            Contact Us
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Products;
