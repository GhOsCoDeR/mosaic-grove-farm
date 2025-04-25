
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import { Eye, ChevronLeft, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

type Order = {
  id: string;
  customerName: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
};

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  processing: { bg: 'bg-blue-100', text: 'text-blue-800' },
  shipped: { bg: 'bg-purple-100', text: 'text-purple-800' },
  delivered: { bg: 'bg-green-100', text: 'text-green-800' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
};

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      date: '2025-04-15',
      status: 'delivered',
      total: 45.97,
      items: 3
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      date: '2025-04-20',
      status: 'processing',
      total: 29.98,
      items: 2
    },
    {
      id: 'ORD-003',
      customerName: 'Robert Johnson',
      date: '2025-04-22',
      status: 'shipped',
      total: 19.99,
      items: 1
    },
    {
      id: 'ORD-004',
      customerName: 'Emily Wilson',
      date: '2025-04-23',
      status: 'pending',
      total: 77.95,
      items: 5
    },
    {
      id: 'ORD-005',
      customerName: 'Michael Brown',
      date: '2025-04-24',
      status: 'cancelled',
      total: 12.99,
      items: 1
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been marked as ${newStatus}.`
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
            Order Management
          </h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-mosaic-earth-light">
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mosaic-earth-light">
                {orders.map((order, index) => (
                  <tr 
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status].bg} ${statusColors[order.status].text}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green hover:text-white transition-colors">
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                        {order.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                          >
                            <Check size={16} className="mr-1" />
                            Process
                          </Button>
                        )}
                        {order.status === 'processing' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                          >
                            <Check size={16} className="mr-1" />
                            Ship
                          </Button>
                        )}
                        {order.status === 'shipped' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors"
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                          >
                            <Check size={16} className="mr-1" />
                            Deliver
                          </Button>
                        )}
                        {(order.status === 'pending' || order.status === 'processing') && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          >
                            <X size={16} className="mr-1" />
                            Cancel
                          </Button>
                        )}
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

export default Orders;
