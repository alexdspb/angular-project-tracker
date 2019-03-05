import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {LoginLinksComponent} from './login-links/login-links.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SkillModalComponent } from './skill-modal/skill-modal.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { UserTasksComponent } from './user-page/user-tasks/user-tasks.component';

@NgModule({
    declarations: [
        LoginLinksComponent,
        LoginModalComponent,
        UserPageComponent,
        SkillModalComponent,
        UserModalComponent,
        UserTasksComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        FontAwesomeModule,
    ],
    exports: [
        LoginLinksComponent,
    ],
    entryComponents: [
        LoginModalComponent,
        SkillModalComponent,
        UserModalComponent,
    ],
})
export class UserModule {
}
