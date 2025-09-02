import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface CbakeProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: CbakeProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<CbakeProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('cbake_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
};

  const ensureProfile = async (user: User) => {
    try {
      // Check if a profile already exists
      const { data: existing } = await supabase
        .from('cbake_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existing) {
        const insertPayload: Partial<CbakeProfile> & { user_id: string; email: string } = {
          user_id: user.id,
          email: user.email as string,
          full_name: (user.user_metadata as any)?.full_name || (user.email as string),
          is_admin: false,
        } as any;

        // If this is the very first cbake profile, make them admin
        const { count } = await supabase
          .from('cbake_profiles')
          .select('id', { count: 'exact', head: true });
        if ((count ?? 0) === 0) (insertPayload as any).is_admin = true;

        const { error: insertError } = await supabase
          .from('cbake_profiles')
          .insert(insertPayload);
        if (insertError) {
          console.warn('ensureProfile insert failed', insertError);
        }
      }

      return await fetchProfile(user.id);
    } catch (e) {
      console.warn('ensureProfile failed', e);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch profile data when user is authenticated
          setTimeout(async () => {
            let profileData = await fetchProfile(session.user.id);
            if (!profileData) {
              profileData = await ensureProfile(session.user);
            }
            setProfile(profileData);
            setLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        let profileData = await fetchProfile(session.user.id);
        if (!profileData) {
          profileData = await ensureProfile(session.user);
        }
        setProfile(profileData);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName || email.split('@')[0]
        }
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isAdmin = profile?.is_admin ?? false;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};