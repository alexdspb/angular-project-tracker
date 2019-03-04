import {Component, OnInit} from '@angular/core';
import {Employee} from '@models/Employee';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '@services/api.service';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.less']
})
export class UserModalComponent implements OnInit {
    user: Employee;
    // form
    userForm: FormGroup;
    // flags
    loading = false;
    submitted = false;
    error = false;

    constructor(
        private activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private calendar: NgbCalendar,
        private dateParserFormatter: NgbDateParserFormatter,
        private apiService: ApiService,
    ) {
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            Id: [this.user.Id],
            First: [this.user.First, Validators.required],
            Last: [this.user.Last, Validators.required],
            Birthday: [this.dateParserFormatter.parse(this.user.Birthday), Validators.required],
            Email: [this.user.Email, [Validators.required, Validators.email]],
            Address: [this.user.Address, Validators.required],
            Skype: [this.user.Skype, Validators.required],
            Phone: [this.user.Phone, Validators.required],
            LocationId: [this.user.LocationId, [Validators.required, Validators.min(1)]],
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.userForm.controls;
    }

    onSave(form) {
        this.submitted = true;

        if (this.userForm.invalid) {
            return;
        }

        // reformat form values to user
        this.user = {
            ...this.user,
            First: form.First.trim(),
            Last: form.Last.trim(),
            Birthday: this.dateParserFormatter.format(form.Birthday),
            Email: form.Email.trim(),
            Address: form.Address.trim(),
            Skype: form.Skype.trim(),
            Phone: form.Phone.trim(),
            LocationId: +form.LocationId,
        };

        this.loading = true;
        const subscription = this.user.Id ? this.apiService.putEmployee(this.user) : this.apiService.postEmployee(this.user);
        // save on server
        subscription.subscribe({
            next: user => {
                this.loading = false;
                this.error = false;
                this.activeModal.close(user);
            },
            error: error => {
                console.error(error);
                this.loading = false;
                this.error = error;
            },
            complete: () => {
            }
        });
    }

}
