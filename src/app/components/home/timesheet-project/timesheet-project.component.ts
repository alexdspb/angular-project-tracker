import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {Project} from '../../../models/Project';
import {Task} from '../../../models/Task';
import {Timesheet} from '../../../models/Timesheet';

@Component({
  selector: '[app-timesheet-project]',
  templateUrl: './timesheet-project.component.html',
  styleUrls: ['./timesheet-project.component.less']
})
export class TimesheetProjectComponent implements OnInit {
  @Input() dates: string[]
  @Input() timesheets: Timesheet[]
  @Input() project: Project
  tasks: Task[]
  hoursByDates: number[] = [];
  hoursTotal: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getTasksByProjectId(this.project.Id).subscribe((data) => {
      // take only active tasks
      this.tasks = data.filter(item => this.apiService.activeTaskStatuses.indexOf(item.StatusId) !== -1);

      // get only tasksheets from current project's tasks
      const tasksIds = this.tasks.map(item => item.Id);
      this.timesheets = this.timesheets.filter(item => tasksIds.indexOf(item.TicketId) !== -1);

      // aggregate hours by dates
      for (const date of this.dates) {
        let hours = 0;
        for (const timesheet of this.timesheets) {
          if (timesheet.Date.substr(0, 10) === date.substr(0, 10)) {
            hours += timesheet.LoggedTime;
          }
        }
        this.hoursByDates.push(hours);
      }

      // aggregate hours total
      this.hoursTotal = this.hoursByDates.reduce((a, b) => a + b, 0);
    });
  }

}
