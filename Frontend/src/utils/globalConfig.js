import { PATH_DASHBOARD, PATH_PUBLIC } from "../routes/path";

//URLS

export const HOST_API_KEY = "https://localhost:5000/api";
export const REGISTER_URL = "/Auth/register";
export const LOGIN_URL = "Auth/login";
export const ME_URL = "/Auth/me";
export const MANAGE_BUS = "/bus";
export const MANAGE_BOOKING = "/Booking"; // get
export const MANAGE_BUSSHEHEDULE = "/BusSchedule"; // get
export const MANAGE_ROUTES = "/routes"; // get post
export const GET_ALLUSERS = "/Auth/AllUser"; // get

//Auth Routes

export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;
export const PATH_AFTER_USER_LOGIN = PATH_PUBLIC.home;
