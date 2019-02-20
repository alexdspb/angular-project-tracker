import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(
      private apiService: ApiService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!this.route.snapshot.queryParams.projectId) {
      console.log(this.route.snapshot);
      return;
    }

    // get projects
    this.apiService.getProjects().subscribe(projects => {
      this.projects = projects;
      console.log(this.projects)

      // get project
      this.apiService.getProjectById(this.route.snapshot.queryParams.projectId).subscribe(project => {
        this.project = project;

        // get tasks
        this.apiService.getTasksByProjectId(project.Id).subscribe(tasks => {
          // get only active tasks
          this.tasks = this.tasks.concat(
              tasks.filter(
                  task => this.apiService.taskStatuses[task.StatusId].isActive
              )
          );
        });
      });
    });

  }

}
