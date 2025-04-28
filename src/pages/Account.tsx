
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { User, Mail, Phone, MapPin, LogOut, Package } from 'lucide-react';

const Account = () => {
  const { user, profile, isAuthenticated, isLoading, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
      
      if (profile.address) {
        setAddress({
          street: profile.address.street || '',
          city: profile.address.city || '',
          state: profile.address.state || '',
          zipCode: profile.address.zipCode || '',
          country: profile.address.country || 'United States'
        });
      }
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gray-50 py-12">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateProfile({
        name,
        phone,
        address
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-mosaic-green-dark">My Account</h1>
            <p className="text-gray-600">Manage your profile and orders</p>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile" className="text-base">Profile</TabsTrigger>
              <TabsTrigger value="orders" className="text-base">Orders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile}>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <Input
                                id="name"
                                placeholder="Your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <Input
                                id="email"
                                type="email"
                                disabled
                                value={email}
                                className="pl-10 bg-gray-100"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="Your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <MapPin className="mr-2 text-mosaic-green" size={18} />
                            Address Information
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="street">Street Address</Label>
                              <Input
                                id="street"
                                placeholder="Street address"
                                value={address.street}
                                onChange={(e) => setAddress({...address, street: e.target.value})}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  placeholder="City"
                                  value={address.city}
                                  onChange={(e) => setAddress({...address, city: e.target.value})}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                  id="state"
                                  placeholder="State"
                                  value={address.state}
                                  onChange={(e) => setAddress({...address, state: e.target.value})}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input
                                  id="zipCode"
                                  placeholder="Zip code"
                                  value={address.zipCode}
                                  onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                  id="country"
                                  placeholder="Country"
                                  value={address.country}
                                  onChange={(e) => setAddress({...address, country: e.target.value})}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          type="submit" 
                          className="bg-mosaic-green hover:bg-mosaic-green-dark transition-colors"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium">{email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Account ID</p>
                      <p className="font-mono text-xs break-all">{user?.id}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Account Created</p>
                      <p className="font-medium">
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline"
                      className="w-full text-red-600 hover:text-white hover:bg-red-600 border-red-200"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Package className="mr-2 text-mosaic-green" />
                    <CardTitle>My Orders</CardTitle>
                  </div>
                  <CardDescription>View your order history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-mosaic-green text-mosaic-green hover:bg-mosaic-green hover:text-white"
                      onClick={() => window.location.href = '/products'}
                    >
                      Browse Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account;
