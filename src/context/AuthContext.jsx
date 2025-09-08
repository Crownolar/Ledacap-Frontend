import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // 🔹 Login (called after API success)
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);

    // redirect based on role
    if (userData?.role) {
      navigate(`/dashboard/${userData.role}`);
    } else {
      navigate("/dashboard"); // fallback
    }
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🔹 Helper: Authorized fetch wrapper
  const authFetch = async (url, options = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
      logout(); // auto logout on expired/invalid token
      throw new Error("Session expired. Please log in again.");
    }
    return response;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); // contains {id, username, role, email}
//   const [token, setToken] = useState(null);
//   const navigate = useNavigate();

//   // Load user + token from localStorage on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     const savedToken = localStorage.getItem("token");

//     if (savedUser && savedToken) {
//       setUser(JSON.parse(savedUser));
//       setToken(savedToken);
//     }
//   }, []);

//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);

//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", authToken);

//     // redirect based on role
//     if (userData?.role) {
//       navigate(`/dashboard/${userData.role}`);
//     } else {
//       navigate("/"); // fallback
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Load user from localStorage on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const login = (username, role) => {
//     const userData = { username, role };
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));

//     // redirect based on role
//     navigate(`/dashboard/${role}`);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
