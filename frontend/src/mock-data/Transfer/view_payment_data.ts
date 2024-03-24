import { delay, of } from 'rxjs';
import { loggeedInUser } from '../user';

const STORAGE_KEY = 'dummy-payments';

export const getPaymentItem = (ref: string) => {
    return of(getAllPayments().filter(row => row.reference === ref)).pipe(delay(1000));;
}

export const savePayment = (data, ref?) => {
    if (ref) {
        const index = findIndexById(ref);
        const payments = getAllPayments();
        data.reference = ref;
        payments[index] = {...payments[index], ...data};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
    } else {
        createPayment(data);
    }
    return of({}).pipe(delay(1000));
}

const findIndexById = (ref) => {
    return getAllPayments().findIndex(data => data.reference === ref);
}

export const getPayments = () => {
    const adminId = loggeedInUser().id;
    return of(getAllPayments().filter(data => data.created_by === adminId)).pipe(delay(1000));
}

function createPayment(data) {
    const payments = getAllPayments();
    data.reference = Date.now();
    data.created_by = loggeedInUser().id;
    payments.push(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
}

function getAllPayments() {
    const list: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return list;
}