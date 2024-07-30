import Api from "./Api";

const login = async (email, password) => {
  const response = await Api.post("/auth/login", { email, password });
  return response.data;
};

const signup = async (email, password) => {
  const response = await Api.post("/auth/signup", { email, password });
  return response.data;
};

const refreshToken = async () => {
  const response = await Api.post("/auth/refresh-token");
  return response.data.token;
};

export { login, signup, refreshToken };
