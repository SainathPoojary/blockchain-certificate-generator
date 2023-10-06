import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

axios.defaults.baseURL = "http://localhost:4000/api/";

export const UserProvider = ({ children }) => {
  // States
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _getUser();
  }, []);

  const _getUser = async () => {
    try {
      const res = await axios.get("/user", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setUser(res.data);
    } catch (err) {
      console.log(err.response.data.code);
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(
        "/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err.response.data.code);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
    } catch (err) {
      console.log(err.response.data.code);
    }
  };

  const createCertificate = async (name, email, course) => {
    try {
      const res = await axios.post(
        "/certificate",
        {
          name,
          email,
          course,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      await _getUser();

      return res.data.url;
    } catch (err) {
      console.log(err.response.data.code);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, createCertificate }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
