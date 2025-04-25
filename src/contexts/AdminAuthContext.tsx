
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

type Admin = {
  id: string;
  username: string;
  role: 'admin' | 'super-admin';
};

type AdminAuthContextType = {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Mock admin database for demo purposes
const mockAdmins = [
  { id: 'admin1', username: 'admin', password: 'admin123', role: 'admin' as const },
  { id: 'admin2', username: 'superadmin', password: 'super123', role: 'super-admin' as const }
];

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved admin in localStorage
    const storedAdmin = localStorage.getItem('mosaicAdmin');
    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        setAdmin(parsedAdmin);
      } catch (error) {
        console.error('Failed to parse stored admin:', error);
        localStorage.removeItem('mosaicAdmin');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find admin in mock database
    const foundAdmin = mockAdmins.find(a => a.username === username && a.password === password);
    
    if (foundAdmin) {
      const { password: _, ...adminWithoutPassword } = foundAdmin;
      setAdmin(adminWithoutPassword);
      localStorage.setItem('mosaicAdmin', JSON.stringify(adminWithoutPassword));
      toast({
        title: "Login Successful",
        description: "Welcome to Mosaic Grove Admin Panel!",
      });
      setIsLoading(false);
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid username or password. Please try again.",
      variant: "destructive",
    });
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('mosaicAdmin');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{
      admin,
      isAuthenticated: Boolean(admin),
      isLoading,
      login,
      logout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
