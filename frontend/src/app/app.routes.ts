import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserType } from './consts/app.const';
import { QAuthenticationGuard } from './modules/q-auth/q-auth.guard';
import { QAuthorizeGuard } from './modules/q-auth/q-authorize.guard';

let redirectToLogin, redirectToDashboad;

if(environment.dummy) {
    redirectToLogin = () => {};
    redirectToDashboad = () => {};
} else {
    redirectToLogin = () => redirectUnauthorizedTo(['auth/signin']);
    redirectToDashboad = () => redirectLoggedInTo(['app']);
}

export const routes: Route[] = [
    {
        path: '',
        children: [
            { 
                path: 'auth', 
                loadChildren: () => import('./modules/q-auth/q-auth.module').then(m => m.QAuthModule)
            },
          
            { 
                path: '', 
                loadChildren: () => import('./pages/super-admin/super-admin.module').then(m => m.SuperAdminModule),
                data: { authGuardPipe: redirectToLogin, userTypes:[UserType.ADMIN]}
            },
            { 
                path: 'personal', 
                loadChildren: () => import('./pages/general/general.module').then(m => m.GeneralModule),
                data: { authGuardPipe: redirectToLogin, userTypes: [UserType.ADMIN] }
            }
        ],
        canActivate: []
    }
];