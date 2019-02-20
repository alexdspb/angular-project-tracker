import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {ApiService} from '../../../services/api.service';
import {Project} from '../../../models/Project';
import {Task} from '../../../models/Task';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.less']
})
export class DashboardPageComponent implements OnInit {
    private projects: Project[];
    private project: Project;
    private tasks: Task[] = [];
    private tasksByStatuses: object = {};

    constructor(
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        for (let status of this.apiService.taskStatuses) {
            this.tasksByStatuses[status.id] = [];
        }

        // get projects
        this.apiService.getProjects().subscribe(projects => {
            this.projects = projects;

            // behavior if no project selected
            if (!this.route.snapshot.queryParams.projectId) {
                return;
            }

            // get project
            this.apiService.getProjectById(this.route.snapshot.queryParams.projectId).subscribe(project => {
                this.project = project;

                // get tasks
                this.apiService.getTasksByProjectId(project.Id).subscribe(tasks => {
                    this.tasks = tasks;

                    for (let task of tasks) {
                        this.tasksByStatuses[task.StatusId].push(task);
                    }
                });
            });
        });

    }

    onDrop(event: CdkDragDrop<Task[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            const task: Task = {...event.item.data, StatusId: event.container.id};
            this.apiService.putTask(task).subscribe();
        }
    }
}
