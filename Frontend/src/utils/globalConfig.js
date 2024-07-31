import { PATH_DASHBOARD, PATH_PUBLIC } from "../routes/Path";

//URLS

export const HOST_API_KEY = "https://localhost:5000/api";
export const REGISTER_URL = "/Auth/regiser";
export const LOGIN_URL = "Auth/login";

//Auth Routes

export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;
