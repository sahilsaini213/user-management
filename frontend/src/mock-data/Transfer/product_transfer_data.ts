import { IProductTransfer } from "src/app/pages/employee/pages/warehouse-exist/transfer/transfer.service";
import { delay, of } from 'rxjs';
import { loggeedInUser } from '../user';
import { getAllWarehouses } from "../warehouse-management/warehouse-data";
import { arrayToJsonById } from "../util";
import { getPaymentStatusById, getStatusById } from "src/app/pages/employee/pages/warehouse-exist/components/const";

const STORAGE_KEY = 'dummy-transfer-list';

export const getTransferItem = (id) => {
    return of(allTransferList().find(data => data.id == id)).pipe(delay(1000));
}

export const saveTransferItem = (data: IProductTransfer, ref?) => {
    if (ref) {
        const index = findIndexById(ref);
        const transferList = allTransferList();
        data.reference = ref;
        transferList[index] = {...transferList[index], ...data};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transferList));
    } else {
        createTrasfer(data);
    }
    return of({}).pipe(delay(1000));
}

const findIndexById = (id) => {
    return allTransferList().findIndex(data => data.id == id);
}

export const getTransferList = (query?) => {
    const adminId = loggeedInUser().id;
    const list = (allTransferList().filter(data => data.created_by === adminId))
    const warehouseMap = arrayToJsonById(getAllWarehouses());
    const transfer = list.map(data => {
        data.date = new Date(data.date).toDateString()
        data.from_warehouse = warehouseMap[data.from_warehouse_id];
        data.to_warehouse = warehouseMap[data.to_warehouse_id];
        data.status = getStatusById(data.status_id)?.status
        data.payment_status = getPaymentStatusById(data.payment_summary.payment_status_id)?.status
        return data;
    });
    
    return of({ list: transfer, count: transfer.length }).pipe(delay(2000));
}



function createTrasfer(data) {
    const transferList = allTransferList();
    data.reference = Date.now();
    data.id = Date.now();
    data.created_by = loggeedInUser().id;
    transferList.push(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transferList));
}

function allTransferList() {
    const list: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return list;
}