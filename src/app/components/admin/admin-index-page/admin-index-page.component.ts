import {Component, OnInit} from '@angular/core';

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

    constructor() {
    }

    ngOnInit() {
    }

}
