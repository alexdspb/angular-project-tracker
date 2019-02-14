import {Component, Input, OnInit} from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: '[app-timesheet-task]',
  templateUrl: './timesheet-task.component.html',
  styleUrls: ['./timesheet-task.component.less'],
})
export class TimesheetTaskComponent implements OnInit {
  @Input() task: object
  @Input() dates: Date[]
  timesheets: object[] = []
  taskHours: number[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // get timesheets from service
    this.apiService.getTimesheetsByTaskId(this.task.Id).subscribe((data) => {
      this.timesheets = data

      // prepare hours for displaying in template
      for (const dateItem of this.dates) {
        let hours = 0
        for (let timesheet of this.timesheets) {
          if (timesheet.Date.substr(0, 10) === dateItem) {
            hours = timesheet.LoggedTime
          }
        }
        this.taskHours.push(hours)
      }
    });
  }

}
