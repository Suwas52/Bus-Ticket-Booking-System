import { PATH_DASHBOARD, PATH_PUBLIC } from "../routes/path";

//URLS

export const HOST_API_KEY = "http://localhost:5245/api";
export const REGISTER_URL = "/Auth/register";
export const LOGIN_URL = "Auth/login";
export const ME_URL = "/Auth/me";
export const MANAGE_BUS = "/bus";
export const MANAGE_BOOKING = "/Booking"; // get
export const MANAGE_BUSSHEHEDULE = "/BusSchedule"; // get
export const MANAGE_ROUTES = "/routes"; // get post
export const GET_ALLUSERS = "/Auth/AllUser"; // get
export const USER = "/Auth/users";
export const SEARCH_BUSES = "/routes/available-buses";
export const MANAGE_TICKET_PRICE = "/Price";
export const ACCEPT_BOOKING = "/Booking/approve";
export const REJECT_BOOKING = "/Booking/reject";
export const MANAGE_SEAT = "/Seat";
export const USERDASHBOARD_COUNT = "/Booking/Count";
export const ADMINDASHBOARD_COUNT = "/Auth/Count";
export const USERDETAIL = "/Auth/users";
export const UPDATEUSER_ROLE = "/Auth/update-role";
export const CHANGEPASSWORD = "/Auth/change-password";
export const UPDATEUSER = "/Auth/Update-User";
//Auth Routes

export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;
export const PATH_AFTER_USER_LOGIN = PATH_PUBLIC.home;
