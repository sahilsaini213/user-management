import { delay, of } from 'rxjs';
import { getPaymentStatusById, getStatusById } from 'src/app/pages/employee/pages/warehouse-exist/components/const';
import { getAllSuppliers, getSuppliers } from '../supplier/supplier_data';
import { loggeedInUser } from '../user';
import { arrayToJsonById } from '../util';
import { getAllWarehouses, getWarehouses, getWarehousesByIds } from '../warehouse-management/warehouse-data';

const STORAGE_KEY = 'dummy-sales';

export const getSale = (id) => {
    return of(getAllSales().find(sale => sale.id == id)).pipe(delay(1000));
}

export const saveSale = (sale, saleId?) => {
    if (saleId) {
        const index = findIndexById(saleId);
        const sales = getAllSales();
        sale.id = saleId;
        sales[index] = { ...sales[index], ...sale };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
    } else {
        createSale(sale);
    }
    return of({}).pipe(delay(1000));
}

export const deleteSale = (saleId) => {
    const sales = getAllSales();
    sales.splice(findIndexById(saleId), 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
    return of({}).pipe(delay(1000));
}

const findIndexById = (id) => {
    return getAllSales().findIndex(sale => sale.id == id);
}

export const getSales = (query?) => {
    const adminId = loggeedInUser().id;
    const list = (getAllSales().filter(sale => sale.created_by === adminId))
    const supplierMap = arrayToJsonById(getAllSuppliers());
    const warehouseMap = arrayToJsonById(getAllWarehouses());
    const sales = list.map(sale => {
        sale.date = new Date(sale.date).toDateString()
        sale.suppliers = supplierMap[sale.supplier_id];
        sale.warehouses = warehouseMap[sale.warehouse_id];
        sale.status = getStatusById(sale.status_id)?.status
        sale.payment_status = getPaymentStatusById(sale.payment_summary.payment_status_id)?.status
        return sale;
    });
    
    return of({ list: sales, count: sales.length }).pipe(delay(2000));
}

function createSale(sale) {
    const sales: any[] = getAllSales();
    sale.id = Date.now();
    sale.created_by = loggeedInUser().id;
    sales.push(sale);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
}

function getAllSales() {
    const sales: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return sales;
}