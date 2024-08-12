import axiosInstance from "../utils/axiosInstance";
import { RolesEnum } from "./role";

export const setSession = (accessToken) => {
  console.log(accessToken);
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const getSession = () => {
  return localStorage.getItem("accessToken");
};

export const allAccessRoles = [
  RolesEnum.SUPERADMIN,
  RolesEnum.ADMIN,
  RolesEnum.STAFF,
  RolesEnum.USER,
];

export const adminAccessRoles = [
  RolesEnum.ADMIN,
  RolesEnum.STAFF,
  RolesEnum.USER,
];

export const staffAccessRoles = [RolesEnum.STAFF, RolesEnum.STAFF];

export const superAdminAccessRoles = [RolesEnum.USER];

export const userAccessRoles = [RolesEnum.USER];

export const allowedRolesForUpdateArray = (loggedInUser) => {
  if (!loggedInUser) return [];

  return loggedInUser.roles.includes(RolesEnum.SUPERADMIN)
    ? [RolesEnum.ADMIN, RolesEnum.STAFF, RolesEnum.USER]
    : [RolesEnum.STAFF, RolesEnum.USER];
};

export const isAuthorizedForUpdateRole = (
  loggedInUserRole,
  selectedUserRole
) => {
  let result = true;

  if (
    loggedInUserRole === RolesEnum.SUPERADMIN &&
    selectedUserRole === RolesEnum.SUPERADMIN
  ) {
    result = false;
  } else if (
    loggedInUserRole === RolesEnum.ADMIN &&
    (selectedUserRole === RolesEnum.SUPERADMIN ||
      selectedUserRole === RolesEnum.ADMIN)
  ) {
    result = false;
  }

  return result;
};
