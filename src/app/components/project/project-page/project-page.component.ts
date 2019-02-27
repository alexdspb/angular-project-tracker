import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ApiService} from '../../../services/api.service';
import {Project} from '../../../models/Project';

@Component({
    selector: 'app-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.less']
})
export class ProjectPageComponent implements OnInit {
    project: Project;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService,
    ) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.apiService.getProjectById(id).subscribe(project => this.project = project);
    }

}
