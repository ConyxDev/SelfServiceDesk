import { Routes } from '@angular/router';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { AdminComponent } from './container/admin/admin.component';
import { ProductDetailPageComponent } from './container/product-detail-page/product-detail-page.component';
import { restoResolver } from './resolvers/resto.resolver';
import { bitcoinResolver } from './resolvers/bitcoin.resolver';

export const routes: Routes = [
    {
        path: 'order',
        children: [
            {
                path: '',
                component: OrderPageComponent,
                resolve: {
                    resto: restoResolver,
                    bitcoin: bitcoinResolver
                }
            },
            {
                path:':uuid',
                component: ProductDetailPageComponent,
                resolve: {
                    resto: restoResolver
                }
            }
        ],
    },
    {
        path: 'admin',
        component: AdminComponent,
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
