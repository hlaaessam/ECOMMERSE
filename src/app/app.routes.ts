import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [logedGuard],
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent,
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (c) => c.LoginComponent,
          ),
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (c) => c.RegisterComponent,
          ),
      },

      {
        path: 'forgotpass',
        loadComponent: () =>
          import('./components/forgotpassword/forgotpassword.component').then(
            (c) => c.ForgotpasswordComponent,
          ),
      },
    ],
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then(
        (c) => c.BlankLayoutComponent,
      ),

    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        component: HomeComponent,
      },

      {
        path: 'products',
        component: ProductComponent,
      },

      // Lazy loaded components/pages ... import components then set class of component
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (c) => c.CartComponent,
          ),
      },

      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (c) => c.CategoriesComponent,
          ),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (c) => c.BrandsComponent,
          ),
      },

      {
        path: 'details/:id',
        loadComponent: () =>
          import('./components/productdetails/productdetails.component').then(
            (c) => c.ProductdetailsComponent,
          ),
      },

      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (c) => c.AllordersComponent,
          ),
      },

      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./components/orders/orders.component').then(
            (c) => c.OrdersComponent,
          ),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (c) => c.NotfoundComponent,
      ),
  },
];
