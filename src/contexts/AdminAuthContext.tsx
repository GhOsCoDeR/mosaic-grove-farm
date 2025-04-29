
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
      console.log("Checking admin role for user ID:", userId);
      
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
        console.log("Found admin role:", data.role);
        return data.role as AdminRole;
      }
      
      console.log("No admin role found");
      return false;
    } catch (error) {
      console.error('Exception checking admin role:', error);
      return false;
    }
  };

  const fetchAdminProfile = async (userId: string) => {
    try {
      console.log("Fetching admin profile for user ID:", userId);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching admin profile:', error);
        return { name: 'Admin User', email: null };
      }
      
      console.log("Found admin profile:", profile);
      return profile;
    } catch (error) {
      console.error('Exception fetching admin profile:', error);
      return { name: 'Admin User', email: null };
    }
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event);
        
        if (currentSession?.user) {
          console.log("Session found, user ID:", currentSession.user.id);
          
          // Check if user has admin role
          const role = await checkAdminRole(currentSession.user.id);

          if (role) {
            const profile = await fetchAdminProfile(currentSession.user.id);
            
            setAdmin({
              id: currentSession.user.id,
              username: profile?.name || currentSession.user.email || 'Admin User',
              role: role
            });
            
            console.log("Admin user set:", {
              id: currentSession.user.id,
              username: profile?.name || currentSession.user.email || 'Admin User',
              role: role
            });
          } else {
            setAdmin(null);
            console.log("User is not an admin");
          }
        } else {
          setAdmin(null);
          console.log("No session found");
        }
        
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log("Checking for existing session");
      
      if (currentSession?.user) {
        console.log("Existing session found, user ID:", currentSession.user.id);
        
        // Check if user has admin role
        const role = await checkAdminRole(currentSession.user.id);

        if (role) {
          const profile = await fetchAdminProfile(currentSession.user.id);
          
          setAdmin({
            id: currentSession.user.id,
            username: profile?.name || currentSession.user.email || 'Admin User',
            role: role
          });
          
          console.log("Admin user set from existing session");
        } else {
          setAdmin(null);
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
      console.log("Attempting login with email:", email);
      
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
        console.error("Authentication error:", error);
        setIsLoading(false);
        return false;
      }
      
      if (data.user) {
        console.log("Authentication successful, checking admin role");
        
        // Check if user has admin role
        const role = await checkAdminRole(data.user.id);
        
        if (!role) {
          toast({
            title: "Access Denied",
            description: "You don't have administrator privileges.",
            variant: "destructive",
          });
          console.error("User is not an admin");
          await supabase.auth.signOut();
          setIsLoading(false);
          return false;
        }
        
        const profile = await fetchAdminProfile(data.user.id);
        
        setAdmin({
          id: data.user.id,
          username: profile?.name || data.user.email || 'Admin User',
          role: role
        });
        
        toast({
          title: "Login Successful",
          description: "Welcome to Mosaic Grove Admin Panel!",
        });
        console.log("Admin login successful");
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
      console.error("Login exception:", error);
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
