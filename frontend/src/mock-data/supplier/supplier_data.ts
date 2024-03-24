import { delay, of } from 'rxjs';
import { ISupplier } from 'src/app/pages/admin/pages/supplier/supplier.service';
import { isEmployee, loggeedInUser } from '../user';

const STORAGE_KEY = 'dummy-suppliers';

export const getSupplier = (id) => {
    return of(getAllSuppliers().find(supplier => supplier.id == id)).pipe(delay(1000));
}

export const saveSupplier = (supplier: ISupplier, supplierId?) => {
    if (supplierId) {
        const index = findIndexById(supplierId);
        const suppliers = getAllSuppliers();
        supplier.id = supplierId;
        suppliers[index] = {...suppliers[index], ...supplier};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(suppliers));
    } else {
        createSupplier(supplier);
    }
    return of({}).pipe(delay(1000));
}

export const deleteSupplier = (supplierId) => {
    const suppliers = getAllSuppliers();
    suppliers.splice(findIndexById(supplierId), 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(suppliers));
    return of({}).pipe(delay(1000));
}

const findIndexById = (id) => {
    return getAllSuppliers().findIndex(supplier => supplier.id == id);
}

export const getSuppliers = (query?) => {
    const suppliers = getSuppliersList(query)
    return of({ list: suppliers, count: suppliers.length }).pipe(delay(1000))
}

export const getSuppliersList = (query?) => {
    const user = loggeedInUser();
    const adminId = user[!isEmployee(user) ? 'id' : 'created_by'];
    const suppliers = getAllSuppliers().filter( user => user.created_by === adminId)
    return suppliers;
}

function createSupplier(supplier) {
    const suppliers: any[] = getAllSuppliers();
    supplier.id = Date.now();
    supplier.created_by = loggeedInUser().id;
    suppliers.push(supplier);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(suppliers));
}

export function getAllSuppliers() {
    const suppliers: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return suppliers;
}