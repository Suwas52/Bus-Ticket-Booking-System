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

// import React, { createContext, useState, useEffect } from "react";
// import { login as authLogin, refreshToken } from "../services/AuthService";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
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
//     const data = await authLogin(email, password);
//     setUser(jwtDecode(data.token));
//   };

//   const logout = () => {
//     // Handle logout logic, such as clearing cookies
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, AuthContext };

import {
  ReactNode,
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { setSession, getSession } from "../auth/auth.utils";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_URL,
  ME_URL,
  PATH_AFTER_LOGIN,
  PATH_AFTER_LOGOUT,
  PATH_AFTER_REGISTER,
  PATH_AFTER_USER_LOGIN,
  REGISTER_URL,
} from "../utils/globalConfig";
import { IAuthContextActionTypes, RolesEnum } from "../auth/role";

//Reducer function for useReducer hook

// const authReducer = (state, action) => {
//   if (state.type === IAuthContextActionTypes.LOGIN) {
//     console.log("isauthenticated: true");
//     return {
//       ...state,
//       isAuthenticated: true,
//       isAuthLoading: false,
//       user: action.payload,
//     };
//   }
//   if (state.type === IAuthContextActionTypes.LOGOUT) {
//     console.log("isauthenticated: false");
//     return {
//       ...state,
//       isAuthenticated: false,
//       isAuthLoading: false,
//       user: undefined,
//     };
//   }
//   console.log("notworking");

//   return state;
//   // switch (action) {
//   //   case "LOGIN":

//   //   case "LOGOUT":

//   //   default:
//   //     return state;
//   // }
// };
const authReducer = (state, action) => {
  switch (action.type) {
    case IAuthContextActionTypes.LOGIN:
      console.log("isauthenticated: true");
      return {
        ...state,
        isAuthenticated: true,
        isAuthLoading: false,
        user: action.payload,
      };
    case IAuthContextActionTypes.LOGOUT:
      console.log("isauthenticated: false");
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        user: undefined,
      };
    default:
      console.log("notworking");
      return state;
  }
};

// Initial state object for useReducer hook
const initialAuthState = {
  isAuthenticated: false,
  isAuthLoading: true,
  user: undefined,
};

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  // Initialize Method
  const initializeAuthContext = useCallback(async () => {
    try {
      const token = getSession();
      if (token) {
        // validate accessToken by calling backend
        const response = await axiosInstance.post(ME_URL, { token });
        const { newToken, userInfo } = response.data;
        console.log(userInfo);
        setSession(newToken);
        dispatch({ type: IAuthContextActionTypes.LOGIN, payload: userInfo });
      } else {
        setSession(null);
        dispatch({ type: IAuthContextActionTypes.LOGOUT });
      }
    } catch (error) {
      setSession(null);
      dispatch({ type: IAuthContextActionTypes.LOGOUT });
    }
  }, []);

  useEffect(() => {
    console.log("AuthContext Initialization start");
    initializeAuthContext()
      .then(() => console.log("initializeAuthContext was successful"))
      .catch((error) => console.log(error));
  }, []);

  // Register Method
  const register = useCallback(
    async (firstName, lastName, userName, email, password, address) => {
      const response = await axiosInstance.post(REGISTER_URL, {
        firstName,
        lastName,
        userName,
        email,
        password,
        address,
      });
      console.log("Register Result:", response);
      toast.success("Register Was Successful. Please Login.");
      navigate(PATH_AFTER_REGISTER);
    },
    [navigate]
  );

  // Login Method
  const login = useCallback(async (email, password) => {
    const response = await axiosInstance.post(LOGIN_URL, {
      email,
      password,
    });
    toast.success("Login Was Successful");
    const { newToken, userInfo } = response.data;
    setSession(newToken);

    console.log(userInfo);
    dispatch({ type: "LOGIN", payload: userInfo });
    if (userInfo.roles === RolesEnum.USER) {
      navigate(PATH_AFTER_USER_LOGIN);
    }
    navigate(PATH_AFTER_LOGIN);
  }, []);

  // Logout Method
  const logout = useCallback(() => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    navigate(PATH_AFTER_LOGOUT);
  }, []);

  const valuesObject = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    user: state.user,
    register,
    login,
    logout,
  };

  console.log(valuesObject);

  return (
    <AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
