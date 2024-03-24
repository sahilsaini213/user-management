import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PublicModule } from './pages/public/public.module';
import { routes } from './app.routes';

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'}),
        PublicModule
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
