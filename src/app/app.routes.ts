import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistartionPageComponent } from './components/registartion-page/registartion-page.component';
import { RegistrationPageTwoComponent } from './components/registration-page-two/registration-page-two.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login-page', component: LoginPageComponent},
    {path: 'registration-page', component: RegistartionPageComponent},
    {path: 'registration-page-two', component: RegistrationPageTwoComponent}
];
