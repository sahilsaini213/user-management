import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IWarehouse } from './employee.model';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html'
})
export class EmployeeComponent {
    constructor(
        private employeeService: EmployeeService
        ) {
        if (location.pathname === '/app') {
            this.employeeService.getWarehouses().then((warehouses: IWarehouse[]) => {
                this.employeeService.setOrChooseDefaultWarehouse(warehouses);
            });
        }
    }
}
