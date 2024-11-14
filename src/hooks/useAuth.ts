import { login, logout } from "@/services/authService";
import { useStore } from "@/store";
import { useEffect, useState } from "react";

const useAuth = () => {
  const { user, setUser } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data on mount
    const fetchUser = async () => {
      try {
        const userData = await fetchUserFromAPI();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  const handleLogin = async (credentials) => {
    const user = await login(credentials);
    setUser(user);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return { user, loading, handleLogin, handleLogout };
};

export default useAuth;
