import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IWarehouse } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Injectable()
export class EmptyWarehouseGuard implements CanActivate {

  constructor(
    private employeeService: EmployeeService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.employeeService.getWarehouses().then( (warehouses: IWarehouse[]) => {
        const { warehouseId } = route.params;
        this.employeeService.setOrChooseDefaultWarehouse(warehouses, warehouseId);
        return true;
      });
  }
  
}
