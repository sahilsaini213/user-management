import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PublicModule } from './pages/public/public.module';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { routes } from './app.routes';

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'}),
        PublicModule
    ],
    // providers: [AngularFireAuthGuard],
    exports: [RouterModule]
})

export class AppRoutingModule {}
