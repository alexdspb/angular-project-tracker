import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ApiService} from '../../../services/api.service';
import {Task} from '../../../models/Task';
import {Project} from '../../../models/Project';

@Component({
    selector: 'app-task-page',
    templateUrl: './task-page.component.html',
    styleUrls: ['./task-page.component.less']
})
export class TaskPageComponent implements OnInit {
    task: Task;
    project: Project;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService,
    ) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id) {
             this.apiService.getTask(id).subscribe(task => {
                 this.task = task;

                 this.apiService.getProjectById(task.ProjectId).subscribe(project => this.project = project);
             });
        }
    }

}
