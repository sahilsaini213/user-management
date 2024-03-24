import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserType } from 'src/app/consts/app.const';
import { addDummyData, removeDummyData } from 'src/mock-data/local.storage';
import { getUsers } from 'src/mock-data/user';
import { IUser } from '../../q-auth-model';

@Component({
  selector: 'app-demo-account',
  templateUrl: './demo-account.component.html',
  styleUrls: ['./demo-account.component.scss']
})
export class DemoAccountComponent implements OnInit {

  list: IUser[];

  constructor(private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this.list = getUsers();
  }

  removeData() {
    removeDummyData();
    this.fetchList();
  }

  addData() {
    addDummyData();
    this.fetchList();
  }

  onClose(user) {
    this.ref.close(user);
  }

  getUserType(type) {
    switch (type) {
      case UserType.SUPER_ADMIN:
        return 'Super Admin';
      case UserType.ADMIN:
        return 'Warehouse(s) Owner'
      default:
        return 'Warehouse Employee';
    }
  }

}

