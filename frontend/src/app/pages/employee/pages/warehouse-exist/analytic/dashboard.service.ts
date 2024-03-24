import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { environment } from "src/environments/environment";
import { EmployeeService } from "../../../employee.service";

@Injectable()
export class DashboardService {

    constructor(
        private http: HttpClient,
        private employeeService: EmployeeService
    ) { }

    getSummary() {
        const warehouse = this.employeeService.getDefaultWarehouse();
        if (environment.dummy) {
            return of(warehouse);
        } else {
            return this.http.get(`warehouse/${warehouse.id}/summary`);
        }
    }

}