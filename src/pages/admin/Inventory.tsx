
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash, ChevronLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
};

const Inventory = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Organic Cashews",
      price: 12.99,
      category: "Nuts",
      stock: 250,
      image: "https://images.unsplash.com/photo-1563412580953-7f9e99209336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FzaGV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      id: 2,
      name: "Tiger Nut Flour",
      price: 9.99,
      category: "Flour",
      stock: 175,
      image: "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmxvdXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      id: 3,
      name: "Tiger Nut Milk",
      price: 6.99,
      category: "Beverages",
      stock: 120,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGxhbnQlMjBtaWxrfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    },
    {
      id: 4,
      name: "Tiger Nut Dessert",
      price: 8.99,
      category: "Dessert",
      stock: 85,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    }
  ]);

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed from inventory.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto py-16 px-4 max-w-6xl">
        <div className="mb-6">
          <Link to="/admin" className="inline-flex items-center text-mosaic-green hover:text-mosaic-green-dark transition-colors">
            <ChevronLeft size={20} />
            <span className="ml-1">Back to Dashboard</span>
          </Link>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-mosaic-green-dark animate-fade-in">
            Inventory Management
          </h1>
          <Button className="bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors animate-fade-in">
            <Plus size={20} className="mr-2" />
            Add New Product
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-mosaic-earth-light">
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mosaic-earth-light">
                {products.map((product, index) => (
                  <tr 
                    key={product.id} 
                    className="hover:bg-gray-50 transition-colors"
                    style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.stock > 100 
                          ? 'bg-green-100 text-green-800' 
                          : product.stock > 50 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green hover:text-white transition-colors">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Inventory;
