import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Eye, Check, X, Search, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';

type OrderProduct = {
  name: string;
  quantity: number;
  price: number;
  variation?: string;
  weight?: string;
};

type Order = {
  id: string;
  customerName: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  email?: string;
  phone?: string;
  address?: string;
  products?: OrderProduct[];
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState<keyof Order>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id, 
          created_at, 
          status, 
          total_amount, 
          shipping_address, 
          payment_status, 
          user_id
        `)
        .order('created_at', { ascending: false });

      if (ordersError) {
        throw ordersError;
      }

      // Fetch profiles separately to avoid relation errors
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, email, phone');

      const formattedOrders: Order[] = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: orderItems, error: itemsError } = await supabase
            .from('order_items')
            .select(`
              id, 
              quantity, 
              unit_price, 
              selected_variations, 
              selected_weight,
              products(name)
            `)
            .eq('order_id', order.id);

          if (itemsError) {
            console.error('Error fetching order items:', itemsError);
            return null;
          }

          const products = orderItems.map(item => ({
            name: item.products?.name || 'Unknown Product',
            quantity: item.quantity,
            price: item.unit_price,
            variation: item.selected_variations ? JSON.stringify(item.selected_variations) : undefined,
            weight: item.selected_weight ? `${item.selected_weight}` : undefined,
          }));

          const shippingAddress = order.shipping_address ? 
            typeof order.shipping_address === 'string' ? 
              JSON.parse(order.shipping_address) : order.shipping_address : {};
          
          const addressString = shippingAddress ? 
            `${shippingAddress.street || ''}, ${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.zipCode || ''}` : 
            'No address provided';

          // Find user profile by user_id
          const userProfile = profiles?.find(p => p.id === order.user_id);

          return {
            id: order.id,
            customerName: userProfile?.name || 'Unknown Customer',
            date: new Date(order.created_at).toLocaleDateString(),
            status: order.status as Order['status'],
            total: order.total_amount,
            items: orderItems.length,
            email: userProfile?.email || 'No email',
            phone: userProfile?.phone || 'No phone',
            address: addressString,
            products
          };
        })
      );

      setOrders(formattedOrders.filter(Boolean) as Order[]);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const filteredOrders = orders
    .filter(order => 
      (order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())) && 
      (statusFilter === 'all' || order.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortColumn === 'customerName' || sortColumn === 'id') {
        return sortDirection === 'asc' 
          ? a[sortColumn].localeCompare(b[sortColumn]) 
          : b[sortColumn].localeCompare(a[sortColumn]);
      } else if (sortColumn === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortDirection === 'asc' 
          ? Number(a[sortColumn]) - Number(b[sortColumn]) 
          : Number(b[sortColumn]) - Number(a[sortColumn]);
      }
    });

  const handleSort = (column: keyof Order) => {
    setSortDirection(prevDirection => 
      sortColumn === column && prevDirection === 'asc' ? 'desc' : 'asc'
    );
    setSortColumn(column);
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) {
        throw error;
      }

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      toast({
        title: "Order Status Updated",
        description: `Order ${orderId} has been marked as ${newStatus}.`
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4 max-w-6xl">        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-mosaic-green-dark animate-fade-in">
            Order Management
          </h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in mb-8" style={{ animationDelay: "0.1s" }}>
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by order ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-12 text-center text-gray-500">
                Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                No orders found in the database.
              </div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-mosaic-earth-light">
                    <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('id')}
                      >
                        Order ID
                        {sortColumn === 'id' && (
                          sortDirection === 'asc' 
                            ? <ArrowUp size={14} className="ml-1" /> 
                            : <ArrowDown size={14} className="ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('customerName')}
                      >
                        Customer
                        {sortColumn === 'customerName' && (
                          sortDirection === 'asc' 
                            ? <ArrowUp size={14} className="ml-1" /> 
                            : <ArrowDown size={14} className="ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('date')}
                      >
                        Date
                        {sortColumn === 'date' && (
                          sortDirection === 'asc' 
                            ? <ArrowUp size={14} className="ml-1" /> 
                            : <ArrowDown size={14} className="ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('total')}
                      >
                        Total
                        {sortColumn === 'total' && (
                          sortDirection === 'asc' 
                            ? <ArrowUp size={14} className="ml-1" /> 
                            : <ArrowDown size={14} className="ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">
                      <button 
                        className="flex items-center"
                        onClick={() => handleSort('items')}
                      >
                        Items
                        {sortColumn === 'items' && (
                          sortDirection === 'asc' 
                            ? <ArrowUp size={14} className="ml-1" /> 
                            : <ArrowDown size={14} className="ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-mosaic-green-dark">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mosaic-earth-light">
                  {filteredOrders.map((order, index) => (
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
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green hover:text-white transition-colors"
                            onClick={() => {
                              setViewingOrder(order);
                              setIsViewOrderOpen(true);
                            }}
                          >
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
            )}
          </div>
          
          {!isLoading && filteredOrders.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No orders found. Try adjusting your search or filter.
            </div>
          )}
        </div>
      </div>

      <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Viewing order information for {viewingOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {viewingOrder && (
            <div className="mt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-2">Customer Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {viewingOrder.customerName}</p>
                    <p><span className="font-medium">Email:</span> {viewingOrder.email}</p>
                    <p><span className="font-medium">Phone:</span> {viewingOrder.phone}</p>
                    <p><span className="font-medium">Address:</span> {viewingOrder.address}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Order Summary</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Order ID:</span> {viewingOrder.id}</p>
                    <p><span className="font-medium">Date:</span> {viewingOrder.date}</p>
                    <p>
                      <span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${statusColors[viewingOrder.status].bg} ${statusColors[viewingOrder.status].text}`}>
                        {viewingOrder.status.charAt(0).toUpperCase() + viewingOrder.status.slice(1)}
                      </span>
                    </p>
                    <p><span className="font-medium">Total:</span> ${viewingOrder.total.toFixed(2)}</p>
                    <p><span className="font-medium">Items:</span> {viewingOrder.items}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-3">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Variation</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewingOrder.products?.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.variation || 'N/A'}</TableCell>
                        <TableCell>{product.weight || 'N/A'}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(product.price * product.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={5} className="text-right font-bold">
                        Grand Total:
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ${viewingOrder.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsViewOrderOpen(false)}
                >
                  Close
                </Button>
                {viewingOrder.status === 'pending' && (
                  <Button 
                    variant="default" 
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      updateOrderStatus(viewingOrder.id, 'processing');
                      setIsViewOrderOpen(false);
                    }}
                  >
                    Process Order
                  </Button>
                )}
                {viewingOrder.status === 'processing' && (
                  <Button 
                    variant="default" 
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={() => {
                      updateOrderStatus(viewingOrder.id, 'shipped');
                      setIsViewOrderOpen(false);
                    }}
                  >
                    Mark as Shipped
                  </Button>
                )}
                {viewingOrder.status === 'shipped' && (
                  <Button 
                    variant="default" 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      updateOrderStatus(viewingOrder.id, 'delivered');
                      setIsViewOrderOpen(false);
                    }}
                  >
                    Mark as Delivered
                  </Button>
                )}
                {(viewingOrder.status === 'pending' || viewingOrder.status === 'processing') && (
                  <Button 
                    variant="default" 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => {
                      updateOrderStatus(viewingOrder.id, 'cancelled');
                      setIsViewOrderOpen(false);
                    }}
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Orders;
