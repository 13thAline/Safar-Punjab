import { useRouter, useSegments } from "expo-router";
import React from "react";
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContext = React.createContext<{
  signIn: (email?: string, password?: string) => Promise<any>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(null),
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = React.useState<[boolean, string | null]>([true, null]);
  const router = useRouter();
  const segments = useSegments();

  React.useEffect(() => {
    SecureStore.getItemAsync('session').then(session => {
      setSession([false, session]);
    });
  }, []);

  // ============ REPLACED THIS ENTIRE HOOK ============
  React.useEffect(() => {
    // Prevent redirects until the session is finished loading
    if (isLoading) {
      return;
    }

    const inTabsGroup = segments[0] === "(tabs)";

    // If the user is not signed in and the initial segment is not '(tabs)',
    // redirect them to the login page.
    if (!session && !inTabsGroup) {
      router.replace("/login");
    }
    // If the user is signed in and the initial segment is '(tabs)' (e.g., they are on the login page),
    // redirect them to the main driver screen.
    else if (session && inTabsGroup) {
      router.replace("/driver-live");
    }
  }, [session, segments, isLoading]);
  // ======================================================


  return (
    <AuthContext.Provider
      value={{
        signIn: async (email?: string, password?: string) => {
          try {
            const res = await fetch(`${API_URL}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                username: email || '',
                password: password || '',
              }),
            });

            if (!res.ok) {
              console.error('Login failed with status:', res.status);
              return null;
            }

            const data = await res.json();
            const token = data.access_token;

            if (token) {
              setSession([false, token]);
              await SecureStore.setItemAsync('session', token);
              return data;
            }
          } catch (error) {
            console.error('An error occurred during sign-in:', error);
            return null;
          }
          return null;
        },
        signOut: () => {
          setSession([false, null]);
          SecureStore.deleteItemAsync('session');
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}