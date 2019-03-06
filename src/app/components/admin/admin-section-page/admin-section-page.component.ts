import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';

import {ApiService} from '@services/api.service';
import {AdminSection} from '@models/AdminSection';
import {UserModalComponent} from '@modules/user/user-modal/user-modal.component';
import {ProjectModalComponent} from '@components/project/project-modal/project-modal.component';

// Font Awesome
import {faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Employee} from '@models/Employee';
import {Project} from '@models/Project';

@Component({
    selector: 'app-admin-section-page',
    templateUrl: './admin-section-page.component.html',
    styleUrls: ['./admin-section-page.component.less']
})
export class AdminSectionPageComponent implements OnInit {
    section: AdminSection;
    filterControl = new FormControl('');
    dataset: any[];

    sections: AdminSection[] = [
        {
            name: 'employees',
            title: 'Employees',
            link: '',
            addButton: {
              text: 'Add employee',
            },
            subscriber: this.apiService.getEmployees(),
            columns: [
                {type: 'number', name: 'Id', title: 'Id'},
                {type: 'link', name: 'FullName', title: 'Name', link: '/users'},
                {type: 'string', name: 'Email', title: 'Email'},
                {type: 'string', name: 'Skype', title: 'Skype'},
                {type: 'string', name: 'Phone', title: 'Phone'},
            ],
            modalComponent: UserModalComponent,
            modalComponentProp: 'user',
            deleteMethod: this.apiService.deleteEmployee,
            newRow: new Employee(),
        },
        {
            name: 'projects',
            title: 'Projects',
            link: '',
            addButton: {
              text: 'Add project',
            },
            subscriber: this.apiService.getProjects(),
            columns: [
                {type: 'number', name: 'Id', title: 'Id'},
                {type: 'link', name: 'Name', title: 'Name', link: '/projects'},
                {type: 'string', name: 'CustomerName', title: 'Customer'},
                {type: 'date', name: 'StartDate', title: 'Start Date'},
                {type: 'string', name: 'Description', title: 'Description'},
            ],
            modalComponent: ProjectModalComponent,
            modalComponentProp: 'project',
            deleteMethod: this.apiService.deleteProject,
            newRow: new Project(),
        },
    ];

    // Font Awesome
    faPencilAlt = faPencilAlt;
    faTimes = faTimes;

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit() {
        const sectionName = this.route.snapshot.paramMap.get('section');

        if (!sectionName) {
            return;
        }

        this.section = this.sections.filter(item => item.name === sectionName).shift();

        if (!this.section) {
            return;
        }

        this.section.subscriber.subscribe(data => {
            this.dataset = data;
        });
    }

    showEditModal(row) {
        // open modal
        const modalRef = this.modalService.open(this.section.modalComponent);
        // pass properties to component
        modalRef.componentInstance[this.section.modalComponentProp] = row;
        // deal with result
        modalRef.result.then(result => {
            if (!result) {
                return;
            }
            if (!row.Id) {
                // add new row
                this.dataset.push(result);
                return;
            } else {
                // update result in UI
                this.dataset = this.dataset.map((item, index, origin) => {
                    return (item.Id === result.Id) ? result : item;
                });
            }
        }, () => {});
    }

    deleteRow(row) {
        this.section.deleteMethod.call(this.apiService, row).subscribe(result => {
            if (!result) {
                return;
            }
            // delete result from UI
            this.dataset = this.dataset.filter(item => item.Id !== result);
        });
    };


    onFilterKeyUp = () => {
        console.log(this.filterControl.value);
    }

}
