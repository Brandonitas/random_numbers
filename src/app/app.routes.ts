import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MiddleSquareComponent } from './components/middle-square/middle-square.component'


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'middle_square', component: MiddleSquareComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
