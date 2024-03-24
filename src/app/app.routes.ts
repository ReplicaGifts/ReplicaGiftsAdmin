import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductComponent } from './admin/product/product.component';
import { CategoryComponent } from './admin/category/category.component';
import { AuthGuard } from './auth.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { UserAuthGuard } from './user-auth.guard';
import { DeleveryDetailsComponent } from './delevery-details/delevery-details.component';
import { ProductViewComponent } from './admin/product-view/product-view.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrderViewComponent } from './admin/order-view/order-view.component';
import { ShopeComponent } from './shope/shope.component';
import { GiftsComponent } from './admin/gifts/gifts.component';
import { FramesComponent } from './admin/frames/frames.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, children: [

            { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'product-manipulate', component: ProductComponent, canActivate: [AuthGuard] },
            { path: 'product-view', component: ProductViewComponent, canActivate: [AuthGuard] },
            { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
            { path: 'gifts', component: GiftsComponent, canActivate: [AuthGuard] },
            { path: 'frames', component: FramesComponent, canActivate: [AuthGuard] },
            { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
            { path: 'order-view/:id', component: OrderViewComponent, canActivate: [AuthGuard] },
        ]

    },
    { path: "admin-login", component: AdminLoginComponent },
    { path: '', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [UserAuthGuard] },
    { path: 'cart', component: ShoppingCartComponent, canActivate: [UserAuthGuard] },
    { path: 'wish', component: WishListComponent, canActivate: [UserAuthGuard] },
    { path: 'shop', component: ShopeComponent },
    { path: 'buy-now/:id', component: DeleveryDetailsComponent, canActivate: [UserAuthGuard] },
    { path: 'check-out', component: DeleveryDetailsComponent, canActivate: [UserAuthGuard] },
];
