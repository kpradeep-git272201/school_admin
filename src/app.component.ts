import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    constructor(
        private router: Router,
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit() {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
            localStorage.setItem('lastVisitedRoute', event.urlAfterRedirects);
        });
        this.restoreLastVisitedRoute();
    }
    restoreLastVisitedRoute() {
        const currentUrl = this.router.url;
        const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');
        if ((currentUrl === '/' || currentUrl === '/login') && lastVisitedRoute && lastVisitedRoute !== currentUrl) {
            this.router.navigateByUrl(lastVisitedRoute);
        }
    }
}
