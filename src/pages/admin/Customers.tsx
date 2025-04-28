
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Mail, Phone, MapPin, User, Eye } from 'lucide-react';
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
import { useToast } from '@/components/ui/use-toast';

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  } | null;
  created_at: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<UserProfile | null>(null);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      // Fetch both profiles and auth.users information
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        throw profilesError;
      }

      setCustomers(profiles as UserProfile[]);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customer data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    (customer.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
    (customer.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const viewCustomerDetails = (customer: UserProfile) => {
    setSelectedCustomer(customer);
    setIsCustomerDetailsOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-mosaic-green-dark animate-fade-in">
            Customer Management
          </h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in mb-8" style={{ animationDelay: "0.1s" }}>
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-12 text-center text-gray-500">
                Loading customers...
              </div>
            ) : customers.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                No customers found in the database.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer, index) => (
                    <TableRow 
                      key={customer.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
                    >
                      <TableCell className="font-medium">{customer.name || 'No Name'}</TableCell>
                      <TableCell>{customer.email || 'No Email'}</TableCell>
                      <TableCell>{customer.phone || 'Not provided'}</TableCell>
                      <TableCell>
                        {customer.address?.city && customer.address?.state
                          ? `${customer.address.city}, ${customer.address.state}`
                          : 'Not provided'}
                      </TableCell>
                      <TableCell>{formatDate(customer.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green hover:text-white transition-colors"
                          onClick={() => viewCustomerDetails(customer)}
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          
          {!isLoading && filteredCustomers.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No customers found. Try adjusting your search.
            </div>
          )}
        </div>
      </div>

      {/* Customer Details Dialog */}
      <Dialog open={isCustomerDetailsOpen} onOpenChange={setIsCustomerDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Viewing customer information
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="h-16 w-16 rounded-full bg-mosaic-green-light flex items-center justify-center">
                  <User size={32} className="text-mosaic-green" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{selectedCustomer.name || 'No Name'}</h3>
                  <p className="text-sm text-gray-500">Customer since {formatDate(selectedCustomer.created_at)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p>{selectedCustomer.email || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p>{selectedCustomer.phone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    {selectedCustomer.address ? (
                      <div>
                        <p>{selectedCustomer.address.street || ''}</p>
                        <p>
                          {[
                            selectedCustomer.address.city, 
                            selectedCustomer.address.state, 
                            selectedCustomer.address.zipCode
                          ].filter(Boolean).join(', ')}
                        </p>
                        <p>{selectedCustomer.address.country || ''}</p>
                      </div>
                    ) : (
                      <p>No address provided</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Registration Date</p>
                    <p>{formatDate(selectedCustomer.created_at)}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" onClick={() => setIsCustomerDetailsOpen(false)} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Customers;
