import { Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandComponent } from './pages/brand-component/brand-component';
import { AccessoriesComponent } from './pages/accessories/accessories.component';

export const routes: Routes = [
  { path: '', component: AccessoriesComponent },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'brands', component: BrandComponent },
  { path: '**', redirectTo: '' }
];