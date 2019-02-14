import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: '[app-timesheet-project]',
  templateUrl: './timesheet-project.component.html',
  styleUrls: ['./timesheet-project.component.less']
})
export class TimesheetProjectComponent implements OnInit {
  @Input() project: object
  @Input() dates: Date[]
  tasks: object[]

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getTasksByProjectId(this.project.Id).subscribe((data) => {
      this.tasks = data
    });
  }

}
