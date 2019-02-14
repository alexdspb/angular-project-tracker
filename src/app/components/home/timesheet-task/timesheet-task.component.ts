import {Component, Input, OnInit} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {Task} from '../../../models/Task';
import {Timesheet} from '../../../models/Timesheet';

@Component({
  selector: '[app-timesheet-task]',
  templateUrl: './timesheet-task.component.html',
  styleUrls: ['./timesheet-task.component.less'],
})
export class TimesheetTaskComponent implements OnInit {
  @Input() task: Task
  @Input() dates: string[]
  timesheets: Timesheet[] = []
  taskHours: number[] = []
  taskHoursAmount: number = 0; // keeps amount of hours for task row

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // get timesheets from service
    this.apiService.getTimesheetsByTaskId(this.task.Id).subscribe((data) => {
      this.timesheets = data
      this.taskHoursAmount = 0;

      // prepare hours for displaying in template
      for (const dateItem of this.dates) {
        let hours = 0
        for (const timesheet of this.timesheets) {
          if (timesheet.Date.substr(0, 10) === dateItem.substr(0, 10)) {
            hours = timesheet.LoggedTime;
          }
        }
        this.taskHours.push(hours);
        this.taskHoursAmount += hours;
      }
    });
  }

}
