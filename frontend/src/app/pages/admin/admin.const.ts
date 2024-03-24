import { TopbarData } from "src/app/modules/ui-kit/components/topbar/topbar.component";
import { cloneDeep } from 'lodash';

export const ADMIN_MENU_DATA = [
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
            // { label: 'Profile', icon: 'pi pi-fw pi-id-card', routerLink: ['./settings/brand-profile'] }
        ]
    },
    {
        label: 'User Management',
        items: [
            { label: 'Users', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/user-management'] },
            { label: 'Add User', icon: 'pi pi-fw  pi-plus-circle', routerLink: ['/admin/user-management/create'] },
        ]
    },
    {
        label: 'Role Management',
        items: [
            { label: 'Role', icon: 'pi pi-fw pi-users', routerLink: ['/admin/role-management/list'] },
            { label: 'Role Permission', icon: 'pi pi-fw pi-cog', routerLink: ['./role-management/permissions'] },
        ]
    },
    {
        label: 'Warehouse Management',
        items: [
            { label: 'Warehouses', icon: 'pi pi-fw pi-building', routerLink: ['/admin/warehouse-management'] },
            { label: 'Add Warehouse', icon: 'pi pi-fw  pi-plus-circle', routerLink: ['/admin/warehouse-management/create'] }
        ]
    },
    {
        label: 'Products',
        items: [
            { label: 'Brands', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/admin/brands'] },
            { label: 'Categories', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/product-category'] },
        ]
    },
    {
        label: 'Supplier',
        items: [
            { label: 'Suppliers', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/supplier'] },
            { label: 'Add Supplier', icon: 'pi pi-fw  pi-plus-circle', routerLink: ['/admin/supplier/create'] },
        ]
    },
    {
        label: 'Biller',
        items: [
            { label: 'Biller', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/biller'] },
            { label: 'Add Biller', icon: 'pi pi-fw  pi-plus-circle', routerLink: ['/admin/biller/create'] },
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
            },
            {
                iconClass: 'pi-user',
                label: 'Profile',
                routerLink: ''
            }
        ],
        profileItems: [
        ]
    });
}

export const GENDER_LIST = [
    {
        code: "1",
        label: "Male"
    },
    {
        code: "2",
        label: "Female"
    },
    {
        code: "3",
        label: "Trans"
    }
]