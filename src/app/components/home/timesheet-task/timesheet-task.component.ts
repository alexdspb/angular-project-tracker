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
  timesheets: object[]

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getTimesheetsByTaskId(this.task.Id).subscribe((data) => {this.timesheets = data});
  }

}
