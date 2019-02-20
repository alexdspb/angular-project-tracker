import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {ApiService} from '../../../services/api.service';
import {Project} from '../../../models/Project';
import {Task} from '../../../models/Task';
import {Timesheet} from '../../../models/Timesheet';
import {FormControl} from '@angular/forms';

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
    // modal controls
    modalControls = {
        name: new FormControl(''),
        description: new FormControl(''),
        estimate: new FormControl(''),
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        type: new FormControl(''),
    };

    constructor(
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal
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

    showTaskModal(modal: object, task: Task|null) {
        // create template for Task if not passed
        task = task ? task : {
            Id: 0,
            Name: '',
            Description: '',
            Estimate: 0,
            StartDate: new Date().toISOString(),
            EndDate: new Date().toISOString(),
            StatusId: this.apiService.taskStatuses[0].id,
            ResponsibleId: 0,
            TypeId: this.apiService.taskTypes[0].id,
            ProjectId: this.project.Id,
            ReporterId: 0,
        };
        console.log(task);
        // set values from task to controls
        this.modalControls.name.setValue(task.Name);
        this.modalControls.description.setValue(task.Description);
        this.modalControls.estimate.setValue(task.Estimate);
        this.modalControls.startDate.setValue(task.StartDate);
        this.modalControls.endDate.setValue(task.EndDate);
        this.modalControls.type.setValue(task.TypeId);
        // open modal
        this.modalService.open(modal, {ariaLabelledBy: 'timesheet-modal-title'}).result.then((result) => {
            // on modal save
            console.log(result);
        }, (reason) => {
            // on modal dismiss
            console.log(reason);
        });
    }
}
