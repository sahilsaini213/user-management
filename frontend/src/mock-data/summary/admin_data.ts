import { delay, of, lastValueFrom } from "rxjs";
import { getBillersList } from "../biller/biller_data";
import { getBrands, getBrandsList } from "../brands_data";
import { getRoleslist } from "../role-management/rolelist_data";
import { getSuppliersList } from "../supplier/supplier_data";
import { getAdminUsersList } from "../user-management/userlist_data";
import { getWarehousesList } from "../warehouse-management/warehouse-data";



export const getSummary = () => {
  const warehouse = getWarehousesList();
  const users = getAdminUsersList();
  const brand = getBrandsList();
  const biller = getBillersList();
  const supplier = getSuppliersList();
  const role = getRoleslist();
  return of({
    warehouseCount: warehouse.length,
    userCount: users.length,
    brandCount: brand.length,
    billerCount: biller.length,
    supplierCount: supplier.length,
    roleCount: role.length
  }).pipe(delay(1000))
}