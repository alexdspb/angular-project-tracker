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
  @Input() dates: Date[]
  timesheets: Timesheet[] = []
  taskHours: number[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // get timesheets from service
    this.apiService.getTimesheetsByTaskId(this.task.Id).subscribe((data) => {
      this.timesheets = data

      // prepare hours for displaying in template
      for (const dateItem of this.dates) {
        let hours = 0
        for (const timesheet of this.timesheets) {
          if (timesheet.Date.substr(0, 10) === dateItem) {
            hours = timesheet.LoggedTime
          }
        }
        this.taskHours.push(hours)
      }
    });
  }

}
