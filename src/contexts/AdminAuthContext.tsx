
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AdminRole = 'admin' | 'super-admin';

type Admin = {
  id: string;
  username: string;
  role: AdminRole;
};

type AdminAuthContextType = {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user has admin role
  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }

      if (data) {
        return data.role as AdminRole;
      }

      return false;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (currentSession?.user) {
          // Check if user has admin role
          const role = await checkAdminRole(currentSession.user.id);

          if (role) {
            const profile = await supabase
              .from('profiles')
              .select('name, email')
              .eq('id', currentSession.user.id)
              .single();

            setAdmin({
              id: currentSession.user.id,
              username: profile.data?.name || currentSession.user.email || 'Admin User',
              role: role
            });
          } else {
            setAdmin(null);
          }
        } else {
          setAdmin(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      if (currentSession?.user) {
        // Check if user has admin role
        const role = await checkAdminRole(currentSession.user.id);

        if (role) {
          const profile = await supabase
            .from('profiles')
            .select('name, email')
            .eq('id', currentSession.user.id)
            .single();

          setAdmin({
            id: currentSession.user.id,
            username: profile.data?.name || currentSession.user.email || 'Admin User',
            role: role
          });
        }
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }
      
      if (data.user) {
        // Check if user has admin role
        const role = await checkAdminRole(data.user.id);
        
        if (!role) {
          toast({
            title: "Access Denied",
            description: "You don't have administrator privileges.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          setIsLoading(false);
          return false;
        }
        
        const profile = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', data.user.id)
          .single();
        
        setAdmin({
          id: data.user.id,
          username: profile.data?.name || data.user.email || 'Admin User',
          role: role
        });
        
        toast({
          title: "Login Successful",
          description: "Welcome to Mosaic Grove Admin Panel!",
        });
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setAdmin(null);
    await supabase.auth.signOut();
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
