import {Component, Input, OnInit} from '@angular/core';

import {Project} from '@models/Project';
import {Task} from '@models/Task';
import {ApiService} from '@services/api.service';
import {Employee} from '@models/Employee';

@Component({
    selector: 'app-user-tasks',
    templateUrl: './user-tasks.component.html',
    styleUrls: ['./user-tasks.component.less']
})
export class UserTasksComponent implements OnInit {
    @Input() user: Employee;
    @Input() project: Project;
    tasks: Task[];

    constructor(
        private apiService: ApiService,
    ) {
    }

    ngOnInit() {
        this.apiService.getTasksByProjectId(this.project.Id).subscribe(tasks => {
            this.tasks = tasks.filter(task => {
                return task.ResponsibleId === this.user.Id || task.ReporterId === this.user.Id;
            });
        });
    }

}
