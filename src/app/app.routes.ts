import { Routes } from '@angular/router';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductDetailPageComponent } from './container/product-detail-page/product-detail-page.component';
import { restoResolver } from './resolvers/resto.resolver';
import { bitcoinResolver } from './resolvers/bitcoin.resolver';
import { foodResolver } from './resolvers/food.resolver';

export const routes: Routes = [
    {
        path: 'order',
        children: [
            {
                path: '',
                component: OrderPageComponent,
                resolve: {
                    resto: restoResolver,
                    bitcoin: bitcoinResolver,
                    food: foodResolver,
                }
            },
            {
                path:':uuid',
                loadComponent:() => import ('./container/product-detail-page/product-detail-page.component').then(file => file.ProductDetailPageComponent),
                resolve: {
                    resto: restoResolver
                }
                
            }
        ],
    },
    {
        path: 'admin',
        loadComponent: ()  => import('./pages/admin/admin.component').then(file => file.AdminComponent),
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
