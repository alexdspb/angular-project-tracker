import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Project} from '../../../models/Project';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-projects-bar',
    templateUrl: './projects-bar.component.html',
    styleUrls: ['./projects-bar.component.less']
})
export class ProjectsBarComponent implements OnInit {
    @Input() projects: Project[];
    @Input() project: Project;
    @Output() switchToProject: EventEmitter<any> = new EventEmitter()

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
    }

    go(project: Project) {
        const [param] = Object.keys(this.route.snapshot.params);
        const uri = this.route.snapshot.routeConfig.path.replace(`:${param}`, project.Id);
        this.router.navigate([uri]).then(result => {
            this.switchToProject.emit(project);
        });
    }

}
