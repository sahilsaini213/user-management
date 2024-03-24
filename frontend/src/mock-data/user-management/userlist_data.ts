import { delay, of } from "rxjs";
import { UserType } from "src/app/consts/app.const";
import { IUser } from "src/app/modules/q-auth/q-auth-model";
import { getAllRoles } from "../role-management/rolelist_data";
import { loggeedInUser } from "../user";
import { arrayToJsonById } from "../util";

const STORAGE_KEY = 'dummy-users';

export const getUser = (id) => {
  return  of(getAllUsers().find(user => user.id == id)).pipe(delay(1000))
}

export const saveUser = (user: IUser, userId?) => {
  if(userId) {
    const index = findIndexById(userId);
    const users = getAllUsers();
    user.id = userId;
    user.created_by = loggeedInUser().id;
    users[index] = {...users[index], ...user};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } else {
    createUser(user);
  }
  return of({}).pipe(delay(1000));
}

export const deleteUser = (userId) => {
  const users = getAllUsers();
  users.splice(findIndexById(userId), 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return of({}).pipe(delay(1000));
}

const findIndexById = (id) => {
  return getAllUsers().findIndex(user => user.id == id);
}

export const getAdminUsers = (query?) => {
  let adminUsers = getAdminUsersList(query)
  return of({list: adminUsers, count: adminUsers.length}).pipe(delay(2000));
}

export const getAdminUsersList = (query?, adminId = null) => {
  adminId = adminId ? adminId : loggeedInUser().id;
  let adminUsers = getAllUsers().filter( user => user.created_by === adminId);
  const rolesMap =  arrayToJsonById(getAllRoles());
  adminUsers = adminUsers.map( user => {
    user.role = rolesMap[user.role_id];
    return user;
  });
  return adminUsers;
}

function getAllUsers() {
  const users: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return users;
}

function createUser(user) {
  const users: any[] = getAllUsers();
  user.id = Date.now();
  user.created_by = loggeedInUser().id;
  user.type = UserType.EMPLOYEE;
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}