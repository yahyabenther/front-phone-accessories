import { Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandComponent } from './pages/brand-component/brand-component';
export const routes: Routes = [
  { path: '', component: CategoriesComponent },      // admin = page d’accueil
  { path: 'admin', component: CategoriesComponent }, // /admin = aussi admin
  { path: 'brands', component: BrandComponent },
  { path: '**', redirectTo: '' }

];