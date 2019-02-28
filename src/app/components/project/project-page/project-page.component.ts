import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ApiService} from '../../../services/api.service';
import {Project} from '../../../models/Project';
import {ProjectModalComponent} from '../project-modal/project-modal.component';

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
        private modalService: NgbModal,
    ) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id) {
            this.apiService.getProjectById(id).subscribe(project => this.project = project);
        }
    }

    showProjectModal() {
        // open modal
        const modalRef = this.modalService.open(ProjectModalComponent, {size: 'lg'});
        // pass properties to component
        modalRef.componentInstance.project = this.project;
        // deal with result
        modalRef.result.then(project => {
            this.project = project;
        }, () => {});
    }

}
