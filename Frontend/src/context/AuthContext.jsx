// import React, { createContext, useState, useEffect, useContext } from "react";
// import jwtDecode from "jwt-decode"; // Adjusted import statement
// import { login as authLogin, refreshToken } from "../services/AuthService";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         const token = await refreshToken();
//         if (token) {
//           setUser(jwtDecode(token));
//         }
//       } catch (error) {
//         console.log("Error refreshing token", error);
//       }
//     };

//     initAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const data = await authLogin(email, password);
//       setUser(jwtDecode(data.token));
//     } catch (error) {
//       console.log("Login error", error);
//       throw error; // Re-throw the error for further handling if needed
//     }
//   };

//   const logout = () => {
//     // Handle logout logic, such as clearing cookies or local storage
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import { login as authLogin, refreshToken } from "../services/AuthService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await refreshToken();
        if (token) {
          setUser(jwtDecode(token));
        }
      } catch (error) {
        console.log("Error refreshing token", error);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await authLogin(email, password);
    setUser(jwtDecode(data.token));
  };

  const logout = () => {
    // Handle logout logic, such as clearing cookies
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
