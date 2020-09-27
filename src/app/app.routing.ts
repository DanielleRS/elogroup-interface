import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadsComponent } from './leads/leads.component';
import { NewLeadComponent } from './new-lead/new-lead.component';
import { RegisterComponent } from './register/register.component';

const APP_ROUTES: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'leads', component: LeadsComponent},
    { path: 'new-lead', component: NewLeadComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);