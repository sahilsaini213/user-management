import { TopbarData } from "src/app/modules/ui-kit/components/topbar/topbar.component";
import { cloneDeep } from 'lodash';

export const MENU_DATA = [
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['./dashboard'] },
        ]
    },
    {
        id: 'product',
        label: 'Product',
        items: [
            { id: 'view', label: 'Products', icon: 'pi pi-fw pi-book', routerLink: ['./products'] },
            { id: 'add', label: 'Add Product', icon: 'pi pi-fw pi-plus-circle', routerLink: ['./products/create'] },
        ]
    },
    {
        id: 'barcode',
        label: 'Generate Barcode',
        items: [
            { id: 'view', label: 'Generate Barcode', icon: 'pi pi-fw pi-qrcode', routerLink: ['./generate-barcode'] }
        ]
    },
    {
        id: 'transfer',
        label: 'Transfer',
        items: [
            { id: 'view', label: 'Transfer List', icon: 'pi pi-fw pi-book', routerLink: ['./transfer'] },
            { id: 'add', label: 'Add Transfer', icon: 'pi pi-fw pi-plus-circle', routerLink: ['./transfer/create'] },
        ]
    },
    {
        id: 'sale',
        label: 'Sale',
        items: [
            { id: 'view', label: 'Sales', icon: 'pi pi-fw pi-book', routerLink: ['./sale'] },
            { id: 'add', label: 'Add Sale', icon: 'pi pi-fw pi-plus-circle', routerLink: ['./sale/create'] }
        ]
    },
    {
        id: 'stock_report',
        label: 'Report',
        items: [
            { id: 'view', label: 'Stock Report', icon: 'pi pi-fw pi-book', routerLink: ['./stock-report'] }
        ]
    }
]

export const NAVBAR_DATA = function (self: any): TopbarData {
    return cloneDeep({
        items: [
            {
                iconClass: 'pi-calendar',
                label: 'Calendar',
                command: (event) => {
                    event.preventDefault();
                }
            },
            {
                iconClass: 'pi-cog',
                label: 'Settings',
                routerLink: ''
            }
        ],
        profileItems: [{
            items: []
        }]
    });
}