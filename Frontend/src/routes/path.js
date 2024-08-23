export const PATH_PUBLIC = {
  home: "/",
  register: "/register",
  login: "/login",
  about: "/about",
  unauthorized: "/unauthorized",
  notFound: "/404",
};

export const PATH_DASHBOARD = {
  dashboard: "/admin-dashboard",
  usermanagement: "/dashboard/users-management",
  updateRole: "/dashboard/update-role/:username",
  superAdmin: "/dashboard/superadmin",
  admin: "/dashboard/admin",
  staff: "/dashboard/staff",
  user: "/dashboard/user",
  userList: "/admin-dashboard/userlist",
  userCreate: "/admin-dashboard/user/create",
  busList: "/admin-dashboard/bus/list",
  busCreate: "/admin-dashboard/bus/create",
  busUpdate: "/admin-dashboard/bus/edit/:busId",
  busDetail: "/admin-dashboard/bus/detail/:busId",
  busScheduleList: "/admin-dashboard/busSchedule/list",
  busScheduleCreate: "/admin-dashboard/busSchedule/create",
  busScheduleEdit: "/admin-dashboard/busSchedule/edit/:scheduleId",
  busScheduleDetail: "/admin-dashboard/busSchedule/detail/:scheduleId",
  routeList: "/admin-dashboard/route/list",
  routeCreate: "/admin-dashboard/route/create",
  routeEdit: "/admin-dashboard/route/edit/:routeId",
  routeDetail: "/admin-dashboard/route/detail/:routeId",
  booking: "/admin-dashboard/booking",
  profile: "/admin-dashboard/profile",
  adminUser: "/admin-dashboard/profile/:username",
};

export const PATH_AUTHUSER = {
  filter: "/filter",
  userBooked:"/user-dashboard",
  userProfileSetting :"/user/profile-setting",
  seatSelect : "/user/seat-select",
};
