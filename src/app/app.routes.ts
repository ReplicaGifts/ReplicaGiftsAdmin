import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductComponent } from './admin/product/product.component';
import { CategoryComponent } from './admin/category/category.component';
import { AuthGuard } from './auth.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProductViewComponent } from './admin/product-view/product-view.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrderViewComponent } from './admin/order-view/order-view.component';
import { GiftsComponent } from './admin/gifts/gifts.component';
import { ContactComponent } from './admin/contact/contact.component';
import { ContactViewComponent } from './contact-view/contact-view.component';

export const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, children: [

            { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'product-manipulate', component: ProductComponent, canActivate: [AuthGuard] },
            { path: 'product-view', component: ProductViewComponent, canActivate: [AuthGuard] },
            { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
            { path: 'gifts', component: GiftsComponent, canActivate: [AuthGuard] },
            { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
            { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
            { path: 'order-view/:id', component: OrderViewComponent, canActivate: [AuthGuard] },
            { path: 'contact-view/:id', component: ContactViewComponent, canActivate: [AuthGuard] },
        ]

    },
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: "admin-login", component: AdminLoginComponent },

];
