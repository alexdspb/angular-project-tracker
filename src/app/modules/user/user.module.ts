import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {LoginLinksComponent} from './login-links/login-links.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
    declarations: [
        LoginLinksComponent,
        LoginModalComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
    ],
    exports: [
        LoginLinksComponent,
    ],
    entryComponents: [
        LoginModalComponent
    ],
})
export class UserModule {
}
