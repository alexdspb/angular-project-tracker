import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminSection} from '@models/AdminSection';
import {FormControl} from '@angular/forms';
import {Subscriber} from 'rxjs';
import {ApiService} from '@services/api.service';

// Font Awesome
import {faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';

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
        },
    ];

    // Font Awesome
    faPencilAlt = faPencilAlt;
    faTimes = faTimes;

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
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
            console.log(data);
        });
    }

    onFilterKeyUp = () => {
        console.log(this.filterControl.value);
    }

}
