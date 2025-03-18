import { Routes } from '@angular/router';
import { OrderPageComponent } from './pages/order-page/order-page.component';
export const routes: Routes = [
    {
        path: 'order',
        component: OrderPageComponent
    },
    {
        path: '',
        redirectTo: 'order',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'order',
        pathMatch: 'full'
    }
];
