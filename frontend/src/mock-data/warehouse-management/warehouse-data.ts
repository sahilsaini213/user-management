import { delay, of } from 'rxjs';
import { isEmployee, loggeedInUser } from '../user';

const STORAGE_KEY = 'dummy-warehouses';
 export const STORAGE_KEY_SELECTED_WAREHOUSE = 'dummy_selected_warehouse'

export const getWarehouses = (query?) => {
  const warehouses = getWarehousesList(query);
  return of({ list: warehouses, count: warehouses.length }).pipe(delay(1000))
}

export const getWarehousesList = (query?, adminId = null) => {
  const user = loggeedInUser();
  adminId = adminId ? adminId : user[!isEmployee(user) ? 'id' : 'created_by'];
  const warehouses = getAllWarehouses().filter(role => role.created_by == adminId)
  return warehouses;
}

export const getWarehouse = (id) => {
  return of(getAllWarehouses().find(warehouse => warehouse.id == id)).pipe(delay(1000));
}

export const getWarehousesByIds = (ids = []) => {
  return getAllWarehouses().filter(warehouse => ids.includes(warehouse.id));
}

export const saveWarehouse = (warehouse, warehouseId?) => {
  if (warehouseId) {
    const index = findIndexById(warehouseId);
    const warehouses = getAllWarehouses();
    warehouse.id = warehouseId;
    warehouses[index] = { ...warehouses[index], ...warehouse };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(warehouses));
  } else {
    createWarehouse(warehouse);
  }
  return of({}).pipe(delay(1000));
}

export const deleteWarehouse = (warehouseId) => {
  const warehouses = getAllWarehouses();
  warehouses.splice(findIndexById(warehouseId), 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(warehouses));
  return of({}).pipe(delay(1000));
}

const findIndexById = (id) => {
  return getAllWarehouses().findIndex(warehouse => warehouse.id == id);
}

function createWarehouse(warehouse) {
  const warehouses: any[] = getAllWarehouses();
  warehouse.id = Date.now();
  warehouse.created_by = loggeedInUser().id;
  warehouses.push(warehouse);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(warehouses));
}

export function getAllWarehouses() {
  const warehouses: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return warehouses;
}