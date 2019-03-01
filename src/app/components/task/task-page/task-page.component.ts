import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ApiService} from '../../../services/api.service';
import {Task} from '../../../models/Task';
import {Project} from '../../../models/Project';
import {TaskModalComponent} from '../task-modal/task-modal.component';

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
        private modalService: NgbModal,
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

    showTaskModal(task) {
        // open modal
        const modalRef = this.modalService.open(TaskModalComponent, {size: 'lg'});
        // pass properties to component
        modalRef.componentInstance.task = task ? task : new Task();
        // deal with result
        modalRef.result.then(task => {
            this.task = task;
        }, () => {});
    }

    deleteTask(task: Task) {
        this.apiService.deleteTask(task).subscribe(id => {
            if (id === task.Id) {
                this.router.navigateByUrl('/');
            }
        });
    }

}
