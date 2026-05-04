import { Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes = [
  { path: '', component: CategoriesComponent },      // admin = page d’accueil
  { path: 'admin', component: CategoriesComponent }, // /admin = aussi admin
  { path: '**', redirectTo: '' }
];