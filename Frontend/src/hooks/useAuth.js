import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../context/AuthContext";
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuthContext context is not inside of AuthProvider Tag");
};

export default useAuth;
