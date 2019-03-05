import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

// Font Awesome
import {faUsers, faProjectDiagram} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-admin-index-page',
    templateUrl: './admin-index-page.component.html',
    styleUrls: ['./admin-index-page.component.less']
})
export class AdminIndexPageComponent implements OnInit {

    // Font Awesome
    faUsers = faUsers;
    faProjectDiagram = faProjectDiagram;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    followSection(section: string) {
        this.router.navigate([`/admin/${section}`]);
    }

}
