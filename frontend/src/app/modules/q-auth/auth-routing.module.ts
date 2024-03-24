import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path:'signin', component: LoginComponent}
        ])
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
