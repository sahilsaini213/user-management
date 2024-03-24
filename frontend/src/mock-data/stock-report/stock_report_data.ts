import { delay, of } from "rxjs";
import { IStockReport } from "src/app/pages/employee/pages/warehouse-exist/reports/reports.service";
import { loggeedInUser } from "../user";
import { STORAGE_KEY_SELECTED_WAREHOUSE } from "../warehouse-management/warehouse-data";

const STORAGE_KEY = 'dummy-stock-report';

export const getAllStocks = () => {
  const list: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return list;
}

export const getStockList = (query?) => {
  const adminId = loggeedInUser().id;
  const warehouseId = localStorage.getItem(STORAGE_KEY_SELECTED_WAREHOUSE);
  const list: any[] = getAllStocks()
  const stocklist = list.filter(stock =>( stock.created_by === adminId && stock.warehouse_id == warehouseId))
  return of({ list:stocklist, count: stocklist.length }).pipe(delay(1000));
}

export const getstock = (date, warehouseId) => {
  let startDate = date[0]?.getTime();
  let endDate = date[1]?.getTime();
  let results = getAllStocks();
  if (warehouseId)
    results = results.filter(stock => stock.warehouse_id == warehouseId);
  if (startDate)
    results = results.filter(stock => getTime(stock.date) >= startDate);
  if (endDate)
    results = results.filter(stock => getTime(stock.date) <= endDate);

  return of(results).pipe(delay(1000));;
}

function getTime(date: string) {
  return new Date(date).getTime();
}
