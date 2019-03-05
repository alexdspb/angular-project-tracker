import {Employee} from '@models/Employee';
import {Project} from '@models/Project';
import {Observable} from 'rxjs';

export class AdminSectionButton {
    text: string;
}

export class AdminSectionDatasetColumn {
    type: string = 'string';
    name: string = '';
    title: string = '';
    link?: string = '';
}

export class AdminSection {
    name: string;
    title: string;
    link: string;
    addButton: AdminSectionButton;
    subscriber: Observable<any[]>;
    columns: AdminSectionDatasetColumn[];
}
