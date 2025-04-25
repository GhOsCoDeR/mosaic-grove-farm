
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-mosaic-earth-light/30 flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-mosaic-green-dark mb-2">Mosaic Grove</h1>
          <p className="text-mosaic-green">Admin Portal</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg border border-mosaic-earth animate-scale-in">
          <h2 className="text-2xl font-serif font-bold text-mosaic-green-dark mb-6 text-center">Admin Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-mosaic-green-dark">Username</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-mosaic-green-dark">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-mosaic-green hover:bg-mosaic-green-dark transition-colors" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Demo credentials: admin / admin123</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-mosaic-green hover:text-mosaic-green-dark transition-colors"
          >
            Return to Mosaic Grove Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
