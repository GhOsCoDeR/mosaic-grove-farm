
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Package, ShoppingBag, Users, Settings } from 'lucide-react';

const AdminIndex = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto py-16 px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-mosaic-green-dark mb-8 animate-fade-in">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/inventory" className="block group">
            <div className="bg-white p-8 rounded-lg border border-mosaic-earth hover:border-mosaic-green hover:shadow-md transition-all duration-300 animate-fade-in">
              <div className="flex items-center">
                <div className="bg-mosaic-earth-light p-4 rounded-full group-hover:bg-mosaic-green transition-colors duration-300">
                  <Package className="h-8 w-8 text-mosaic-green-dark group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">Inventory Management</h2>
                  <p className="text-gray-600">Manage products, stock levels, and pricing</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/orders" className="block group">
            <div className="bg-white p-8 rounded-lg border border-mosaic-earth hover:border-mosaic-green hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center">
                <div className="bg-mosaic-earth-light p-4 rounded-full group-hover:bg-mosaic-green transition-colors duration-300">
                  <ShoppingBag className="h-8 w-8 text-mosaic-green-dark group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">Order Management</h2>
                  <p className="text-gray-600">View and process customer orders</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="#" className="block group">
            <div className="bg-white p-8 rounded-lg border border-mosaic-earth hover:border-mosaic-green hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center">
                <div className="bg-mosaic-earth-light p-4 rounded-full group-hover:bg-mosaic-green transition-colors duration-300">
                  <Users className="h-8 w-8 text-mosaic-green-dark group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">Customer Management</h2>
                  <p className="text-gray-600">Manage customer information and communications</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="#" className="block group">
            <div className="bg-white p-8 rounded-lg border border-mosaic-earth hover:border-mosaic-green hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center">
                <div className="bg-mosaic-earth-light p-4 rounded-full group-hover:bg-mosaic-green transition-colors duration-300">
                  <Settings className="h-8 w-8 text-mosaic-green-dark group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-serif font-bold text-mosaic-green-dark mb-1">System Settings</h2>
                  <p className="text-gray-600">Configure website settings and preferences</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="mt-12 bg-mosaic-green-light p-6 rounded-lg border border-mosaic-green animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Admin Panel Information</h3>
          <p className="mb-4">
            Welcome to the Mosaic Grove admin panel. From here you can manage your inventory, process orders,
            communicate with customers, and configure system settings. This is a restricted area intended for
            authorized personnel only.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminIndex;
