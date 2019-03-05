import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-admin-section-page',
    templateUrl: './admin-section-page.component.html',
    styleUrls: ['./admin-section-page.component.less']
})
export class AdminSectionPageComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        const sectionName = this.route.snapshot.paramMap.get('section');
        console.log(sectionName);
    }

}
