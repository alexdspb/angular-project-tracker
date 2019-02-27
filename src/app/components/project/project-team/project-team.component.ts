import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ApiService} from '../../../services/api.service';
import {Project} from '../../../models/Project';
import {Employee} from '../../../models/Employee';

// Font Awesome
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-project-team',
    templateUrl: './project-team.component.html',
    styleUrls: ['./project-team.component.less']
})
export class ProjectTeamComponent implements OnInit {
    @Input() project: Project;
    team: Employee[];

    // Font Awesome
    faTrashAlt = faTrashAlt;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService,
    ) {
    }

    ngOnInit() {
    }

    deleteMember(member: Employee) {
        this.apiService.deleteMemberFromTeam(member.Id, this.project.Id).subscribe(response => {
            if (response.EmployeeId === member.Id && response.ProjectId === this.project.Id) {
                this.team = this.team.filter(item => item.Id !== member.Id);
            }
        });
    }

    ngOnChanges(changes) {
        if(changes.project && changes.project.currentValue && changes.project.currentValue.Id) {
            this.apiService.getTeamByProjectId(changes.project.currentValue.Id).subscribe(team => this.team = team);
        }
    }
}
