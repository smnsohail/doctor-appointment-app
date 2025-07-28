import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    { path: 'map', loadComponent: () => import('./components/map/map.component').then(m => m.MapComponent) },
    // Lazy loading for login and register components
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)},
    { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
    { path: '**', redirectTo: '' },
];
