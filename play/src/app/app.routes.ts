import { Route } from '@angular/router';
import { EditorDemoComponent } from "../components/editor/editor.component";

import { AppSelectComponent } from './app.select';

export const appRoutes: Route[] = [
  {
    path: 'editor-demo',
    loadComponent: () => EditorDemoComponent
  },
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
