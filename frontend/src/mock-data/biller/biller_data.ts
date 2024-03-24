import { delay, of } from "rxjs";
import { IBiller } from "src/app/pages/admin/pages/biller/biller.service";
import { isEmployee, loggeedInUser } from "../user";

const STORAGE_KEY = 'dummy-billers';

export const getBiller = (id) => {
    return of(getAllBillers().find(biller => biller.id == id)).pipe(delay(1000));
}

export const saveBiller = (biller: IBiller, billerId?) => {
    if (billerId) {
        const index = findIndexById(billerId);
        const billers = getAllBillers();
        biller.id = billerId;
        billers[index] = { ...billers[index], ...biller };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(billers));
    } else {
        createBiller(biller);
    }
    return of({}).pipe(delay(1000));
}

export const deleteBiller = (billerId) => {
    const billers = getAllBillers();
    billers.splice(findIndexById(billerId), 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(billers));
    return of({}).pipe(delay(1000));
}

const findIndexById = (id) => {
    return getAllBillers().findIndex(biller => biller.id == id);
}

export const getBillers = (query?) => {
    const billers =getBillersList(query);
    return of({ list: billers, count: billers.length }).pipe(delay(1000));
}
export const getBillersList = (query?) => {
    const user = loggeedInUser();
    const adminId = user[!isEmployee(user) ? 'id' : 'created_by'];
    const billers = getAllBillers().filter( user => user.created_by === adminId)
    return billers;
}

function createBiller(biller) {
    const billers: any[] = getAllBillers();
    biller.id = Date.now();
    biller.created_by = loggeedInUser().id;
    billers.push(biller);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(billers));
}

function getAllBillers() {
    const billers: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return billers;
}
