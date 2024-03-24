import { lastValueFrom, of, delay, Observable } from "rxjs";
import { UserType } from "src/app/consts/app.const";
import { IUser } from "src/app/modules/q-auth/q-auth-model";
import { getRolesByIds } from "./role-management/rolelist_data";
import { getWarehousesByIds } from "./warehouse-management/warehouse-data";

const DUMMY_USER: any = {
  "id": 1,
  "email": "super-admin@gmail.com",
  "phone_number": "+919871548694",
  "first_name": "Super",
  "last_name": "Admin",
  "is_active": true,
  "password": "123456789",
  "type": UserType.SUPER_ADMIN
};

const DUMMY_USERS_KEY = 'dummy-users';

export const isEmployee = (user) => {
  return user.type == UserType.EMPLOYEE;
}

export const isAdmin = (user) => {
  return user.type == UserType.ADMIN;
}

export const getMe = () => {
  const user = getUsers().find(user => (user.id === loggeedInUser()?.id && user.is_active));
  let warehouses;
  if (user?.role_id) {
    user.permissions = getRolesByIds([user.role_id])[0].permissions;
  }
  if (user?.warehouses) {
    warehouses = getWarehousesByIds(user.warehouses);
  }
  return lastValueFrom(of({ user, warehouses }));
}

export const saveAdmin = (admin: IUser, adminId?) => {
  if (adminId) {
    const users = getUsers();
    const index = findIndexById(adminId);
    admin.id = adminId;
    admin.type = UserType.ADMIN;
    users[index] = { ...users[index], ...admin };
    localStorage.setItem(DUMMY_USERS_KEY, JSON.stringify(users))
  } else {
    createAdmin(admin);
  }
  return of({ status: 200 });
}

function createAdmin(admin) {
  const users: any[] = getUsers(true);
  admin.id = Date.now();
  admin.created_by = loggeedInUser().id;
  admin.type = UserType.ADMIN;
  users.push(admin);
  localStorage.setItem(DUMMY_USERS_KEY, JSON.stringify(users));
}

export const getAdmins = (query?) => {
  const admins = getAllAdmins();
  return of({ list: admins, count: admins.length }).pipe(delay(2000));
}

export const getAllAdmins = () => {
  return getUsers().filter(user => isAdmin(user));
}

export const getAdmin = (id) => {
  return of(getAllAdmins().find(admin => admin.id == id)).pipe(delay(1000));
}

export const lookupWithPhone = (phone) => {
  const user = getUsers().find(user => user.phone_number === phone && user.is_active);
  if (user) {
    loggeedInUser(user);
    return of({ status: 200 });
  } else {
    return of({ status: 404 });
  }
}
export const loginWithPassword = (password: string, username: string) => {
  password = password ? password.trim() : password;
  const user = getUsers().find(user => {
    return user.is_active && password && username && user.password === password && (user.email === username || user.phone_number === username)
  });
  if (user) {
    loggeedInUser(user);
    return of({ accessToken: Date.now() });
  } else {
    return of({});
  }
}

export const loggeedInUser = (user?): any => {
  if (user) {
    return localStorage.setItem('dummy-logged-in-user', JSON.stringify(user));
  } else {
    user = localStorage.getItem('dummy-logged-in-user');
    return JSON.parse(user || '{}');
  }
}

export function getUsers(excludeSuperUser = false) {
  const users: any[] = JSON.parse(localStorage.getItem(DUMMY_USERS_KEY) || '[]');
  return [...users, excludeSuperUser ? [] : DUMMY_USER];
}

export const deleteUser = (adminId) => {
  const admins = getUsers(true);
  admins.splice(findIndexById(adminId), 1);
  localStorage.setItem(DUMMY_USERS_KEY, JSON.stringify(admins));
  return of({}).pipe(delay(1000));
}
const findIndexById = (id) => {
  return getUsers().findIndex(admin => admin.id == id);
}

export const UpdateUserInfo = (user: IUser, userId) => {
  const users = JSON.parse(localStorage.getItem(DUMMY_USERS_KEY) || '[]');
  const index = findIndexById(userId);
  users[index] = {
    ...users[index],
    first_name: user.first_name,
    last_name: user.last_name,
    password: user.password,
    email: user.email,
    phone_number: user.phone_number,
    image: user.image
  };
  localStorage.setItem(DUMMY_USERS_KEY, JSON.stringify(users))
  return of({});
}