import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login'; // 👈 Points directly to your folder layout
import { AccessoriesComponent } from './pages/accessories/accessories.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandComponent } from './pages/brand-component/brand-component';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'accessories', component: AccessoriesComponent, canActivate: [authGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'brands', component: BrandComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];