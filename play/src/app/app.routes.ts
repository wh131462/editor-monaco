import { Route } from '@angular/router';
import { AppSelectComponent } from './app.select';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'app-select',
        pathMatch: 'full'
    },
    {
        path: 'app-select',
        loadComponent: () => AppSelectComponent
    }
];
