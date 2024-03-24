import { delay, of } from "rxjs";
import { getAllAdmins } from "../user";
import { getAdminUsersList } from "../user-management/userlist_data";
import { getWarehousesList } from "../warehouse-management/warehouse-data";


export const getSummary = () => {
  const warehouse = getWarehousesList();
  const admins = getAllAdmins().map(admin => {
    admin.warehouse_count = getWarehousesList({}, admin.id).length || 0;
    admin.users_count = getAdminUsersList({}, admin.id).length || 0;
    return admin
  })

  return of({list: admins, adminsCount: admins.length, totalWarehouseCount: warehouse.length }).pipe(delay(1000))
}