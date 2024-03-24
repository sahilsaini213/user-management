import { lastValueFrom, Observable } from 'rxjs';
import { ArrayUtil } from '../utils/array.utils';

export interface ITableList<T> { 
    list: T[], 
    count: number 
}

export interface ITableAction {
    label: string, 
    icon: string, 
    routerLink?: string,
    click?: Function,
    onConfirm?: Function
}

export abstract class BaseList<T> {
    abstract tableColumnsCount: number;
    list: T[];
    loading = false;
    selectedRow: any;
    totalRecords: number = 0;
    isDestroy = false;
    tableActions: ITableAction[] = [
        { label: "Edit", icon: 'pi pi-user-edit', routerLink: './$id' },
        { label: "Delete", icon: 'pi pi-trash', onConfirm: this.onDeleteConfirm.bind(this) }
    ];
    abstract fetch(query?): Observable<ITableList<T>>;
    abstract delete(id: string): Observable<any>;
    constructor() { }

    onInIt() {
        this.fetchList();
    }

    fetchList(query?) {
        this.loading = true;
        this.list = ArrayUtil.fillWithEmpty(this.tableColumnsCount);
        this.fetch(query).subscribe({
            next: ({ list, count }: ITableList<T>) => {
                this.loading = false;
                this.list = list;
                this.totalRecords = count;
            },
            error: () => {
                this.loading = false;
                this.list = [];
            }
        });
    }

    onDeleteConfirm() {
        return lastValueFrom(this.delete(this.selectedRow.id))
            .then(() => {
                this.fetchList();
                return true;
            })
    }

    destroy() {
        this.isDestroy = true;
    }

}