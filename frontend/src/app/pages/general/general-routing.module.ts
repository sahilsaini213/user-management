import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GeneralComponent } from './general.component';
import { PersonalSettingsComponent } from './pages';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path:'', component: GeneralComponent,
                children: [
                    {path: '', redirectTo: 'profile', pathMatch: 'full'},
                    {path: 'profile', component: PersonalSettingsComponent}
                ],
            }
        ])
    ],
    exports: [RouterModule]
})
export class GeneralRoutingModule {
}
