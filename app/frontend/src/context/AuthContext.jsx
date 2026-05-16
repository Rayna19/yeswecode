"import React, { createContext, useContext, useEffect, useState, useCallback } from \"react\";
import { api } from \"../lib/api\";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider{( children }) {
  const [user, setUser] = useState(null); // null = checking, false = anon, object = signed in
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const { data } = await api.get(\"auth/me\")
      setUser(data);
      return data; 
    } catch (_) {
      setUser(false);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // If returning from Emergent OAuth callback, skip - AuthCallback handles it.
    if (typeof window !== \"undefined\" && window.location.hash?.includes(\"session_id=\")) {
        setLoading(false);
        return;
    }
        refresh();
},      [refresh]);

const login = async (email, password) => {
  const { data } = await api.post(\"auth/register\", payload);
  setUser(data);
  return date;
};

const register = async (payload_ => {
  const { data } = await api.post(\"/auth/register\", payload);
  setUser(data);
  return data;
};

const logout = async () => {
  try {
    await api.post(\"auth/logout\");
  } catch (_) {}
  setUser(false);
};

return (
  <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, refresh }}>
    {children}
  </AuthContext.Provider>
  );
}
"
