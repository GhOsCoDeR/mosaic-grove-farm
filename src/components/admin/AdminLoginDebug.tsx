
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const AdminLoginDebug = () => {
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<Record<string, any>>({});

  // Function to test admin login
  const checkAdminAccount = async (email: string, password: string) => {
    setIsLoading(true);
    const results: Record<string, any> = {
      authStep: null,
      authError: null,
      userId: null,
      adminRoleStep: null,
      adminRoleError: null,
      adminRole: null,
      profileStep: null,
      profileError: null,
      profile: null,
    };
    
    try {
      // Step 1: Check authentication
      results.authStep = "Started authentication test";
      const { data, error } = await supabase.auth.signInWithPassword({
        email, 
        password
      });
      
      if (error) {
        results.authError = error.message;
        results.authStep = "Authentication failed";
        setDebugInfo(results);
        return;
      }
      
      results.authStep = "Authentication successful";
      results.userId = data.user?.id;
      
      if (!data.user) {
        results.authError = "No user returned from authentication";
        setDebugInfo(results);
        return;
      }
      
      // Step 2: Check admin role
      results.adminRoleStep = "Checking admin role";
      const { data: roleData, error: roleError } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .single();
      
      if (roleError) {
        results.adminRoleError = roleError.message;
        results.adminRoleStep = "Admin role check failed";
        setDebugInfo(results);
        return;
      }
      
      if (!roleData) {
        results.adminRoleError = "No admin role found for this user";
        results.adminRoleStep = "Admin role not found";
        setDebugInfo(results);
        return;
      }
      
      results.adminRoleStep = "Admin role found";
      results.adminRole = roleData.role;
      
      // Step 3: Check profile
      results.profileStep = "Checking user profile";
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) {
        results.profileError = profileError.message;
        results.profileStep = "Profile check failed";
        setDebugInfo(results);
        return;
      }
      
      results.profileStep = "Profile found";
      results.profile = profileData;
      
      setDebugInfo(results);
    } catch (error: any) {
      results.authError = `Exception: ${error.message}`;
      setDebugInfo(results);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdminUsers = async () => {
    setIsLoading(true);
    try {
      // Get admin roles
      const { data: adminRoles, error } = await supabase
        .from('admin_roles')
        .select('user_id, role');
      
      if (error) {
        console.error("Error fetching admin roles:", error);
        return;
      }
      
      // Fetch profiles for each admin
      const admins = [];
      for (const role of adminRoles || []) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', role.user_id)
          .single();
          
        admins.push({
          id: role.user_id,
          role: role.role,
          name: profile?.name || 'Unknown',
          email: profile?.email || 'Unknown'
        });
      }
      
      setAdminUsers(admins);
    } catch (error) {
      console.error("Error fetching admin users:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // This component is only for development/debugging
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-medium mb-4">Admin Login Debugging</h3>
      
      <div className="mb-6">
        <Button 
          onClick={fetchAdminUsers} 
          disabled={isLoading} 
          variant="outline" 
          className="mb-2"
        >
          List Admin Users
        </Button>
        
        {adminUsers.length > 0 ? (
          <div className="mt-2 border rounded p-3">
            <h4 className="font-medium mb-2">Admin Users:</h4>
            <ul className="list-disc pl-5">
              {adminUsers.map((admin) => (
                <li key={admin.id}>
                  {admin.name} ({admin.email}) - {admin.role}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      
      <div className="mb-4">
        <Button 
          onClick={() => checkAdminAccount('admin@mosaicgrove.com', 'admin123')} 
          disabled={isLoading}
          variant="outline"
        >
          Test Demo Admin Login
        </Button>
      </div>
      
      {Object.keys(debugInfo).length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Debug Information:</h4>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-60">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AdminLoginDebug;
