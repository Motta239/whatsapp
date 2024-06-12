import React, { useState, useEffect, createContext, PropsWithChildren } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '~/utils/supabase';

type AuthProps = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signOut: () => void;
  loading: boolean;
};

export const AuthContext = createContext<Partial<AuthProps>>({});

// Custom hook to read the context values
export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
      setLoading(false);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // Log out the user
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    initialized,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
