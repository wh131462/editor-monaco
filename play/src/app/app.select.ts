import { Component } from '@angular/core';
import { appRoutes } from './app.routes';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'editor-monaco-app-select',
    template: ` <div class="demo-list">
        <div
            class="demo-item"
            *ngFor="let page of pages"
            (click)="navigate(page)">
            {{ page.path }}
        </div>
    </div>`,
    styleUrls: ['./app.select.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class AppSelectComponent {
    pages = appRoutes.filter((r) => r.path && r.path !== 'app-select');
    constructor(private router: Router) {}
    /**
     * 跳转
     * @param page
     */
    navigate(page: Route) {
        this.router.navigate([page.path]);
    }
}
