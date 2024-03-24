import { delay, of } from 'rxjs';
import { loggeedInUser } from '../user';


const STORAGE_KEY = 'dummy-emp-roles';

export const getRole = (id) => {
  return of(getAllRoles().find(role => role.id == id)).pipe(delay(1000));
}

export const getRolesByIds = (ids = []) => {
  return getAllRoles().filter(role => ids.includes(role.id));
}

export const saveRole = (role, roleId?) => {
  if(roleId) {
    const index = findIndexById(roleId);
    const roles = getAllRoles();
    role.id = roleId;
    roles[index] = {...roles[index], ...role};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
  } else {
    createRole(role);
  }
  return of({}).pipe(delay(1000));
}

export const deleteRole = (roleId) => {
  const roles = getAllRoles();
  roles.splice(findIndexById(roleId), 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
  return of({}).pipe(delay(1000));
}

const findIndexById = (id) => {
  return getAllRoles().findIndex(role => role.id === id);
}

export const getRoles = (query?) => {
  const roles = getRoleslist();
  return of({
    list: roles,
    count: roles.length
  }).pipe(delay(1000));
}

export const getRoleslist = (query?) => {
  const adminId = loggeedInUser().id;
  const roles = getAllRoles().filter(role => role.created_by == adminId);
  return roles;
}


function createRole(role) {
  const roles: any[] = getAllRoles();
  role.id = Date.now();
  role.created_by = loggeedInUser().id;
  roles.push(role);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
}

export function getAllRoles() {
  const roles: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return roles;
}