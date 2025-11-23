import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.API_URL}/api/check-auth`,
          {
            withCredentials: true,
          }
        );
        setLoggedIn(res.data.loggedIn);
      } catch (err) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  if (loading) return <div className="text-white">Checking login...</div>;

  if (!loggedIn) {
    return <Navigate to="/user/login" replace />;
  }
  return children;
}
