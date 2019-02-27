import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Project} from '../../../models/Project';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';

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

}
