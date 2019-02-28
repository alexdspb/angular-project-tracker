import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Project} from '../../../models/Project';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../services/api.service';
import {ProjectModalComponent} from '../../project/project-modal/project-modal.component';

@Component({
    selector: 'app-projects-bar',
    templateUrl: './projects-bar.component.html',
    styleUrls: ['./projects-bar.component.less']
})
export class ProjectsBarComponent implements OnInit {
    @Input() projects: Project[];
    @Input() project: Project = null;
    @Output() switchToProject: EventEmitter<any> = new EventEmitter()

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit() {
        this.apiService.getProjects().subscribe(projects => this.projects = projects);
    }

    go(project: Project) {
        const uri = `projects/${project.Id}`;
        this.router.navigate([uri]).then(result => {
            this.switchToProject.emit(project);
        });
    }

    openProjectModal() {
        // open modal
        const modalRef = this.modalService.open(ProjectModalComponent, {size: 'lg'}).result.then(result => {

        }, reason => {});
    }

}
