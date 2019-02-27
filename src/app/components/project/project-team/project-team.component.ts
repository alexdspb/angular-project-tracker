import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
    employees: Employee[];
    selected: number[] = [];

    // Font Awesome
    faTrashAlt = faTrashAlt;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit() {
    }

    showTeamModal(modal: object) {
        this.selected = [];
        // get employees
        this.apiService.getEmployees().subscribe(employees => {
            // drop team members
            this.employees = employees.filter(item => {
                for (let member of this.team) {
                    if (member.Id === item.Id) {
                        return false;
                    }
                }
                return true;
            });

            // open modal
            this.modalService.open(modal, {size: 'lg'}).result.then(result => {
                for (let employeeId of this.selected) {
                    // send to server
                    this.apiService.addEmployeeToTeam(employeeId, this.project.Id).subscribe(employee => {
                        // update in UI
                        this.team.push(employee);
                    });
                }
            }).catch(error => {
                this.selected = [];
            });
        });
    }

    toggleEmployee(employee: Employee) {
        if (this.selected.indexOf(employee.Id) !== -1) {
            this.selected = this.selected.filter(item => item !== employee.Id);
        }
        else {
            this.selected = [...this.selected, employee.Id];
        }
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
