import { TopbarData } from "src/app/modules/ui-kit/components/topbar/topbar.component";

export const SUPER_ADMIN_MENU_DATA = [
        {
            label: 'Home',
            items:[
                {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/superadmin']}
            ]
        },
        {
            label: 'Manage Admins',
            items: [
                {label: 'Admins', icon: 'pi pi-fw pi-users', routerLink: ['/superadmin/admins']},
                {label: 'Create Admin', icon: 'pi pi-fw pi-user-plus', routerLink: ['/superadmin/admins/create']}
            ]
        }
]

export const NAVBAR_DATA = function (self): TopbarData {
    return {
        items: [
            {
                iconClass: 'pi-calendar',
                label: 'Calendar',
                command: (event) => {
                    event.preventDefault();
                    console.log(event)
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
        profileItems: []
    }
}
export const STATUS_LIST =[
    {
        code: "1",
        label: "Published "
    },
    {
        code: "2",
        label: "Draft "
    },
]