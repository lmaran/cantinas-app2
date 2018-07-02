import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { routerTransition } from './core/router.animations';

@Component({
    selector: 'app-root',
    animations: [routerTransition],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    verticalNavIsCollapsed = false;
    navGroupAdminIsExpanded = true;
    constructor(public auth: AuthenticationService) {}

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
