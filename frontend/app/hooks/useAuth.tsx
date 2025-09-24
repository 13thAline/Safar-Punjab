// frontend/app/hooks/useAuth.ts
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const TOKEN_KEY = 'my-jwt';

// 1. Define a TypeScript interface for the shape of your context's value.
interface AuthContextType {
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

// 2. Create the context with the type and a default value.
const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  session: null,
  isLoading: false,
});

// This is the hook you'll use to access the session in your components
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          setSession(token);
        }
      } catch (e) {
        // Handle error, maybe log it
      } finally {
        setIsLoading(false);
      }
    }
    loadSession();
  }, []);

  const authValue: AuthContextType = {
    signIn: (token: string) => {
      setSession(token);
      SecureStore.setItemAsync(TOKEN_KEY, token);
    },
    signOut: () => {
      setSession(null);
      SecureStore.deleteItemAsync(TOKEN_KEY);
      router.replace('/login');
    },
    session,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
}